import { Texture } from "./Texture";

export class SpriteSheet {
  public readonly texture: Texture;
  public readonly spriteWidth: number;
  public readonly spriteHeight: number;
  public readonly spritesPerLine: number;

  constructor(texture: Texture) {
    this.texture = texture;
  }

  get width(): number {
    return this.texture.width;
  }

  get height(): number {
    return this.texture.height;
  }
}
