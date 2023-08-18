# Круговая диаграмма на Canvas

  Данное приложение реализует круговую диаграмму на элементе canvas без использования дополнительных библиотек. 
  Количество значений в диаграмме генерируется случайным образом при каждом построении графика и может варьироваться от 1 до 8.

  При клике на диаграмму происходит перестроение, генерируются новые значения для секторов и обновляется отображение.

  Каждый сектор диаграммы представлен двумя значениями: долей сектора и его радиусом.

  Цвета секторов соответствуют заданным в макете.

  ## Установка и запуск

  Клонируйте репозиторий на локальную машину:

  https://github.com/Ruslan-Gubin/test-gis.git

  Перейдите в директорию проекта:

  cd your-repo


 ## Пример кода
```
import { PieChardDraw, CanvasDraw } from "../../canvas";
import { animatePie, calculateRandomPieSectors } from "../../utils";
import styles from "./pie-chart.css?inline";

class PieChard extends HTMLElement {
  private  root: HTMLDivElement;
  private  canvas: HTMLCanvasElement;
  private  context: CanvasRenderingContext2D | null;
  private  radius: number = 0;
  private  sectors = calculateRandomPieSectors();
  private  refreshPieHandler: () => void;
  oldValue: null | string = null;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.insertAdjacentText("beforeend", styles);

    this.root = document.createElement("div");
    this.root.classList.add("root");

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    shadow.append(style);
    shadow.append(this.root);
    this.root.append(this.canvas);

    this.refreshPieHandler = this.refreshPie.bind(this);
  }

  render() {
    this.canvasSetupStyles();

    if (!this.context) {
      console.error("Failet to get canvas context");
      return;
    }

    const drawService = new CanvasDraw(this.context);

    const pieChard = new PieChardDraw({
      radius: this.radius,
      drawService,
      selectors: this.sectors,
    });

    const animateClouser = animatePie(this.context, pieChard);

    requestAnimationFrame(animateClouser);

    this.canvas.addEventListener("click", this.refreshPieHandler);
  }

  refreshPie() {
    this.canvas.removeEventListener("click", this.refreshPieHandler);
    this.sectors = calculateRandomPieSectors();
    this.render();
  }

  canvasSetupStyles() {
    this.canvas.width = this.radius * 2;
    this.canvas.height = this.radius * 2;
    this.canvas.style.cursor = "pointer";
  }

  static get observedAttributes() {
    return ["radius"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "radius":
        this.oldValue = oldValue;
        this.radius = parseInt(newValue, 10);
        break;
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("pie-chard", PieChard);
