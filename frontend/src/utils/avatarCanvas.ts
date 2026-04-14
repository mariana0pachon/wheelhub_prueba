/*
  Generated with Claude.ai
*/
export const CANVAS_SIZE = 300;

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

export function strokesToSvg(strokes: Stroke[], bgColor: string): string {
  const paths = strokes
    .map((stroke) => {
      if (stroke.points.length === 0) return '';
      if (stroke.points.length === 1) {
        const p = stroke.points[0];
        return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(stroke.width / 2).toFixed(1)}" fill="${stroke.color}" />`;
      }
      const d = stroke.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
        .join(' ');
      return `<path d="${d}" stroke="${stroke.color}" stroke-width="${stroke.width}" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
    })
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}"><rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="${bgColor}" />${paths}</svg>`;
}

export function drawStrokeOnCtx(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length === 0) return;
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (stroke.points.length === 1) {
    ctx.fillStyle = stroke.color;
    ctx.beginPath();
    ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (let i = 1; i < stroke.points.length; i++) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
  }
  ctx.stroke();
}
