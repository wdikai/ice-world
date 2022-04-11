import { Point } from "./Point";

export class MathUtils {
  static minMax(value: number, max: number, min: number = 0): number {
    return Math.min(Math.max(value, min), max);
  }

  static randomNumber(max: number, min: number = 0): number {
    return Math.random() * (max - min) + min;
  }

  static randomInt(max: number, min: number = 0): number {
    return Math.round(MathUtils.randomNumber(max, min));
  }

  static sum(...args: number[]): number {
    return args.reduce((sum, value) => {
        sum += value;
        return sum;
    }, 0);
  }

  static median(...args: number[]): number {
      return MathUtils.sum(...args) / args.length;
  }

  static convertToCellPosition(point: Point, cellSize: number): Point {
    return new Point(
      Math.floor(point.x / cellSize),
      Math.floor(point.y / cellSize),
    );
  }

  static lerp(v0: number, v1: number, time: number) {
    return (1 - time) * v0 + time * v1;
  }

  static chance(percent: number): boolean {
    return MathUtils.randomNumber(100) <= percent;
  }
}
