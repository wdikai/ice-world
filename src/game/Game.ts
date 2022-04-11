import { AbstractGameObject } from './core/AbstractGameObject';
import { FireSystem } from './Fire';
import { Renderer } from './graphics/Renderer';
import { Keyboard } from './input/Keyboard';
import { Mouse } from './input/Mouse';
import { MouseButton } from './input/MouseButton';
import { MathUtils } from './math/MathUtils';
import { Matrix2DUtils } from './math/Matrix2DUtils';
import { Player } from './Player';
import { World } from './World';

const CELL_SIZE = 24;

export class Game extends AbstractGameObject {
  keyBoard: Keyboard;
  world: World;
  fireSystem: FireSystem;
  player: Player;
  mouse: Mouse;

  async init() {
    this.keyBoard = new Keyboard();
    this.mouse = new Mouse();
    this.keyBoard.init();
    this.mouse.init();
    this.world = new World({
      width: 32,
      height: 32,
      tileSize: CELL_SIZE,
      snowSpeed: 0.01,
      grid: 10,
    });
    this.fireSystem = new FireSystem(this.world);
    this.player = new Player(this.keyBoard, Matrix2DUtils.maxPosition(this.world.groundLevel), this.world);
  }

  fixedUpdate(): void {}

  update(deltaTime: number): void {
    this.world.update(deltaTime);
    this.fireSystem.update(deltaTime);
    this.player.update(deltaTime);

    if(this.mouse.isClicked(MouseButton.main)) {
      const cell = MathUtils.convertToCellPosition(this.mouse.position, CELL_SIZE);
      console.log(cell.toString());
      this.fireSystem.addFire(cell);
    }

    this.keyBoard.update();
    this.mouse.update();
  }

  draw(renderer: Renderer): void {
    renderer.clear();
    this.world.draw(renderer);
    this.fireSystem.draw(renderer);
    this.player.draw(renderer);

    const cell = MathUtils.convertToCellPosition(this.mouse.position, CELL_SIZE);
    renderer.drawRect(
      cell.x * CELL_SIZE,
      cell.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
      'yellow'
    )
  }
}
