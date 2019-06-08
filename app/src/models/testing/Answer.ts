export default class Answer {
    get img(): string | null {
        return this._img;
    }

    get isRight(): boolean {
        return this._isRight;
    }

    get title(): string | null {
        return this._title;
    }

    private readonly _title: string | null;
    private readonly _isRight: boolean;
    private readonly _img: string | null;

    constructor(obj: AnswerApi)
    constructor(title: string, isRight: boolean)
    constructor(titleOrApiObj: string | AnswerApi, isRight?: boolean, img?: string) {
        if (typeof titleOrApiObj === "string") {
            this._title = titleOrApiObj || null;
            this._isRight = isRight ? isRight : false;
            this._img = img || null;
        } else {
            this._title = titleOrApiObj.title || null;
            this._isRight = titleOrApiObj.true;
            this._img = titleOrApiObj.img || null;
        }
    }
}

export interface AnswerApi {
    title?: string
    true: boolean
    img?: string;
}
