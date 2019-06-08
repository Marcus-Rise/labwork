import Answer, {AnswerApi} from "./Answer";

export default class Question {
  get img(): string | null {
    return this._img;
  }

  set img(value: string | null) {
    this._img = value;
  }
  get status(): boolean | null {
    return this._status;
  }

  clear(): void {
    this._status = null;
  }

  get answers(): Answer[] {
    return this._answers;
  }

  get title(): string {
    return this._title;
  }

  private readonly _title: string;
  private readonly _answers: Answer[] = [];
  private _img: string | null;
  private _status: boolean | null = null;

  constructor(obj: QuestionApi)
  constructor(titleOrApiObj: string | QuestionApi, img?: string, answers?: Answer[]) {
    if (typeof titleOrApiObj === "string") {
      this._title = titleOrApiObj;
      this.addAnswers(answers ? answers : []);
      this._img = img || null;
    } else {
      this._title = titleOrApiObj.title;
      this.addAnswers(titleOrApiObj.answers);
      this._img = titleOrApiObj.img || null;
    }
  }

  addAnswer(answer: Answer | AnswerApi): void {
    if (!(answer instanceof Answer)) {
      answer = new Answer(answer);
    }

    const isRightExists: boolean = this._answers.filter(item => item.isRight).length === 1;

    if (isRightExists && answer.isRight) {
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

  answer(answer: Answer): void {
    const isAnswerExitst: boolean = this._answers.map(item => item.title).indexOf(answer.title) > -1;
    console.log("exits", isAnswerExitst);
    console.log("answer", answer);
    if (isAnswerExitst) {
      this._status = answer.isRight;
    }
  }
}

export interface QuestionApi {
  title: string;
  answers: AnswerApi[];
  img?: string;
}
