import { DrawService } from "./DrawService";
import { IArkOptions } from "../types";

export class CanvasDraw {
  private readonly context;
  private readonly drawService;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.drawService = new DrawService(context);
  }

  /** арка/круг size.start = -Math.PI / 4, size.start = Math.PI / 4, */
  public arc(options: IArkOptions) {
    const { size, border, fill } = options;

    this.context.beginPath();
    this.context.arc(
      size.x,
      size.y,
      size.radius,
      size.start ? size.start : 0,
      size.end ? size.end : Math.PI * 2
    );

    this.drawService.checkFill(fill);
    this.drawService.checkBorder(border);
  }

  /** Сектор  */
  public drawSelectors(options: IArkOptions) {
    const { size, border, fill } = options;

    this.context.beginPath();
    this.context.moveTo(size.x, size.y);
    this.context.arc(
      size.x,
      size.y,
      size.radius,
      size.start ? this.drawService.degreesToRadians(size.start) : 0,
      size.end ? this.drawService.degreesToRadians(size.end) : Math.PI * 2
    );

    this.drawService.checkFill(fill);
    this.drawService.checkBorder(border);
  }
}
