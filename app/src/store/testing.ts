import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module
export default class Testing extends VuexModule {
  get examPassed(): boolean {
    return this._examPassed;
  }

  private _examPassed: boolean = false;

  @Mutation
  passExam(flag: boolean = true) {
    this._examPassed = flag;
  }
}
