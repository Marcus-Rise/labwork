export default class Signal {
    get output(): number {
        return this.getOutput(this._input);
    }


    get input(): number {
        return this._input;
    }

    set input(value: number) {
        this._input = value;
    }
    private _input: number;

    constructor() {
        this._input = -40;
    }

    getOutput(input: number): number {
        let value: number;

        switch (input) {
            case -40:
                value = -6;
                break;
            case -35:
                value = -1;
                break;
            case -30:
                value = 4;
                break;
            case -25:
                value = 8;
                break;
            case -20:
                value = 11;
                break;
            case -15:
                value = 13;
                break;
            case -10:
                value = 15;
                break;
            case -5:
                value = 15;
                break;
            case 0:
                value = 15;
                break;

            default:
                value = 0;
        }

        return value;
    }
}
