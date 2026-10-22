import { useCallback, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { Side } from './types';
import { findProduct, products } from './data/products';
import { useCart } from './hooks/useCart';
import { Rack } from './components/Rack';
import { FocusView } from './components/FocusView';
import { ProductPage } from './components/ProductPage';
import { CartDrawer } from './components/CartDrawer';

type View = { name: 'rack' } | { name: 'focus'; index: number } | { name: 'product'; id: string };

const MARQUEE = ['Seiza 星座', 'Coleção TENMEI 天命', 'DEFY YOUR FATE', 'Envio para todo o Brasil', 'Frete grátis acima de R$ 300'];

export default function App() {
  const [view, setView] = useState<View>({ name: 'rack' });
  const [direction, setDirection] = useState(1);
  const [side, setSide] = useState<Side>('front');
  const [variants, setVariants] = useState<Record<string, string>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const cart = useCart();

  const variantOf = useCallback((id: string) => variants[id], [variants]);
  const selectVariant = (productId: string, variantId: string) => setVariants((v) => ({ ...v, [productId]: variantId }));

  const open = (id: string) => {
    setSide('front');
    setView({ name: 'focus', index: products.findIndex((p) => p.id === id) });
  };
  const navigate = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setSide('front');
    setView((v) => (v.name === 'focus' ? { name: 'focus', index: (v.index + dir + products.length) % products.length } : v));
  }, []);
  const close = useCallback(() => setView({ name: 'rack' }), []);
  const toProduct = (id: string) => {
    setView({ name: 'product', id });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={`app view-${view.name}`}>
      <header className="topbar">
        <button type="button" className="nav-link mono" onClick={() => setAboutOpen(true)}>Sobre</button>
        <button type="button" className="logo" onClick={close} aria-label="Seiza, voltar à arara">
          seiza<span lang="ja">星座</span>
        </button>
        <button type="button" className="nav-link mono" onClick={() => setCartOpen(true)}>
          Sacola <span className="badge">{cart.count}</span>
        </button>
      </header>

      <main className="stage">
        <LayoutGroup>
          {view.name === 'rack' && (
            <Rack products={products} variantOf={variantOf} onOpen={open} onSeeAvailability={toProduct} />
          )}
          {view.name === 'focus' && (
            <FocusView
              products={products}
              index={view.index}
              direction={direction}
              side={side}
              variantOf={variantOf}
              onNavigate={navigate}
              onClose={close}
              onSelectVariant={selectVariant}
              onSideChange={setSide}
              onSeeAvailability={toProduct}
            />
          )}
        </LayoutGroup>
        <AnimatePresence>
          {view.name === 'product' && (
            <ProductPage
              key={view.id}
              product={findProduct(view.id)}
              variantId={variants[view.id]}
              initialSide={side}
              onSelectVariant={(vid) => selectVariant(view.id, vid)}
              onBack={close}
              onAdd={(size, qty) => {
                cart.add(view.id, variants[view.id] ?? findProduct(view.id).variants[0].id, size, qty);
                setCartOpen(true);
              }}
            />
          )}
        </AnimatePresence>
      </main>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee-group">
              {MARQUEE.concat(MARQUEE).map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
            </span>
          ))}
        </div>
      </div>

      <CartDrawer open={cartOpen} items={cart.items} subtotal={cart.subtotal} onClose={() => setCartOpen(false)} onQty={cart.setQty} onClear={cart.clear} />

      <AnimatePresence>
        {aboutOpen && (
          <>
            <motion.div className="scrim" onClick={() => setAboutOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="about" role="dialog" aria-modal="true" aria-label="Sobre o projeto" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
              <h2>Sobre o projeto</h2>
              <p>Conceito de e-commerce para a Seiza (星座, “constelação” em japonês), uma marca fictícia de streetwear de São Paulo. A vitrine imita uma arara de loja física: você passa os olhos pelas peças, tira uma do cabide para ver de perto e troca a cor pelas etiquetas.</p>
              <p className="muted">React, TypeScript e Framer Motion. As peças foram geradas com IA. Catálogo, estoque e sacola são simulados no navegador.</p>
              <button type="button" className="btn btn-ghost" onClick={() => setAboutOpen(false)}>Fechar</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
