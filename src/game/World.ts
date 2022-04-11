import { AbstractGameObject } from "./core/AbstractGameObject";
import { Renderer } from "./graphics/Renderer";
import { MathUtils } from "./math/MathUtils";
import { Matrix2D } from "./math/Matrix2D";
import { Matrix2DUtils } from "./math/Matrix2DUtils";
import { Noise } from "./math/Noise";
import { Point } from "./math/Point";

export interface WorldOptions {
    width: number;
    height: number;
    tileSize: number;
    snowSpeed: number;
    grid: number;
};

export class World extends AbstractGameObject {
    groundLevel: Matrix2D<number>;
    waterLine: number;
    tileSize: number;
    snowSpeed: number;
    width: number;
    height: number;
    chaceToMakeIce: number;

    constructor(options: WorldOptions) {
        super();
        this.width = options.width;
        this.height = options.height;
        this.groundLevel = Noise.diamondSquare(options.width, options.grid, 0);
        const minLevel = Matrix2DUtils.min(this.groundLevel);
        this.groundLevel = this.groundLevel.map(value => value - minLevel + 100);
        
        for(let yOffset = 0; yOffset < this.height; yOffset++) {
            this.groundLevel.set(0, yOffset, 0);
            this.groundLevel.set(this.width - 1, yOffset, 0);
        }

        for(let xOffset = 0; xOffset < this.width; xOffset++) {
            this.groundLevel.set(xOffset, 0, 0);
            this.groundLevel.set(xOffset, this.height - 1, 0);
        }

        this.waterLine = 0;
        this.tileSize = options.tileSize;
        this.snowSpeed = options.snowSpeed;
        this.chaceToMakeIce = 0.5;
    }

    isUnderWater(position: Point): boolean {
        return this.groundLevel.get(position.x, position.y) < this.waterLine;
    }

    update(deltaTime): void {
        this.groundLevel = this.groundLevel
            .map((level) => {
                const growUp = level > this.waterLine
                    ? MathUtils.randomNumber(this.snowSpeed * deltaTime)
                    : 0;

                return level + growUp;
            })
            .map((level, x, y, matrix) => {
                if(level <= this.waterLine) {
                    const iceNeighborhood = matrix
                    .getNeighborhood(x, y)
                    .filter(value => value > this.waterLine);    

                    if(iceNeighborhood.length >= 3
                        && MathUtils.chance(1)
                        && x > 0
                        && y > 0
                        && x < matrix.width - 1
                        && y < matrix.height - 1) {
                        return this.waterLine + 1;
                    }
                }

                return level;
            });

    }

    impactTemperature(xOffset: number, yOffset: number, impactValue: number): void {
        const level = this.groundLevel.get(xOffset, yOffset);
        const newLevel = level - impactValue;
        this.groundLevel.set(xOffset, yOffset, newLevel);
        this.waterLine += impactValue / this.groundLevel.width * this.groundLevel.height;
    }

    draw(renderer: Renderer): void {
        const worlLevel = this.groundLevel.map((level) => level - this.waterLine);
        const maxLevel = Matrix2DUtils.max(worlLevel); 
        worlLevel.each((level, xOffset, yOffset) => {
            const levelInt = Math.floor(level);
            const colorLevel = MathUtils.lerp(100, 255, level / maxLevel);
            const color = levelInt > 0 
                ? `rgba(${colorLevel},${colorLevel},${colorLevel},1)`
                : 'blue';
            renderer.fillRect(
                xOffset * this.tileSize,
                yOffset * this.tileSize,
                this.tileSize,
                this.tileSize,
                color
            );
        });
    }
} 