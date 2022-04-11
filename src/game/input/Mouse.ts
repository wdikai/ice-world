import { Point } from '../math/Point';
import { KeyState } from './KeyState';
import { MouseButton } from './MouseButton';

export class Mouse {
    public position: Point;

    private keys: Map<number, KeyState>;
    private onUpHandler: (event: any) => void;
    private onDownHandler: (event: any) => void;
    private onMoveHandler: (event: any) => void;

    constructor() {
        this.keys = new Map();
        this.position = new Point(0, 0);
        this.onUpHandler = event => this.onUp(event);
        this.onDownHandler = event => this.onDown(event);
        this.onMoveHandler = event => this.onMove(event);
    }

    init(): void {
        document.addEventListener('mouseup', this.onUpHandler);
        document.addEventListener('mousedown', this.onDownHandler);
        document.addEventListener('mousemove', this.onMoveHandler);
    }

    isPressed(code: MouseButton): boolean {
        return this.keys.has(code) && this.keys.get(code).isPressed;
    }

    isClicked(code: MouseButton): boolean {
        return this.keys.has(code) && this.keys.get(code).isClicked;
    }

    isReleased(code: MouseButton): boolean {
        return this.keys.has(code) && this.keys.get(code).isReleased;
    }

    update(): void {
        this.keys.forEach(key => key.update());
    }

    onMove(event: MouseEvent): void {
        event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        this.position = new Point(x, y);
    }

    onUp(event: MouseEvent): void {
        event.preventDefault();
        const code = event.button;
        const key = this.keys.get(code) || new KeyState(code);
        key.onUp();
        this.keys.set(code, key);
    }

    onDown(event: MouseEvent): void {
        event.preventDefault();
        const code = event.button;
        const key = this.keys.get(code) || new KeyState(code);
        key.onDown();
        this.keys.set(code, key);
    }

    dispose(): void {
        document.removeEventListener('mouseup', this.onUpHandler);
        document.removeEventListener('mousedown', this.onDownHandler);
        document.removeEventListener('mousemove', this.onMoveHandler);
    }
}
