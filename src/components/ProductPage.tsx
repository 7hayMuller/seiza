import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Product, Side, Size } from '../types';
import { findVariant, formatBRL } from '../data/products';
import { Garment, hasBack } from './Garment';
import { ColorTags } from './ColorTags';

const SIZES: Size[] = ['P', 'M', 'G', 'GG'];

const MEASURES: Record<Size, [number, number]> = { P: [52, 70], M: [55, 72], G: [58, 74], GG: [61, 76] };

interface Props {
  product: Product;
  variantId?: string;
  initialSide: Side;
  onSelectVariant: (variantId: string) => void;
  onBack: () => void;
  onAdd: (size: Size, qty: number) => void;
}

export function ProductPage({ product, variantId, initialSide, onSelectVariant, onBack, onAdd }: Props) {
  const variant = findVariant(product, variantId);
  const [side, setSide] = useState<Side>(initialSide);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const canFlip = hasBack(variant);

  useEffect(() => {
    if (size && variant.stock[size] === 0) setSize(null);
  }, [variant, size]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

  const stock = size ? variant.stock[size] : 0;
  const installment = product.price / 3;

  return (
    <motion.section className="pdp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="pdp-media">
        <button type="button" className="link-back mono" onClick={onBack}>← Voltar à arara</button>
        <div className="pdp-main">
          <motion.div key={`${variant.id}-${side}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
            <Garment hanger={false} product={product} variant={variant} side={canFlip ? side : 'front'} />
          </motion.div>
        </div>
        {canFlip && (
          <div className="pdp-thumbs">
            {(['front', 'back'] as Side[]).map((s) => (
              <button key={s} type="button" className={`thumb ${side === s ? 'is-on' : ''}`} onClick={() => setSide(s)} aria-label={s === 'front' ? 'Ver frente' : 'Ver costas'}>
                <Garment hanger={false} product={product} variant={variant} side={s} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdp-info">
        <p className="eyebrow mono">Drop 03 · Inverno 26</p>
        <h1 className="pdp-title">{product.name}</h1>
        <p className="pdp-price">
          <span className="mono">{formatBRL(product.price)}</span>
          <span className="muted">ou 3x de {formatBRL(installment)} sem juros</span>
        </p>

        <div className="field">
          <div className="field-head">
            <span className="label">Cor</span>
            <span className="mono muted">{variant.name}</span>
          </div>
          <ColorTags variants={product.variants} activeId={variant.id} onSelect={onSelectVariant} layout="row" />
        </div>

        <div className="field">
          <div className="field-head">
            <span className="label">Tamanho</span>
            <button type="button" className="link mono" onClick={() => setShowGuide((v) => !v)} aria-expanded={showGuide}>
              {showGuide ? 'Fechar medidas' : 'Guia de medidas'}
            </button>
          </div>
          <div className="sizes" role="radiogroup" aria-label="Tamanho">
            {SIZES.map((s) => {
              const out = variant.stock[s] === 0;
              return (
                <button key={s} type="button" role="radio" aria-checked={size === s} disabled={out} className={`size ${size === s ? 'is-on' : ''}`} onClick={() => setSize(s)} title={out ? 'Esgotado' : undefined}>
                  {s}
                  {out && <span className="sr-only"> (esgotado)</span>}
                </button>
              );
            })}
          </div>
          <p className="hint mono">
            {size ? (stock <= 2 ? `Últimas ${stock} peças nesse tamanho` : 'Disponível · envio em até 2 dias úteis') : 'Escolha um tamanho'}
          </p>
          {showGuide && (
            <table className="guide mono">
              <thead>
                <tr><th>Tam.</th><th>Largura</th><th>Comprimento</th></tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s}><td>{s}</td><td>{MEASURES[s][0]} cm</td><td>{MEASURES[s][1]} cm</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="buy-row">
          <div className="qty" aria-label="Quantidade">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir">−</button>
            <span className="mono" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(stock || 9, q + 1))} aria-label="Aumentar">+</button>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!size}
            onClick={() => {
              if (!size) return;
              onAdd(size, qty);
              setAdded(true);
              setQty(1);
            }}
          >
            {added ? 'Adicionado à sacola' : 'Adicionar à sacola'}
          </button>
        </div>

        <p className="pdp-desc">{product.description}</p>
        <ul className="pdp-details">
          {product.details.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>
    </motion.section>
  );
}
