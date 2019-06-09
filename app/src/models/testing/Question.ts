import Answer, {AnswerApi} from "./Answer";

export default class Question {
    get multiply(): boolean {
        return this._multiply;
    }

    get img(): string | null {
        return this._img;
    }

    get status(): boolean | null {
        return this._status;
    }

    clear(): void {
        this._status = null;

        this.clearAnswers();
    }

    get answers(): Answer[] {
        return this._answers;
    }

    get title(): string {
        return this._title;
    }

    private readonly _title: string;
    private readonly _answers: Answer[] = [];
    private readonly _img: string | null;
    private readonly _multiply: boolean;
    private _status: boolean | null = null;

    constructor(obj: QuestionApi)
    constructor(titleOrApiObj: string | QuestionApi, img?: string, answers?: Answer[], multiply?: boolean) {
        if (typeof titleOrApiObj === "string") {
            this._title = titleOrApiObj;
            this._img = img || null;
            this._multiply = multiply !== undefined ? multiply : false;
            this.addAnswers(answers ? answers : []);
        } else {
            this._title = titleOrApiObj.title;
            this._img = titleOrApiObj.img || null;
            this._multiply = titleOrApiObj.multiply || false;
            this.addAnswers(titleOrApiObj.answers);
        }
    }

    addAnswer(answer: Answer | AnswerApi): void {
        if (!(answer instanceof Answer)) {
            answer = new Answer(answer);
        }

        const isRightExists: boolean = this._answers.filter(item => item.isRight).length === 1;

        if (!this._multiply && isRightExists && answer.isRight) {
            throw Error("right answer already exists: " + answer.title);
        } else {
            this._answers.push(answer);
        }
    }

    addAnswers(answers: (Answer | AnswerApi)[]): void {
        for (const answer of answers) {
            this.addAnswer(answer);
        }
    }

    answer(answers: Answer[]): void {
        this.clearAnswers();

        let status: boolean = true;

        for (const answer of answers) {
            if (status) {
                const isAnswerExitst: boolean = this._answers.map(item => item.title).indexOf(answer.title) > -1;

                if (isAnswerExitst) {
                    answers[answers.indexOf(answer)].selected = true;
                    status = answer.isRight;
                }
            } else {
                break;
            }
        }

        this._status = status;
    }

    clearAnswers(): void {
        this._answers.forEach(item => item.selected = false);
    }
}

export interface QuestionApi {
    title: string;
    answers: AnswerApi[];
    img?: string;
    multiply?: boolean;
}
