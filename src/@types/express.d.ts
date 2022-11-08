import { Pessoa } from "../entities/Pessoa";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Pessoa>
        }
    }
}