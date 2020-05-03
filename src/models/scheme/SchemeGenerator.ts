/**
 * Генератор
 *
 * @field power {number} мощность оптического излучения -3дБ до 3дБ
 * @field waveLength {number} длинна волны от 1530нм до 1565нм
 */
export default class SchemeGenerator {
  get waveLength(): number {
    return this._waveLength;
  }

  set waveLength(value: number) {
    if (value >= 1530 && value <= 1565) {
      this._waveLength = value;
    } else {
      throw Error("invalid argument");
    }
  }

  get power(): number {
    return this._power;
  }

  set power(value: number) {
    if (value >= -3 && value <= 3) {
      this._power = value;
    } else {
      throw Error("invalid argument");
    }
  }

  private _power: number;
  private _waveLength: number;

  constructor(power?: number, waveLength?: number) {
    this._power = power || 0;
    this._waveLength = waveLength || 1550;
  }
}
