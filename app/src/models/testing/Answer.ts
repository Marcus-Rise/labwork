export default class Answer {
  get isRight(): boolean {
    return this._isRight;
  }

  get title(): string {
    return this._title;
  }

  private readonly _title: string;
  private readonly _isRight: boolean;

  constructor(obj: AnswerApi)
  constructor(title: string, isRight: boolean)
  constructor(titleOrApiObj: string | AnswerApi, isRight?: boolean) {
    if (typeof titleOrApiObj === "string") {
      this._title = titleOrApiObj;
      this._isRight = isRight ? isRight : false;
    } else {
      this._title = titleOrApiObj.title;
      this._isRight = titleOrApiObj.true;
    }
  }
}

export interface AnswerApi {
  title: string
  true: boolean
}
