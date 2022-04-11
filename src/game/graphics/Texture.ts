export class Texture {
  public readonly image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    this.image = image;
  }

  get width(): number {
    return this.image.width * 3;
  }

  get height(): number {
    return this.image.height * 3;
  }
}
