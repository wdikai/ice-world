export class Matrix2DOutOfBoundsError extends Error {
    constructor (public readonly xOffset: number,
        public readonly yOffset: number) {
        super("Out of bounds");
    }
}