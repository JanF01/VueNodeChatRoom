<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Chatroom
          </h1>
          <h2 class="subtitle">
            Chat with your friends
          </h2>
        </div>
      </div>
    </section>
    <main class="has-text-centered" id="app" v-if="chat.length < 1">
      <div class="field">
        <div class="control">
          <input
            v-model="$roomId"
            class="input is-primary"
            type="text"
            placeholder="Room code"
            required
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            v-model="$name"
            class="input is-primary"
            type="text"
            placeholder="User name"
            required
          />
        </div>
      </div>
      <div class="field">
        <div class="field">
          <button class="button is-success" @click="joinRoom">Join room</button>
        </div>
        <div class="field">
          <button class="button is-info create" @click="createRoom">
            Create room
          </button>
        </div>
      </div>
    </main>
    <main class="has-text-centered" id="app" v-if="chat.length >= 1" ref="chat">
      <div class="field scrol">
        <aside>
          <button class="button is-danger" @click="leaveRoom">
            Disconnect
          </button>
          <span class="roomId">{{ this.$roomId }}</span>
        </aside>

        <div class="content" v-for="(item, index) in chat" :key="index">
          <blockquote v-if="item.initiator == 'Server'">
            {{ item.content }}
          </blockquote>

          <span class="msg" v-if="item.initiator == 'Chat'">
            {{ item.content }}
          </span>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <input
            v-model="msg"
            class="input"
            type="text"
            placeholder="Message..."
            v-on:keyup="sendMessage"
          />
        </p>
      </div>
    </main>
  </div>
</template>

<style>
@import "https://jenil.github.io/bulmaswatch/lux/bulmaswatch.min.css";

body {
  margin: 0 auto;
}

p.msg {
  width: 100%;
  text-align: left;
  padding-left: 2.5%;
}

main {
  margin: 0 auto;
  text-align: center;
  width: 60%;
  min-height: 67vh;
  max-height: 67vh;
}
aside {
  position: absolute;
  display: flex;
  align-items: flex-start;
  text-align: left;
}
aside > span {
  display: block;
  font-size: 1.5em;
  width: 40em;
}

@media (max-width: 4000px) {
  aside {
    top: 16.5%;
    left: auto;
  }
  aside {
    flex-direction: row;
  }
  aside > span {
    font-size: 1.2em;
    bottom: 0em;
    margin-left: 3%;
  }
  aside > button {
    font-size: 0.85em !important;
  }
  main {
    margin-top: 3%;
  }
}

.content {
  text-align: left;
}
.content > span {
  display: block;
  padding-left: 2%;
  word-wrap: break-word;
}
.content blockquote {
  text-align: center;
  border-left-color: #33aacc;
  word-wrap: break-word;
}

.scrol {
  max-height: 73vh;
  padding-bottom: 1%;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y mandatory;
  word-wrap: break-word;
}

.scrol > .field > .control > p:last-child {
}

.scrol::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.scrol::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.scrol::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}

input {
  width: 30%;
}

.button {
  float: left;
}

.create {
  margin-left: 2.5%;
}
.content blockquote {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>

<script>
import store from "./store.js";
import { eventBus } from "./main.js";

export default {
  data: function() {
    return {
      chat: store.state.roomMsg,
      msg: "",
    };
  },
  created() {
    eventBus.$on("alignBottom", () => {
      this.align();
    });
  },
  methods: {
    joinRoom() {
      this.$socket.emit("join", { room: this.$roomId, name: this.$name });
      this.chat = store.state.roomMsg;
    },
    createRoom() {
      this.$socket.emit("create", { room: this.$roomId, name: this.$name });
      this.chat = store.state.roomMsg;
    },
    leaveRoom() {
      this.$socket.emit("leave", { room: this.$roomId, name: this.$name });
      store.state.roomMsg = [];
      this.chat = [];
    },
    sendMessage(e) {
      if (e.keyCode === 13) {
        this.$socket.emit("message", { room: this.$roomId, msg: this.msg });
        this.msg = "";
        this.align();
      }
    },
    align() {
      setTimeout(() => {
        let scroll = document.getElementsByClassName("scrol");
        scroll[0].scrollTop = scroll[0].scrollHeight;
      }, 100);
    },
  },
};
</script>
