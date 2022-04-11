import { Vector2D } from '../math/Vector2D';
import { MathUtils } from '../math/MathUtils';

export class Camera {
  width: number;
  height: number;
  position: Vector2D;

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
    this.position = Vector2D.zero;
  }

  setCenter(x: number, y: number): void {
    const halfWidth = this.width / 2;
    const halfHieght = this.height / 2;
    const xPos = MathUtils.minMax(x - halfWidth, 3000 - this.width + 20, 0);
    const yPos = MathUtils.minMax(y - halfHieght, 1600 - halfHieght, 0);
    this.position
      .setX(xPos)
      .setY(yPos);
  }
}
