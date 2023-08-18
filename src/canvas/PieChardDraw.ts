import { COLOR_BLACK } from "../constants/colors";
import { ISelector, PieChardDrawProps } from "../types";
import { CanvasDraw } from "./CanvasDraw";

export class PieChardDraw {
  private radius: number;
  private drawService: CanvasDraw;
  private selectors: ISelector[];

  constructor({ radius, drawService, selectors }: PieChardDrawProps) {
    this.radius = radius;
    this.drawService = drawService;
    this.selectors = selectors;
  }

  private drawCenter() {
    this.drawService.arc({
      size: { radius: 33, x: this.radius, y: this.radius },
      fill: { color: COLOR_BLACK },
    });
  }

  private drawSelectors() {
    let startAngle = 0;

    for (const selector of this.selectors) {
      const degrees = (selector.ratio / 100) * 360;

      this.drawService.drawSelectors({
        size: {
          radius: selector.radius,
          x: this.radius,
          y: this.radius,
          start: startAngle,
          end: startAngle + degrees,
        },
        fill: { color: selector.color },
      });
      startAngle += degrees;
    }
  }

  public update() {
    this.drawSelectors();
    this.drawCenter();
  }
}
