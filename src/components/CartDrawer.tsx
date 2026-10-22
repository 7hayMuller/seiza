import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CartItem } from '../types';
import { findProduct, findVariant, formatBRL } from '../data/products';
import { Garment } from './Garment';

const FREE_SHIPPING = 400;

interface Props {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onQty: (index: number, qty: number) => void;
  onClear: () => void;
}

export function CartDrawer({ open, items, subtotal, onClose, onQty, onClear }: Props) {
  const [done, setDone] = useState(false);
  const missing = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <AnimatePresence onExitComplete={() => setDone(false)}>
      {open && (
        <>
          <motion.div className="scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Sacola"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <header className="drawer-head">
              <h2>Sacola</h2>
              <button type="button" className="mono link" onClick={onClose}>Fechar ✕</button>
            </header>

            {done ? (
              <div className="drawer-empty">
                <p className="drawer-big">Pedido de demonstração concluído.</p>
                <p className="muted">Esta é uma loja de portfólio: nenhum pagamento foi feito e nenhum pedido foi enviado.</p>
                <button type="button" className="btn btn-ghost" onClick={onClose}>Voltar à arara</button>
              </div>
            ) : items.length === 0 ? (
              <div className="drawer-empty">
                <p className="drawer-big">Sua sacola está vazia.</p>
                <p className="muted">Escolha uma peça na arara e clique em “Ver disponibilidade”.</p>
              </div>
            ) : (
              <>
                <div className="ship mono">
                  <span>{missing > 0 ? `Faltam ${formatBRL(missing)} para frete grátis` : 'Frete grátis liberado'}</span>
                  <div className="ship-bar"><div style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
                </div>
                <ul className="lines">
                  {items.map((it, i) => {
                    const p = findProduct(it.productId);
                    const v = findVariant(p, it.variantId);
                    return (
                      <li key={`${it.productId}-${it.variantId}-${it.size}`} className="line">
                        <div className="line-img"><Garment hanger={false} product={p} variant={v} /></div>
                        <div className="line-body">
                          <p className="line-name">{p.name}</p>
                          <p className="mono muted">{v.name} · {it.size}</p>
                          <div className="qty qty-sm">
                            <button type="button" onClick={() => onQty(i, it.qty - 1)} aria-label="Diminuir">−</button>
                            <span className="mono">{it.qty}</span>
                            <button type="button" onClick={() => onQty(i, it.qty + 1)} aria-label="Aumentar">+</button>
                          </div>
                        </div>
                        <p className="mono">{formatBRL(p.price * it.qty)}</p>
                      </li>
                    );
                  })}
                </ul>
                <footer className="drawer-foot">
                  <p className="total"><span>Subtotal</span><span className="mono">{formatBRL(subtotal)}</span></p>
                  <button type="button" className="btn btn-primary" onClick={() => { setDone(true); onClear(); }}>
                    Finalizar compra
                  </button>
                  <p className="muted small">Loja de demonstração. Nenhum pagamento é processado.</p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
