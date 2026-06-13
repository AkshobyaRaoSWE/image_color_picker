# Image Color Picker

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Drop in an image and click any pixel to read its exact colour as hex and RGB, with a live
swatch. Everything runs in the browser on an HTML5 canvas, so no image ever leaves your
machine.

## Features

- Drag-and-drop an image to load it onto a canvas.
- Click anywhere to sample that pixel; the colour shows as both `#RRGGBB` and `rgb(r, g, b)`
  alongside a full-size swatch.
- Fully client-side: no upload, no server, no API.

## How it works

The image is drawn to a `<canvas>` and the picked pixel is read with
`getContext("2d").getImageData(x, y, 1, 1)`. Because the canvas is scaled by the layout, the
click coordinates are converted back to true pixel coordinates using the ratio of canvas
resolution to its rendered size, so the sampled pixel matches exactly where you click. The
RGBA bytes are then formatted to hex with zero-padding.

## Tech stack

- **Next.js (App Router) + React + TypeScript**
- **HTML5 Canvas** for pixel sampling
- **Tailwind CSS**

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Project layout

```
src/app/
  page.tsx     # canvas, drag-and-drop, click-to-sample, RGBA -> hex conversion
```
