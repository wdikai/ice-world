import { AbstractGameObject } from "./core/AbstractGameObject";
import { Renderer } from "./graphics/Renderer";
import { Keyboard } from "./input/Keyboard";
import { KeyCode } from "./input/KeyCode";
import { MathUtils } from "./math/MathUtils";
import { Point } from "./math/Point";
import { PointUtils } from "./math/PointUtils";
import { World } from "./World";

const CELL_SIZE = 24;
const IMPACT_DISTANCE = 3;

export class Player extends AbstractGameObject {
    keyboard: Keyboard;
    position: Point;
    world: World;

    constructor(keyboard: Keyboard, position: Point, world: World) {
        super();
        this.keyboard = keyboard;
        this.position = position;
        this.world = world;
    }

    update(deltaTime: number): void {
        if(this.world.isUnderWater(this.position)) {
            alert("Game over");
        }

        if(this.keyboard.isClicked(KeyCode.arrowUp)) {
            this.position = new Point(this.position.x, this.position.y - 1);
        }

        if(this.keyboard.isClicked(KeyCode.arrowDown)) {
            this.position = new Point(this.position.x, this.position.y + 1);
        }

        if(this.keyboard.isClicked(KeyCode.arrowLeft)) {
            this.position = new Point(this.position.x - 1, this.position.y);
        }

        if(this.keyboard.isClicked(KeyCode.arrowRight)) {
            this.position = new Point(this.position.x + 1, this.position.y);
        }

        const points = PointUtils.getNeighborhoodCells(
            this.position,
            new Point(this.world.width, this.world.height),
            new Point(0, 0),
            IMPACT_DISTANCE
        );
        points.forEach(point => {
            const distance = PointUtils.distance(point, this.position);
            const impact = MathUtils.lerp(0, 1, distance + 1 / IMPACT_DISTANCE) * 0.001 * deltaTime;
            this.world.impactTemperature(point.x, point.y, impact);
        });
    }

    draw(renderer: Renderer): void {
        renderer.fillRect(
            this.position.x * CELL_SIZE,
            this.position.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
            'red'
        );
    }

}