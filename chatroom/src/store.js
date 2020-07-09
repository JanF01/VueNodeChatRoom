import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roomMsg: [],
    con: false,
  },
  actions: {
    SOCKET_content(state, server) {
      Vue.toasted.global
        .serverContent({
          message: server,
        })
        .goAway(1800);
    },
    SOCKET_chat(state, server) {
      Vue.toasted.global
        .chatContent({
          message: server,
        })
        .goAway(1800);
    },
    SOCKET_left(state, server) {
      Vue.toasted.global
        .leftRoom({
          message: server,
        })
        .goAway(1800);
    },
    SOCKET_nameUsed(state, server) {
      Vue.toasted.global
        .nameUsed({
          message: server,
        })
        .goAway(1800);
    },
    SOCKET_wrongData(state, server) {
      Vue.toasted.global
        .wrongData({
          message: server,
        })
        .goAway(1800);
    },
  },
});
