import { Point } from "./Point";

export class PointUtils {
    static distance(first: Point, second: Point): number {
        return first
            .toVector2D()
            .sub(second.toVector2D())
            .length;
    }

    static getNeighborhoodCells(point: Point, max: Point, min: Point, distance: number): Point[] {
        const result = [];
        const minX = Math.round(Math.max(min.x, point.x - distance));
        const minY = Math.round(Math.max(min.y, point.y - distance));

        const maxX = Math.round(Math.min(max.x, point.x + distance));
        const maxY = Math.round(Math.min(max.y, point.y + distance));

        for(let yOffset = minY; yOffset < maxY; yOffset++) {
            for(let xOffset = minX; xOffset < maxX; xOffset++) {
                const neighborhood = new Point(xOffset, yOffset);

                if(PointUtils.distance(point, neighborhood) <= distance) {
                    result.push(neighborhood);
                }
            }
        }

        return result;
    } 
}