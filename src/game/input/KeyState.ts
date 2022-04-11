import { KeyCode } from './KeyCode';

export class KeyState {
  public readonly code: KeyCode;
  private isKeyPressed: boolean;
  private isKeyReleased: boolean;
  private isKeyClicked: boolean;

  constructor(code: KeyCode) {
    this.code = code;
    this.isKeyPressed = false;
    this.isKeyClicked = false;
    this.isKeyReleased = false;
  }

  public get isPressed(): boolean {
    return this.isKeyPressed;
  }

  public get isClicked(): boolean {
    return this.isKeyClicked;
  }

  public get isReleased(): boolean {
    return this.isKeyReleased;
  }

  public onDown(): void {
    this.isKeyClicked = !this.isKeyPressed;
    this.isKeyPressed = true;
  }

  public onUp(): void {
    this.isKeyPressed = false;
    this.isKeyClicked = false;
    this.isKeyReleased = true;
  }

  public update(): void {
    this.isKeyClicked = false;
    this.isKeyReleased = false;
  }
}
