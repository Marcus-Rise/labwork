import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import LocalStorage from "@/utils/LocalStorage";

@Module
export default class Theme extends VuexModule {
  isThemeDark: boolean = LocalStorage.getItem("isThemeDark") === "true";

  get isDark(): boolean {
    return this.isThemeDark;
  }

  @Mutation
  toggleTheme(flag: boolean) {
    LocalStorage.setItem("isThemeDark", flag + "");
    this.isThemeDark = flag;
  }
}
