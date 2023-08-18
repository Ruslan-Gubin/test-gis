import { CanvasDraw } from "../canvas";

type FillOptions = { color?: string };

type BorderOptions = {
  color?: string;
  width?: number;
  join?: "bevel" | "round";
};

interface FillBorderOptions {
  fill?: FillOptions;
  border?: BorderOptions;
}

export interface IArkOptions extends FillBorderOptions {
  size: { x: number; y: number; radius: number; start?: number; end?: number };
}

export interface ISelector {
  ratio: number;
  radius: number;
  color: string;
}

export interface PieChardDrawProps {
  radius: number;
  drawService: CanvasDraw;
  selectors: ISelector[];
}
