export class AppService {
    private readonly _env: string;

    get isDevMode(): boolean {
        return this._env === "development";
    }

    constructor() {
        this._env = process.env.NODE_ENV;
    }
}

export const app: AppService = new AppService();
