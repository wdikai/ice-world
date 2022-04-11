import { Animation } from '../graphics/Animation';
import { Texture } from '../graphics/Texture';

export class ResourceManager {
  static async loadTexture(url: string): Promise<Texture> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(new Texture(image));
      image.onerror = () => reject(new Error(`Fail on load image (${url})`));
    });
  }

  static async loadAnimation(
    urls: string[],
    timeout: number,
    repeat: boolean = true
  ): Promise<Animation> {
    const textures = await Promise.all(
      urls.map(url => ResourceManager.loadTexture(url))
    );

    return new Animation(textures, timeout, repeat);
  }
}
