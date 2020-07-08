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
    <main class="has-text-centered" id="app" v-if="chat.length<1">
      <div class="field" >
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
     <main class="has-text-centered" id="app" v-if="chat.length>=1">
        <div class="content">
         <blockquote v-for="item in chat" :key="item">{{ item }}</blockquote>
         </div>
         <div class="field">
         <p class="control">
            <input v-model="msg" class="input" type="text" placeholder="Message..." v-on:keyup="sendMessage">
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

main {
  margin: 0 auto;
  text-align: center;
  width: 60%;
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
.content blockquote{
 padding-top:1em;
 padding-bottom:1em;
}

</style>

<script>
import store from './store.js';




export default {
  data: function(){
    return {
     chat: store.state.roomMsg,
     msg: '',
    };
  },
  methods: {
    joinRoom() {
      this.$socket.emit("join", { room: this.$roomId, name: this.$name });
    },
    createRoom() {
      this.$socket.emit("create", { room: this.$roomId, name: this.$name });
    },
    sendMessage(e) {
      if(e.keyCode===13){
      this.$socket.emit("message", { room: this.$roomId, msg: this.msg });
      this.essa = '';
      }
    }
  },
};
</script>
