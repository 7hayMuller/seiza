import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import type { Product, Side } from '../types';
import { findVariant, formatBRL } from '../data/products';
import { Garment, hasBack } from './Garment';
import { ColorTags } from './ColorTags';

interface Props {
  products: Product[];
  index: number;
  direction: number;
  side: Side;
  variantOf: (id: string) => string | undefined;
  onNavigate: (dir: 1 | -1) => void;
  onClose: () => void;
  onSelectVariant: (productId: string, variantId: string) => void;
  onSideChange: (s: Side) => void;
  onSeeAvailability: (id: string) => void;
}

const slide = {
  enter: (dir: number) => ({ x: `${dir * 45}%`, opacity: 0, scale: 0.9, filter: 'blur(6px)' }),
  center: { x: '0%', opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({ x: `${dir * -45}%`, opacity: 0, scale: 0.9, filter: 'blur(6px)' }),
};

export function FocusView(props: Props) {
  const { products, index, direction, side, variantOf, onNavigate, onClose, onSelectVariant, onSideChange, onSeeAvailability } = props;
  const reduce = useReducedMotion();
  const product = products[index];
  const variant = findVariant(product, variantOf(product.id));
  const at = (offset: number) => products[(index + offset + products.length) % products.length];
  const prev = at(-1);
  const next = at(1);
  const canFlip = hasBack(variant);
  const shownSide: Side = canFlip ? side : 'front';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate(1);
      else if (e.key === 'ArrowLeft') onNavigate(-1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNavigate, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) onNavigate(1);
    else if (info.offset.x > 60) onNavigate(-1);
  };

  return (
    <section className="focus" aria-label={`${product.name} em destaque`}>
      <motion.button type="button" className="focus-close mono" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        Voltar à arara <span aria-hidden="true">✕</span>
      </motion.button>

      <div className="focus-stage">
        
        <motion.div key={`ghost-l-${prev.id}`} className="ghost ghost-left" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ delay: 0.2 }}>
          <Garment hanger={false} product={prev} variant={findVariant(prev, variantOf(prev.id))} />
        </motion.div>
        <motion.div key={`ghost-r-${next.id}`} className="ghost ghost-right" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ delay: 0.2 }}>
          <Garment hanger={false} product={next} variant={findVariant(next, variantOf(next.id))} />
        </motion.div>

        <button type="button" className="arrow arrow-left" onClick={() => onNavigate(-1)} aria-label={`Peça anterior: ${prev.name}`}>
          <span aria-hidden="true">←</span>
        </button>

        <div className="focus-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={product.id}
              layoutId={`garment-${product.id}`}
              className="focus-garment"
              custom={direction}
              variants={reduce ? undefined : slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${variant.id}-${shownSide}`}
                  className="flip"
                  initial={{ scaleX: 0.04, opacity: 0.6 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0.04, opacity: 0.6 }}
                  transition={{ duration: reduce ? 0 : 0.18, ease: 'easeInOut' }}
                >
                  <Garment hanger={false} product={product} variant={variant} side={shownSide} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          <motion.div className="focus-tags" key={`tags-${product.id}`} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 14 }}>
            <ColorTags variants={product.variants} activeId={variant.id} onSelect={(id) => onSelectVariant(product.id, id)} />
            <span className="tag-caption mono">{variant.name}</span>
          </motion.div>
        </div>

        <button type="button" className="arrow arrow-right" onClick={() => onNavigate(1)} aria-label={`Próxima peça: ${next.name}`}>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <motion.div className="focus-info" key={`info-${product.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h1 className="focus-title">{product.name}</h1>
        <p className="mono focus-price">{formatBRL(product.price)} <span className="muted">· {String(index + 1).padStart(2, '0')}/{String(products.length).padStart(2, '0')}</span></p>
        {canFlip && (
          <div className="segmented" role="radiogroup" aria-label="Lado da peça">
            {(['front', 'back'] as Side[]).map((s) => (
              <button key={s} type="button" role="radio" aria-checked={shownSide === s} className={shownSide === s ? 'is-on' : ''} onClick={() => onSideChange(s)}>
                {s === 'front' ? 'Frente' : 'Costas'}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => onSeeAvailability(product.id)}>
          Ver disponibilidade
        </button>
      </motion.div>
    </section>
  );
}
