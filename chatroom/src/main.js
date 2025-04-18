import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Toasted);

Vue.prototype.$roomId = "";
Vue.prototype.$name = "";
Vue.prototype.$isConnected = false;
Vue.prototype.$roomMsg = [];

export const eventBus = new Vue();





Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://localhost:3000"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  })
);

Vue.toasted.register(
  "wrongData",
  (payload) => {
    if (payload.message) {
      return "Niedozwolone dane";
    }
  }, {
    type: "warning",
  }
);
Vue.toasted.register(
  "nameUsed",
  (payload) => {
    if (payload.message) {
      return "   Nazwa pokoju zajęta   ";
    }
  }, {
    type: "warning",
  }
);
Vue.toasted.register(
  "leftRoom",
  (payload) => {
    if (payload.message) {
      store.state.con = false;
      return "   Opuszczono pokój   ";
    }
  }, {
    type: "success",
  }
);
Vue.toasted.register(
  "chatContent",
  (payload) => {
    if (payload.message) {
      store.state.roomMsg.push(payload.message[payload.message.length - 1]);
      eventBus.$emit("alignBottom");
      return "   Wiadomość   ";
    }
  }, {
    type: "info",
  }
);
Vue.toasted.register(
  "serverContent",
  (payload) => {
    if (payload.message) {
      store.state.roomMsg.push(payload.message[payload.message.length - 1]);
      store.state.con = true;
      return "Połączenie powiodło się";
    }
  }, {
    type: "success",
  }
);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
