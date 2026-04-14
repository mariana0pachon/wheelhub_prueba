/*
  Generated with Claude.ai
*/
import { useEffect, useRef, useState } from 'react';
import { Button, Typography } from 'antd';
import {
  CANVAS_SIZE,
  type Point,
  type Stroke,
  strokesToSvg,
  drawStrokeOnCtx,
} from '../utils/avatarCanvas';

interface AvatarCanvasProps {
  initialBgColor?: string;
  existingAvatar?: { bgColor?: string; svg?: string } | null;
  onChange: (avatar: { bgColor: string; svg: string } | null) => void;
}

export default function AvatarCanvas({
  initialBgColor,
  existingAvatar,
  onChange,
}: AvatarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [drawColor, setDrawColor] = useState('#e63946');
  const [brushSize, setBrushSize] = useState(4);
  const [bgColor, setBgColor] = useState(initialBgColor ?? '#ffffff');
  const isDrawing = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (initialBgColor) setBgColor(initialBgColor);
  }, [initialBgColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    for (const stroke of strokes) drawStrokeOnCtx(ctx, stroke);
    if (currentStroke) drawStrokeOnCtx(ctx, currentStroke);
  }, [strokes, currentStroke, bgColor]);

  useEffect(() => {
    if (strokes.length > 0) {
      onChangeRef.current({ bgColor, svg: strokesToSvg(strokes, bgColor) });
    } else {
      onChangeRef.current(null);
    }
  }, [strokes, bgColor]);

  function getCanvasPoint(e: React.MouseEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE,
    };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    isDrawing.current = true;
    const point = getCanvasPoint(e);
    setCurrentStroke({ points: [point], color: drawColor, width: brushSize });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) return;
    const point = getCanvasPoint(e);
    setCurrentStroke((prev) => (prev ? { ...prev, points: [...prev.points, point] } : prev));
  }

  function handleMouseUp() {
    if (!isDrawing.current || !currentStroke) return;
    isDrawing.current = false;
    setStrokes((prev) => [...prev, currentStroke]);
    setCurrentStroke(null);
  }

  return (
    <div style={{ marginBottom: 24, display: 'flex' }}>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 8,
            flexWrap: 'wrap',
          }}
        >
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            pincel
          </Typography.Text>
          <input
            type='color'
            value={drawColor}
            onChange={(e) => setDrawColor(e.target.value)}
            title='color del pincel'
            style={{
              width: 28,
              height: 28,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              borderRadius: 4,
            }}
          />
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            fondo
          </Typography.Text>
          <input
            type='color'
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            title='color de fondo'
            style={{
              width: 28,
              height: 28,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              borderRadius: 4,
            }}
          />
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            grosor
          </Typography.Text>
          <input
            type='range'
            min={1}
            max={24}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: 72 }}
          />
          <div
            style={{
              width: brushSize,
              height: brushSize,
              borderRadius: '50%',
              background: drawColor,
              flexShrink: 0,
            }}
          />
          <div style={{ width: 500 }}>
            <Button
              size='small'
              onClick={() => {
                setStrokes([]);
                setCurrentStroke(null);
              }}
            >
              limpiar
            </Button>
            {strokes.length > 0 && (
              <Button size='small' onClick={() => setStrokes((prev) => prev.slice(0, -1))}>
                deshacer
              </Button>
            )}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            cursor: 'crosshair',
            display: 'block',
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            touchAction: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {strokes.length === 0 && existingAvatar?.svg && (
        <div style={{ marginTop: 8 }}>
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            avatar actual (dibuja en el canvas para reemplazarlo):
          </Typography.Text>
          <div style={{ marginTop: 4 }} dangerouslySetInnerHTML={{ __html: existingAvatar.svg }} />
        </div>
      )}
    </div>
  );
}
