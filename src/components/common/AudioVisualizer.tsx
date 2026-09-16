import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  barColor?: string;
  barCount?: number;
  height?: number;
  mode?: 'listening' | 'speaking' | 'idle';
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isActive,
  barColor = '#0078D4',
  barCount = 28,
  height = 42,
  mode = 'idle',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 4;

        if (isActive) {
          // Dynamic sine wave simulation
          const frequency = mode === 'listening' ? 0.3 : 0.25;
          const amp = mode === 'listening' ? 0.8 : 0.65;
          const raw = Math.sin(phase + i * frequency) * Math.cos(phase * 0.7 + i * 0.15);
          barHeight = Math.max(4, Math.abs(raw) * height * amp + (Math.sin(phase * 2 + i) * 6));
        }

        const x = i * (barWidth + 2);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = isActive ? barColor : '#CBD5E1';
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      if (isActive) {
        phase += mode === 'listening' ? 0.18 : 0.12;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, barColor, barCount, height, mode]);

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={height}
      style={{ display: 'block', margin: '0 auto', maxWidth: '100%' }}
    />
  );
};
