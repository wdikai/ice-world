import { Matrix2DOutOfBoundsError } from "./Matrix2DOutOfBoundsError";

export type MapMatrixFunction<T> = (value: T, x: number, y: number, matrix: Matrix2D<T>) => T;
export type EachMatrixFunction<T> = (value: T, x: number, y: number, matrix: Matrix2D<T>) => void;

export class Matrix2D<T = number> {
    array: T[];
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.array = Array.from({length: width * height});
    }

    get (xOffset: number, yOffset: number): T {
        const position = xOffset + yOffset * this.width;
        if(xOffset < 0 || xOffset >= this.height || yOffset < 0 || yOffset >= this.height) {
            throw new Matrix2DOutOfBoundsError(xOffset, yOffset);
        }

        return this.array[position];
    }

    tryGet (xOffset: number, yOffset: number): T | undefined {
        const position = xOffset + yOffset * this.width;
        if(xOffset < 0 || xOffset >= this.height || yOffset < 0 || yOffset >= this.height) {
            return;
        }

        return this.array[position];
    }

    set (xOffset: number, yOffset: number, value: T): void {
        const position = xOffset + yOffset * this.width;
        if(xOffset < 0 || xOffset >= this.height || yOffset < 0 || yOffset >= this.height) {
            throw new Matrix2DOutOfBoundsError(xOffset, yOffset);
        }

        this.array[position] = value;
    }

    trySet(xOffset: number, yOffset: number, value: T): void {
        const position = xOffset + yOffset * this.width;
        if(xOffset < 0 || xOffset >= this.height || yOffset < 0 || yOffset >= this.height) {
            return;
        }

        this.array[position] = value;
    }

    getNeighborhood(x: number, y: number): T[] {
        const result = [];
        const minX = Math.max(0, x - 1);
        const maxX = Math.min(this.width - 1, x + 1);
        const minY = Math.max(0, y - 1);
        const maxY = Math.min(this.height - 1, y + 1);

        for(let yOffset = minY; yOffset <= maxY; yOffset++) {
            for(let xOffset = minX; xOffset <= maxX; xOffset++) {
                result.push(this.get(xOffset, yOffset));
            }
        }

        return result;
    }

    map(fn: MapMatrixFunction<T>): Matrix2D<T> {
        const result = new Matrix2D<T>(this.width, this.height);
        for(let yOffset = 0; yOffset < this.height; yOffset++) {
            for(let xOffset = 0; xOffset < this.width; xOffset++) {
                const value = fn(this.get(xOffset, yOffset), xOffset, yOffset, this);
                result.set(xOffset, yOffset, value);
            }
        }
                    
        return result;
    }

    each(fn: EachMatrixFunction<T>): void {
        for(let yOffset = 0; yOffset < this.height; yOffset++) {
            for(let xOffset = 0; xOffset < this.width; xOffset++) {
                fn(this.get(xOffset, yOffset), xOffset, yOffset, this);
            }
        }
    }
}