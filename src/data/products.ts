import type { Product } from '../types';
import jaquetaCometaFrente from '../assets/garments/jaqueta-cometa-frente.webp';
import jaquetaCometaCostas from '../assets/garments/jaqueta-cometa-costas.webp';
import jaquetaCremeFrente from '../assets/garments/jaqueta-cometa-creme-frente.webp';
import jaquetaCremeCostas from '../assets/garments/jaqueta-cometa-creme-costas.webp';
import moletomPretoFrente from '../assets/garments/moletom-cometa-preto-frente.webp';
import moletomPretoCostas from '../assets/garments/moletom-cometa-preto-costas.webp';
import moletomCremeFrente from '../assets/garments/moletom-cometa-creme-frente.webp';
import moletomCremeCostas from '../assets/garments/moletom-cometa-creme-costas.webp';
import teeBoxyPretoFrente from '../assets/garments/tee-boxy-cometa-preto-frente.webp';
import teeBoxyPretoCostas from '../assets/garments/tee-boxy-cometa-preto-costas.webp';
import teeBoxyLilasFrente from '../assets/garments/tee-boxy-cometa-lilas-frente.webp';
import teeBoxyLilasCostas from '../assets/garments/tee-boxy-cometa-lilas-costas.webp';
import trackPretoFrente from '../assets/garments/jaqueta-track-preto-frente.webp';
import trackPretoCostas from '../assets/garments/jaqueta-track-preto-costas.webp';
import trackCafeFrente from '../assets/garments/jaqueta-track-cafe-frente.webp';
import trackCafeCostas from '../assets/garments/jaqueta-track-cafe-costas.webp';
import croppedPretoFrente from '../assets/garments/cropped-cometa-preto-frente.webp';
import croppedPretoCostas from '../assets/garments/cropped-cometa-preto-costas.webp';
import croppedAzulFrente from '../assets/garments/cropped-cometa-azul-frente.webp';
import croppedAzulCostas from '../assets/garments/cropped-cometa-azul-costas.webp';
import cropTeePretoFrente from '../assets/garments/cropped-tee-preto-frente.webp';
import cropTeePretoCostas from '../assets/garments/cropped-tee-preto-costas.webp';
import cropTeeVinhoFrente from '../assets/garments/cropped-tee-vinho-frente.webp';
import cropTeeVinhoCostas from '../assets/garments/cropped-tee-vinho-costas.webp';
import jerseyPretoFrente from '../assets/garments/jersey-cometa-preto-frente.webp';
import jerseyPretoCostas from '../assets/garments/jersey-cometa-preto-costas.webp';
import jerseyVinhoFrente from '../assets/garments/jersey-cometa-vinho-frente.webp';
import jerseyVinhoCostas from '../assets/garments/jersey-cometa-vinho-costas.webp';

/*
 * Catálogo mockado. Cada variante precisa de `images.front`; se faltar `images.back`,
 * o botão Frente/Costas some para essa cor.
 */
export const products: Product[] = [
  {
    id: 'jaqueta-track-cometa',
    name: 'Jaqueta Track 星座',
    price: 459,
    description: 'Jaqueta track em tactel com recortes raglan, gola alta forrada em lilás e puxador de zíper em formato de estrela. Chamas nas mangas e estrela em órbita nas costas.',
    details: ['Tactel com forro de malha', 'Gola alta forrada', 'Puxador de zíper em metal', 'Ribanas listradas'],
    variants: [
      {
        id: 'preto-lilas',
        name: 'Preto/Lilás',
        swatch: '#1B1C20',
        images: { front: trackPretoFrente, back: trackPretoCostas },
        stock: { P: 2, M: 4, G: 3, GG: 1 },
      },
      {
        id: 'cafe-rosa',
        name: 'Café/Rosa',
        swatch: '#4A2E25',
        images: { front: trackCafeFrente, back: trackCafeCostas },
        stock: { P: 1, M: 2, G: 2, GG: 0 },
      },
    ],
  },
  {
    id: 'tee-boxy-cometa',
    name: 'Tee Boxy 星座',
    price: 219,
    description: 'Camiseta boxy de malha pesada, mais curta e larga. Chamas nas mangas, estrela em órbita no peito e uma linha de estrelas descendo pelas costas.',
    details: ['Malha 30.1 penteada 260 g/m²', 'Modelagem boxy cropped', 'Silk à base d’água', 'Gola canelada larga'],
    variants: [
      {
        id: 'preto-rosa',
        name: 'Preto/Rosa',
        swatch: '#1B1C20',
        images: { front: teeBoxyPretoFrente, back: teeBoxyPretoCostas },
        stock: { P: 4, M: 6, G: 5, GG: 2 },
      },
      {
        id: 'creme-lilas',
        name: 'Creme/Lilás',
        swatch: '#C5A8E6',
        images: { front: teeBoxyLilasFrente, back: teeBoxyLilasCostas },
        stock: { P: 2, M: 3, G: 0, GG: 1 },
      },
    ],
  },
  {
    id: 'jaqueta-college-cometa',
    name: 'Jaqueta College 星座',
    price: 589,
    description: 'Jaqueta college em feltro de lã com mangas estampadas em chamas e estrela em órbita pintada à mão nas costas. Ribanas listradas e botões de pressão metálicos.',
    details: ['Corpo 70% lã', 'Estampa em silk com efeito craquelado', 'Forro acolchoado', 'Edição limitada a 120 peças'],
    variants: [
      {
        id: 'preto-rosa',
        name: 'Preto/Rosa',
        swatch: '#1B1C20',
        images: { front: jaquetaCometaFrente, back: jaquetaCometaCostas },
        stock: { P: 1, M: 3, G: 2, GG: 0 },
      },
      {
        id: 'creme-rosa',
        name: 'Creme/Rosa',
        swatch: '#EFE8D6',
        images: { front: jaquetaCremeFrente, back: jaquetaCremeCostas },
        stock: { P: 2, M: 0, G: 3, GG: 1 },
      },
    ],
  },
  {
    id: 'moletom-cropped-cometa',
    name: 'Moletom Cropped 星座',
    price: 399,
    description: 'Moletom cropped com zíper, recortes raglan com vivo lilás e barra com regulagem. Bolsos utilitários nas mangas com chaveiros de estrela em metal.',
    details: ['Moletom 3 cabos flanelado', 'Modelagem cropped', 'Barra com cordão e regulador', 'Puxadores e chaveiros em metal'],
    variants: [
      {
        id: 'preto-roxo',
        name: 'Preto/Roxo',
        swatch: '#4B3A5E',
        images: { front: croppedPretoFrente, back: croppedPretoCostas },
        stock: { P: 3, M: 4, G: 2, GG: 1 },
      },
      {
        id: 'creme-azul',
        name: 'Creme/Azul',
        swatch: '#7A8AAD',
        images: { front: croppedAzulFrente, back: croppedAzulCostas },
        stock: { P: 2, M: 0, G: 3, GG: 2 },
      },
    ],
  },
  {
    id: 'tee-cropped-cometa',
    name: 'Tee Cropped 星座',
    price: 179,
    description: 'Camiseta cropped com mangas raglan em contraste, vivo nas costuras e chamas estampadas nas mangas. A constelação das costas segue a coluna.',
    details: ['Malha 30.1 penteada', 'Modelagem cropped ampla', 'Mangas raglan em contraste', 'Silk à base d’água'],
    variants: [
      {
        id: 'preto-lilas',
        name: 'Preto/Lilás',
        swatch: '#9C85C2',
        images: { front: cropTeePretoFrente, back: cropTeePretoCostas },
        stock: { P: 4, M: 5, G: 3, GG: 0 },
      },
      {
        id: 'creme-vinho',
        name: 'Creme/Vinho',
        swatch: '#6E1F26',
        images: { front: cropTeeVinhoFrente, back: cropTeeVinhoCostas },
        stock: { P: 2, M: 3, G: 2, GG: 1 },
      },
    ],
  },
  {
    id: 'moletom-ziper-cometa',
    name: 'Moletom Zíper 星座',
    price: 429,
    description: 'Moletom com zíper inteiro, capuz forrado e bolso canguru. Chamas nas mangas e estrela em órbita em spray nas costas, da mesma coleção da jaqueta.',
    details: ['Moletom 3 cabos flanelado', 'Zíper metálico', 'Estampa em silk com efeito spray', 'Punhos e barra canelados'],
    variants: [
      {
        id: 'preto-rosa',
        name: 'Preto/Rosa',
        swatch: '#1B1C20',
        images: { front: moletomPretoFrente, back: moletomPretoCostas },
        stock: { P: 3, M: 5, G: 4, GG: 2 },
      },
      {
        id: 'creme-rosa',
        name: 'Creme/Rosa',
        swatch: '#EFE8D6',
        images: { front: moletomCremeFrente, back: moletomCremeCostas },
        stock: { P: 0, M: 2, G: 3, GG: 1 },
      },
    ],
  },
  {
    id: 'camisa-de-jogo-cometa',
    name: 'Camisa de Jogo 星座',
    price: 249,
    description: 'Camisa de jogo em dry-fit com textura colmeia, gola V listrada e recortes em chamas que acompanham o corpo. Modelagem boxy, um pouco mais curta.',
    details: ['Poliéster reciclado com textura colmeia', 'Gola V e punhos listrados', 'Estampa por sublimação', 'Modelagem boxy'],
    variants: [
      {
        id: 'preto-lilas',
        name: 'Preto/Lilás',
        swatch: '#B89BE0',
        images: { front: jerseyPretoFrente, back: jerseyPretoCostas },
        stock: { P: 3, M: 4, G: 4, GG: 2 },
      },
      {
        id: 'creme-vinho',
        name: 'Creme/Vinho',
        swatch: '#8E2430',
        images: { front: jerseyVinhoFrente, back: jerseyVinhoCostas },
        stock: { P: 1, M: 3, G: 2, GG: 0 },
      },
    ],
  },
];

export const findProduct = (id: string) => products.find((p) => p.id === id)!;
export const findVariant = (p: Product, id?: string) => p.variants.find((v) => v.id === id) ?? p.variants[0];
export const formatBRL = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
