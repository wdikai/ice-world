import { Vector2D } from "./Vector2D";

export class AABB {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get left(): number {
    return this.x;
  }

  get right(): number {
    return this.x + this.w;
  }

  get top(): number {
    return this.y;
  }

  get bottom(): number {
    return this.y + this.h;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  intersectWith(collider: AABB, offset = Vector2D.zero): boolean {
    return (
      this !== collider &&
      this.left + offset.x < collider.right &&
      this.right + offset.x > collider.left &&
      this.top + offset.y < collider.bottom &&
      this.bottom + offset.y > collider.top
    );
  }

  public toString(): string {
    return `[${this.x}, ${this.y}, ${this.w}, ${this.h}]`;
  }
}
