import Vue from 'vue'
import Vuex from 'vuex'
import Theme from "@/store/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Theme
  }
})
