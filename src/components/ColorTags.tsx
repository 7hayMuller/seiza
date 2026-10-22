import { motion } from 'framer-motion';
import type { Variant } from '../types';

interface Props {
  variants: Variant[];
  activeId: string;
  onSelect: (id: string) => void;
  layout?: 'hanging' | 'row';
}


export function ColorTags({ variants, activeId, onSelect, layout = 'hanging' }: Props) {
  return (
    <div className={`tags tags-${layout}`} role="radiogroup" aria-label="Cor">
      {variants.map((v, i) => {
        const active = v.id === activeId;
        return (
          <motion.button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={v.name}
            title={v.name}
            className={`tag ${active ? 'is-active' : ''}`}
            onClick={() => onSelect(v.id)}
            initial={false}
            animate={layout === 'hanging' ? { rotate: active ? 0 : i % 2 ? 7 : -6, y: active ? 6 : 0, scale: active ? 1.08 : 1 } : { scale: active ? 1.05 : 1 }}
            whileHover={{ rotate: 0, scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            style={{ ['--swatch' as string]: v.swatch }}
          >
            {layout === 'hanging' && <span className="tag-string" aria-hidden="true" />}
            <span className="tag-card" aria-hidden="true">
              <span className="tag-hole" />
            </span>
            {layout === 'row' && <span className="tag-label">{v.name}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
