<template>
  <div>
    <div class="message" v-for="(message,index) in messages" v-bind:key="index" :class="{own: message.user == email}">
      <div class="username" v-if="index>0 && messages[index-1].user != message.user">{{message.user}}</div>
      <div class="username" v-if="index == 0">{{message.user}}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
        <chat-image v-if="message.image" :imgsrc="message.image" @imageLoad="imageLoad"></chat-image>
      </div>
    </div>

  </div>
</template>

<script>
  import Image from './Image.vue'
  import jwtDecode from 'jwt-decode'

  export default {
    data () {
      const token = localStorage.usertoken
      const decoded = jwtDecode(token)
      return {
        email: decoded.email
      }
    },
    props: [
      'messages'
    ],
    components: {
      'chat-image': Image
    },
    computed: {

    },
    methods: {
      imageLoad () {
        // this.$emit('imageLoad')
      }
    }
  }
</script>

<style>

</style>
