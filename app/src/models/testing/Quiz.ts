import Question, {QuestionApi} from "./Question";

export default class Quiz {
  get questions(): Question[] {
    return this._questions;
  }

  private set percentToPass(value: number) {
    if (value > 0 && value <= 100) {
      this._percentToPass = value;
    } else throw Error("invalid argument: " + value);
  }

  private readonly _questions: Question[] = [];
  private _percentToPass: number = 100;

  constructor(questions: QuizApi)
  constructor(questions: Question[], percentToPass: number)
  constructor(questions: Question[] | QuizApi, percentToPass?: number) {
    if (questions instanceof Array) {
      this.percentToPass = percentToPass || 100;

      for (const question of questions)
        this.addQuestion(question)
    } else {
      this.percentToPass = questions["процент правильных ответов"];
      for (const question of questions.вопросы)
        this.addQuestion(question)
    }
  }

  addQuestion(question: Question | QuestionApi): void {
    if (!(question instanceof Question)) {
      question = new Question(question);
    }

    this._questions.push(question);
  }

  get status(): boolean {
    const rightsCount: number = this._questions.filter(item => item.status === true).length;
    const percents: number = rightsCount / this._questions.length * 100;

    console.log(`need ${this._percentToPass} have ${percents}`);
    return percents >= this._percentToPass;
  }

  get firstUnAnsweredIndex(): number | null {
    const items: Question[] = this._questions.filter(item => item.status === null);
    return items ? this._questions.indexOf(items[0]) : null;
  }

  get isComplite(): boolean {
    const answered: number = this._questions.filter(item => item.status !== null).length;
    return answered === this._questions.length;
  }

  clear(): void {
    for (const question of this._questions) {
      question.clear();
    }
  }
}

interface QuizApi {
  "процент правильных ответов": number
  "вопросы": QuestionApi[]
}
