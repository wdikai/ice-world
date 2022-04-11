import { GameManager } from "./game/GameManager";

GameManager.bootstrap(900, 900).then(loop => loop.run());