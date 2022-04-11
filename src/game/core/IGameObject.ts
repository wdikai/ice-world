import { Renderer } from '../graphics/Renderer';

export interface IGameObject {
  init(): Promise<void>;
  fixedUpdate(): void;
  update(deltaTime: number): void;
  draw(renderer: Renderer): void;
}
