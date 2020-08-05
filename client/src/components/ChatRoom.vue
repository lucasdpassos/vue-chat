<template>
  <div class="chat-window">
    <div class="messages">
        <div class="message" v-for="message in messages" v-bind:key="message.index">
            <div class="username">{{message.username}}</div>
            <div class="message-text">{{message.msg}}</div>
        </div>
    </div>
    <form class="input-container" v-on:sumbit="sendMessage">
        <input type="text" v-model="msg">
        <button v-on:click="sendMessage" v-bind:disabled="!msg">Enviar</button>
    </form>  
  </div>
</template>

<script>
export default {
    name: 'chatroom',
    props: ['messages'],
    data: function () {
        return {
            msg: ""
        }
    },
    methods: {
        sendMessage: function () {
            if (!this.message) {
                alert('Por favor digite uma mensagem');
            }
        }
    }
}
</script>

<style>

</style>>