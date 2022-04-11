import { MathUtils } from "./MathUtils";
import { Matrix2D } from "./Matrix2D";

export class Noise {
    static diamondSquare(size: number, seedRange: number, defaultValue: number) {
        const matrix: Matrix2D<number> = new Matrix2D(size, size);
        matrix.set(0, 0, defaultValue);
        matrix.set(size - 1, 0, defaultValue);
        matrix.set(0, size - 1, defaultValue);
        matrix.set(size - 1    , size - 1, defaultValue);

        for (let currentSize = size; currentSize > 1; currentSize /= 2) {
            for (let step = 0; step <= 1; step++) {
                for (let yOffset = 0; yOffset < size; yOffset += currentSize) {
                    for (let xOffset = 0; xOffset < size; xOffset += currentSize) {
                        if(step) {
                            const stepSize = currentSize / 2;
                            Noise.diamondStep(matrix, xOffset, yOffset + stepSize, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + currentSize, yOffset + stepSize, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + stepSize, yOffset, stepSize, seedRange);
                            Noise.diamondStep(matrix, xOffset + stepSize, yOffset + currentSize, stepSize, seedRange);
                        } else {
                            Noise.squareStep(matrix, xOffset, yOffset, currentSize, seedRange);
                        }
                    }
                }
            }
        }

        return matrix;

    }

    static squareStep(matrix: Matrix2D<number>, xOffset: number, yOffset: number, size: number, seedRange = 0.01) {
        const rightBoarderOffset = xOffset + size;
        const bottomBorderOffset = yOffset + size;

        const topLeft = matrix.tryGet(xOffset, yOffset);
        const topRight = matrix.tryGet(rightBoarderOffset, yOffset);
        const bottomLeft = matrix.tryGet(xOffset, bottomBorderOffset);
        const bottomRight = matrix.tryGet(rightBoarderOffset, bottomBorderOffset);
        
        const values = [topLeft, topRight, bottomLeft, bottomRight].filter(v => typeof v === "number");
        const medianValue = MathUtils.median(...values);

        const halfSize = Math.ceil(size / 2);
        const distance = Math.sqrt((size * size) * 2);
        const seed = MathUtils.randomNumber(-seedRange, seedRange) * distance;

        matrix.trySet(xOffset + halfSize, yOffset + halfSize, Math.round(medianValue + seed));
    }

    static diamondStep(matrix: Matrix2D<number> , xOffset: number, yOffset: number, size: number, seedRange = 0.01) {
        const distance = size * 2;

        const left = matrix.tryGet(xOffset - size, yOffset);
        const right = matrix.tryGet(xOffset + size, yOffset);
        const top = matrix.tryGet(xOffset, yOffset - size);
        const bottom = matrix.tryGet(xOffset, yOffset + size);
        const values = [top, left, right, bottom].filter(v => typeof v === "number");

        const medianValue = MathUtils.median(...values);

        const seed = MathUtils.randomNumber(-seedRange, seedRange) * distance;

        matrix.trySet(xOffset, yOffset, Math.round(medianValue + seed));
    }

}