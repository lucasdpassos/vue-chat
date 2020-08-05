<template>
  <div id="app">
    <div class="header">
      <h1>Chatroom</h1>
      <p class="username">Usuário: {{username}}</p>
      <p class="online">Online: {{users.length}}</p>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {},
  data: function () {
    return {
      username: "",
      socket: io("http://localhost:3000"),
      messages: [],
      users: []
    }
  },
  methods: {
    joinServer: function () {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newUser', this.username);
      });
      this.listen();
    },
    listen: function () {
      this.socket.on('msg', message => {
        this.messages.push(message);
      })
      this.socket.on('userOnline', user => {
        this.users.push(user);
      });
      this.socket.on('usersLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })
    }
  },
  mounted: function () {
    this.username = prompt('Qual o seu nome de usuário?', "Root");

    if(!this.username) {
      this.username = "Root";
    }
      this.joinServer();
  }
}
</script>

<style lang="scss">

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
}
</style>
