export default class TelephoneDevice {
    get powerOn(): boolean {
        return this._powerOn;
    }

    set powerOn(value: boolean) {
        this._powerOn = value;
    }

    private _powerOn: boolean;

    constructor() {
        this._powerOn = false;
    }
}
