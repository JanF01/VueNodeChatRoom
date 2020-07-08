import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roomMsg: [],
    con: false
  },
  actions: {
    "SOCKET_content"(state, server) {
      Vue.toasted.global
        .chatContent({
          message: server,
        })
        .goAway(1000);
    },
  },
});
