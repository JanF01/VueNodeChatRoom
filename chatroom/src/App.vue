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
    <main class="has-text-centered" id="app">
      <div class="field">
        <div class="control">
          <input
            v-model="roomId"
            class="input is-primary"
            type="text"
            placeholder="Room code"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            v-model="name"
            class="input is-primary"
            type="text"
            placeholder="User name"
          />
        </div>
      </div>
      <div class="field">
        <div class="field">
          <button class="button is-success" type="submit">Join room</button>
        </div>
        <div class="field">
          <button class="button is-info create" type="submit">
            Create room
          </button>
        </div>
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
</style>
