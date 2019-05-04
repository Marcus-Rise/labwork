import Vue from 'vue'
import Vuex from 'vuex'
import Theme from "@/store/theme";
import Testing from "@/store/testing";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Theme,
    Testing
  }
})
