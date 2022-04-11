import { Matrix2D } from "./Matrix2D";
import { Point } from "./Point";

export class Matrix2DUtils {
    static min(matrix: Matrix2D<number>): number {
        return matrix.array.reduce((result, item) => Math.min(result, item), Infinity);
    }

    static max(matrix: Matrix2D<number>): number {
        return matrix.array.reduce((result, item) => Math.max(result, item), -Infinity);
    }

    static maxPosition(matrix: Matrix2D<number>): Point {
        const index = matrix.array.indexOf(Matrix2DUtils.max(matrix));
        const xOffset = index % matrix.width;
        const yOffset = Math.floor(index / matrix.width);

        return new Point(xOffset, yOffset);
    }
}