import { PieChardDraw } from "../canvas";

export const animatePie = (
  context: CanvasRenderingContext2D,
  pieChardDraw: PieChardDraw
) => {
  const contextWidth = context.canvas.width;
  const contextHeight = context.canvas.height;

  const clearCanvas = () => {
    context.clearRect(0, 0, contextWidth, contextHeight);
  };

  const updateGameObjects = () => {
    pieChardDraw.update();
  };

  const animateFrame = () => {
    clearCanvas();
    updateGameObjects();
  };

  return function startAnimation() {
    animateFrame();
  };
};
