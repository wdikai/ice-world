import { Vector2D } from "./Vector2D";

export class Point {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `Point (${this.x}, ${this.y})`;
    }

    toVector2D(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
}