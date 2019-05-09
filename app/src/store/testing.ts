import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import {app} from "@/services/AppService";

@Module
export default class Testing extends VuexModule {
  get examPassed(): boolean {
    return this._examPassed;
  }

  private _examPassed: boolean = app.isDevMode;

  @Mutation
  passExam(flag: boolean = true) {
    this._examPassed = flag;
  }
}
