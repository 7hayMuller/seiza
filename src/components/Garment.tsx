import type { Product, Side, Variant } from '../types';
import hangerImg from '../assets/hanger.webp';

interface Props {
  product: Product;
  variant: Variant;
  side?: Side;
  className?: string; 
  hanger?: boolean;
}


export function Garment({ product, variant, side = 'front', className, hanger = true }: Props) {
  const src = variant.images[side] ?? variant.images.front;
  return (
    <div className={`garment ${className ?? ''}`}>
      {hanger && <img className="garment-hanger" src={hangerImg} alt="" aria-hidden="true" draggable={false} />}
      <img className="garment-photo" src={src} alt={`${product.name}, ${variant.name}, ${side === 'front' ? 'frente' : 'costas'}`} draggable={false} />
    </div>
  );
}

export const hasBack = (v: Variant) => Boolean(v.images.back);
