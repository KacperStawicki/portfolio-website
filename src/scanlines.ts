import { useLayoutEffect, RefObject } from "react";

export function useScanlinesEffect(
  canvasRef: RefObject<HTMLCanvasElement>,
  themeColor: string
): void {
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const { width, height } = canvas;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        for (let i = 0; i < height; i += 2) {
          ctx.fillRect(0, i, width, 1);
        }
      }
    }
  }, [canvasRef, themeColor]);
}
