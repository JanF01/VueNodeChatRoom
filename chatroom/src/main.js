import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000",
  })
);

new Vue({
  sockets: {
    connect() {
      this.isConnected = true;
      console.log("Socket connected");
    },

    disconnect() {
      this.isConnected = false;
      console.log("server disconnected");
    },

    messageChannel(data) {
      this.socketMessage = data;
    },
  },
  data: {
    roomId: "",
    name: "",
    isConnected: false,
  },
  methods: {},
  render: (h) => h(App),
}).$mount("#app");
