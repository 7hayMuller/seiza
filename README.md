# Seiza 星座

Vitrine que imita uma arara de loja física. Feita com React, TypeScript, Vite e Framer Motion. Não tem back-end: catálogo, estoque e sacola são mockados.

## Rodar

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # build normal em /dist (Vercel, Netlify, GitHub Pages)
npm run build:single  # um único index.html em /dist-single
```

## Como funciona

| Estado | Arquivo | Técnica |
|---|---|---|
| Arara | `src/components/Rack.tsx` | Peças sobrepostas (margem negativa). No hover: `scale`, `z-index` e balanço com `rotate` a partir do gancho. |
| Arara → foco | `Rack.tsx` + `FocusView.tsx` | Mesmo `layoutId` (`garment-<id>`) nos dois estados: o Framer Motion anima a peça da arara até o centro. |
| Navegação | `FocusView.tsx` | `AnimatePresence` com direção, setas do teclado, arrastar para os lados e `Esc` para voltar. |
| Frente/costas | `FocusView.tsx` | Troca com "giro" em `scaleX`. |
| Cores | `ColorTags.tsx` | Etiquetas penduradas com animação de mola. Cada uma é uma variante. |
| Produto | `ProductPage.tsx` | Cor, tamanho (com esgotados), guia de medidas, quantidade. |
| Sacola | `CartDrawer.tsx` + `hooks/useCart.ts` | Estado em React, salvo no `localStorage`. O checkout é simulado. |

## Usar fotos (Unsplash etc.)

1. Remova o fundo e exporte em **PNG ou WebP com transparência, proporção 3:4** (ex.: 900×1200).
2. Deixe **o gancho do cabide no topo, centralizado**, com a mesma margem em todas as fotos. É isso que alinha as peças no trilho.
3. Salve em `src/assets/garments/` e importe em `src/data/products.ts` (assim a imagem também entra no build de arquivo único):

```ts
import teePretoFrente from '../assets/garments/tee-preto-frente.webp';
// ...
{ id: 'preto', name: 'Preto', swatch: '#1B1C20', ..., images: { front: teePretoFrente, back: teePretoCostas }, drawHanger: true }
```

`drawHanger: true` desenha o gancho do cabide atrás da foto, para imagens que vêm sem cabide. Exemplo pronto: Jaqueta College 星座.

Sem `images`, a peça aparece como silhueta SVG. Sem `back`, o botão Frente/Costas some para aquela cor.

Dica: no Unsplash é difícil achar a mesma peça em várias cores e de costas. Duas saídas:
- usar uma cor por peça e deixar só a etiqueta daquela cor;
- fotografar uma peça branca/clara e gerar as outras cores com uma camada `multiply` no Figma/Photoshop.

Os créditos do Unsplash não são obrigatórios, mas é bom citar os fotógrafos no "Sobre".
