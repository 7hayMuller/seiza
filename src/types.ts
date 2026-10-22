export type Side = 'front' | 'back';
export type Size = 'P' | 'M' | 'G' | 'GG';

export interface Variant {
  id: string;
  name: string;
  /** Cor da etiqueta pendurada */
  swatch: string;
  /** Fotos da peça (WebP com fundo removido, proporção 3:4, gancho do cabide no topo central) */
  images: { front: string; back?: string };
  stock: Record<Size, number>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  variants: Variant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  size: Size;
  qty: number;
}
