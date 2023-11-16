---
toc: true
comments: true
layout: post
title: Canvas Graph Generation
courses: { csa: {week: 3} }
type: help
---

# Canvas Graph Generation

## Drawing Lines

### Line
- **Process:** 
  - `context.beginPath();`
  - `context.moveTo(x1, y1);`
  - `context.lineTo(x2, y2);`
  - `context.stroke();`
- **Action:** Draw a line between two points.
- **Benefit:** Connect data points or create custom shapes.

### Styling

#### Line Color
- **Process:** 
  - `context.strokeStyle = color;`
- **Action:** Set the stroke color for lines.
- **Benefit:** Customize the appearance of drawn lines.

#### Line Width
- **Process:** 
  - `context.lineWidth = width;`
- **Action:** Set the width of lines.
- **Benefit:** Adjust line thickness for emphasis.

## Text

### Text Drawing
- **Process:** 
  - `context.fillText(text, x, y);`
- **Action:** Draw text on the canvas.
- **Benefit:** Label data points for clarity.

### Font Styling
- **Process:** 
  - `context.font = "fontStyle fontSize fontFamily";`
- **Action:** Set font style for text.
- **Benefit:** Customize text appearance.

## Transformation

### Translate
- **Process:** 
  - `context.translate(x, y);`
- **Action:** Move the canvas origin.
- **Benefit:** Adjust the position of drawn elements.

### Rotate
- **Process:** 
  - `context.rotate(angle);`
- **Action:** Rotate canvas elements.
- **Benefit:** Orient shapes and lines differently.

