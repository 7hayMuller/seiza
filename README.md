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


