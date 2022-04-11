import { AbstractGameObject } from "./core/AbstractGameObject";
import { Renderer } from "./graphics/Renderer";
import { MathUtils } from "./math/MathUtils";
import { Point } from "./math/Point";
import { PointUtils } from "./math/PointUtils";
import { World } from "./World";

const FIRE_LIFETIME = 5000;

class Fire {
    disabled: boolean;
    lifeTime: number;
    position: Point;

    constructor(position: Point) {
        this.lifeTime = FIRE_LIFETIME;
        this.position = position;
    }

    update(deltaTime: number): void {
        this.lifeTime -= deltaTime;
        if(this.lifeTime < 0) {
            this.disabled = true;
        }
    }
}

const CELL_SIZE = 24;
const IMPACT_DISTANCE = 10;

export class FireSystem extends AbstractGameObject {
    fires: Fire[];
    world: World;

    constructor(world: World) {
        super();
        this.fires = [];
        this.world = world;
    }

    addFire(position: Point): void {
        this.fires.push(new Fire(position));
    }

    update(deltaTime: number): void {
        this.fires.forEach(fire => {
            fire.update(deltaTime);

            if(this.world.groundLevel.get(fire.position.x, fire.position.y) < this.world.waterLine) {
                fire.disabled = true;
            }
        });
        this.fires = this.fires.filter(fire => !fire.disabled);

        this.fires.forEach(fire => {
            const points = PointUtils.getNeighborhoodCells(
                fire.position,
                new Point(this.world.width, this.world.height),
                new Point(0, 0),
                IMPACT_DISTANCE
            );
            points.forEach(point => {
                const distance = PointUtils.distance(point, fire.position);
                const impact = MathUtils.lerp(0, 2, distance / IMPACT_DISTANCE) * 0.01;
                this.world.impactTemperature(point.x, point.y, impact);
            });
        });
    }

    draw(renderer: Renderer): void {
        this.fires.forEach(fire => {
            const height = MathUtils.lerp(0, CELL_SIZE, fire.lifeTime / FIRE_LIFETIME);
            const alpha = MathUtils.lerp(0, 1, fire.lifeTime / FIRE_LIFETIME);
            renderer.fillRect(
                fire.position.x * CELL_SIZE,
                fire.position.y * CELL_SIZE + (CELL_SIZE - height),
                CELL_SIZE,
                height,
                `rgba(255, 0, 0, ${alpha})`
            );

            const points = PointUtils.getNeighborhoodCells(
                fire.position,
                new Point(this.world.width, this.world.height),
                new Point(0, 0),
                IMPACT_DISTANCE
            );
            points.forEach(point => {
                const distance = PointUtils.distance(point, fire.position);
                const alpha = MathUtils.lerp(0.75, 0, distance / IMPACT_DISTANCE);
                
                renderer.fillRect(
                    point.x * CELL_SIZE,
                    point.y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE,
                    `rgba(255, 255, 0, ${alpha})`
                );
            });
        })
    }
}