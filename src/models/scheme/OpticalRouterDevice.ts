export default class OpticalRouterDevice {
    get passing(): number {
        return this._passing;
    }

    set passing(value: number) {
        this._passing = value;
    }
    private _passing: number;

    constructor() {
        this._passing = 55;
    }

}
