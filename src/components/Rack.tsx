import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import type { Product } from '../types';
import { findVariant, formatBRL } from '../data/products';
import { Garment } from './Garment';
import railLeft from '../assets/rail-left.webp';
import railMid from '../assets/rail-mid.webp';
import railRight from '../assets/rail-right.webp';

interface Props {
  products: Product[];
  variantOf: (id: string) => string | undefined;
  onOpen: (id: string) => void;
  onSeeAvailability: (id: string) => void;
}

const WHEEL_STEP = 50;
const WHEEL_COOLDOWN = 130; 


interface Impulse { id: number; origin: number; dir: 1 | -1 }

export function Rack({ products, variantOf, onOpen, onSeeAvailability }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const [impulse, setImpulse] = useState<Impulse | null>(null);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;

  const activate = (i: number | null, dir: 1 | -1 = 1) => {
    if (i === activeRef.current) return;
    setActive(i);
    if (i !== null) {
      setLast(i);
      setImpulse((prev) => ({ id: (prev?.id ?? 0) + 1, origin: i, dir }));
    }
  };

  
  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
    let acc = 0;
    let lastStep = 0;
    const onWheel = (e: WheelEvent) => {
      if (!desktop.matches || document.querySelector('.drawer, .about')) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const cur = activeRef.current;
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      
      if (cur !== null && ((dir === 1 && cur === products.length - 1) || (dir === -1 && cur === 0))) return;
      e.preventDefault();
      acc += delta;
      const now = performance.now();
      if (Math.abs(acc) < WHEEL_STEP || now - lastStep < WHEEL_COOLDOWN) return;
      acc = 0;
      lastStep = now;
      const next = cur === null ? (dir === 1 ? 0 : products.length - 1) : Math.min(products.length - 1, Math.max(0, cur + dir));
      activate(next, dir);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  const shown = last !== null ? products[last] : undefined;

  return (
    <section className="rack" aria-label="Arara de peças">
      <div className="rack-hanger">
        <div className="rail" aria-hidden="true">
          <img src={railLeft} alt="" draggable={false} />
          <span style={{ backgroundImage: `url(${railMid})` }} />
          <img src={railRight} alt="" draggable={false} />
        </div>
        <ul
          ref={listRef}
          className="rack-items"
          onMouseLeave={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') activate(Math.min(products.length - 1, (active ?? -1) + 1), 1);
            if (e.key === 'ArrowLeft') activate(Math.max(0, (active ?? products.length) - 1), -1);
          }}
        >
          {products.map((p, i) => (
            <RackItem
              key={p.id}
              product={p}
              index={i}
              active={active}
              impulse={impulse}
              reduce={Boolean(reduce)}
              variantId={variantOf(p.id)}
              onEnter={() => activate(i, active === null || i > active ? 1 : -1)}
              onOpen={() => onOpen(p.id)}
            />
          ))}
        </ul>
      </div>

      <div className="rack-caption" aria-live="polite">
        {shown ? (
          <motion.p key={shown.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="caption-line">
            <span className="caption-name">{shown.name}</span>
            <span className="mono">{formatBRL(shown.price)}</span>
          </motion.p>
        ) : (
          <p className="caption-line caption-hint mono"><span className="hint-desktop">Role ou passe o mouse pelas peças · clique para ver de perto</span><span className="hint-touch">Deslize pelas peças · toque para ver de perto</span></p>
        )}
        <button type="button" className="btn btn-ghost" disabled={!shown} onClick={() => shown && onSeeAvailability(shown.id)}>
          Ver disponibilidade
        </button>
      </div>
    </section>
  );
}

interface ItemProps {
  product: Product;
  index: number;
  active: number | null;
  impulse: Impulse | null;
  reduce: boolean;
  variantId?: string;
  onEnter: () => void;
  onOpen: () => void;
}

function RackItem({ product, index, active, impulse, reduce, variantId, onEnter, onOpen }: ItemProps) {
  const swing = useAnimationControls();
  const isActive = active === index;
  const dim = active !== null && !isActive;  
  const push = active === null || isActive ? 0 : index < active ? -1 : 1;
  const dist = active === null ? 0 : Math.abs(index - active);
  const pushX = push * Math.max(0, 26 - (dist - 1) * 8);

  useEffect(() => {
    if (!impulse || reduce) return;
    const d = Math.abs(index - impulse.origin);
    const amp = Math.max(0, 5.5 - d * 1.6) * impulse.dir * (index === impulse.origin ? 1 : -0.8);
    if (amp === 0) return;
    swing.start({
      rotate: [0, amp, -amp * 0.55, amp * 0.28, -amp * 0.1, 0],
      transition: { duration: 1.3, ease: 'easeOut', delay: d * 0.045 },
    });
  }, [impulse, index, reduce, swing]);

  return (
    <li className="rack-slot" style={{ zIndex: isActive ? 50 : 10 - Math.min(dist, 9) }}>
      <motion.div layoutId={`garment-${product.id}`} className="rack-layout" transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
        <motion.div
          className="rack-push"
          animate={{ x: pushX, scale: isActive ? 1.3 : 1, y: isActive ? 'calc(var(--g) * 0.02)' : '0px', filter: dim ? 'saturate(0.45) brightness(0.97)' : 'saturate(1) brightness(1)' }}
          transition={{ type: 'spring', stiffness: 260, damping: 24, filter: { duration: 0.25 } }}
        >
          <motion.button
            type="button"
            className={`rack-item ${isActive ? 'is-active' : ''}`}
            aria-label={`Ver ${product.name} de perto`}
            onMouseEnter={onEnter}
            onFocus={onEnter}
            onClick={onOpen}
            animate={swing}
          >
            <Garment product={product} variant={findVariant(product, variantId)} />
          </motion.button>
        </motion.div>
      </motion.div>
    </li>
  );
}
