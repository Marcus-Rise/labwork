export default class Answer {
    get imgHeight(): string | null {
        return this._imgHeight;
    }
    get imgWidth(): string | null {
        return this._imgWidth;
    }
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
    private readonly _imgWidth: string | null;
    private readonly _imgHeight: string | null;

    constructor(obj: AnswerApi)
    constructor(title: string, isRight: boolean)
    constructor(
        titleOrApiObj: string | AnswerApi,
        isRight?: boolean,
        img?: string,
        imgHeight?: string,
        imgWidth?: string
    ) {
        if (typeof titleOrApiObj === "string") {
            this._title = titleOrApiObj || null;
            this._isRight = isRight ? isRight : false;
            this._img = img || null;
            this._imgHeight = imgHeight || null;
            this._imgWidth = imgWidth || null;
        } else {
            this._title = titleOrApiObj.title || null;
            this._isRight = titleOrApiObj.true;
            this._img = titleOrApiObj.img || null;
            this._imgWidth = titleOrApiObj.img_width || null;
            this._imgHeight = titleOrApiObj.img_height || null;
        }
    }
}

export interface AnswerApi {
    title?: string
    true: boolean
    img?: string;
    img_width?: string;
    img_height?: string;
}
