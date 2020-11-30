<template>
  <div class="container-fluid">
    <h1 style="background-color:blue">{{$route.params.chat_id}}</h1>
    <v-row no-gutters>
      <v-col sm="2">
      </v-col>
      <!-- Messages -->
      <v-col sm="10" style="position: relative;">
        <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer" >
          <message :messages="messages" @imageLoad="scrollToEnd"></message>
        </div>
        <div class="typer">
          <input type="text" placeholder="Type here..." v-on:keyup.enter="sendMessage" v-model="content">
        </div>
      </v-col>
      <!-- Messages -->
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
  import Message from './parts/Message.vue'
  import Chats from './parts/Chats.vue'
  // import * as firebase from 'firebase'

  var date = new Date();

  // add a day
  date.setDate(date.getDate() + 1);

  export default {
    data () {
      return {
        content: '',
        chatMessages: [
          {
            index: "123",
            user: "customer",
            content:"hello",
            date: date.setDate(date.getDate())
          },
          {
            index: "123",
            user: "customer",
            content:"back",
            date: date.setDate(date.getDate() + 1)
          },
          {
            index: "1234",
            user: "cuong@cuong",
            content:"back  https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png",
            date: date.setDate(date.getDate() + 2)
          }
        ],
        currentRef: {},
        loading: false,
        totalChatHeight: 0
      }
    },
    props: [
      'id'
    ],
    mounted () {
      this.loadChat()
      this.$store.dispatch('loadOnlineUsers')
    },
    components: {
      'message': Message,
      'chats': Chats
    },
    computed: {
      messages () {
        return this.chatMessages
      },
      // onNewMessageAdded () {
      //   const that = this
      //   let onNewMessageAdded = function (snapshot, newMessage = true) {
      //     let message = snapshot.val()
      //     message.key = snapshot.key
      //     /*eslint-disable */
      //     var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
      //     message.content = message.content
      //       .replace(/&/g, '&amp;')
      //       .replace(/</g, '&lt;')
      //       .replace(/>/g, '&gt;')
      //       .replace(/"/g, '&quot;')
      //       .replace(/'/g, '&#039;')
      //     message.content = message.content.replace(urlPattern, "<a href='$1'>$1</a>")
      //     if (!newMessage) {
      //       that.chatMessages.unshift(that.processMessage(message))
      //       that.scrollTo()
      //     } else {
      //       that.chatMessages.push(that.processMessage(message))
      //       that.scrollToEnd()
      //     }
      //   }
      //   return onNewMessageAdded
      // }
    },
    watch: {
      '$route.params.id' (newId, oldId) {
        this.currentRef.off('child_added', this.onNewMessageAdded)
        this.loadChat()
      }
    },
    methods: {
      // loadChat () {
      //   this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      //   this.loading = false
      //   if (this.id !== undefined) {
      //     this.chatMessages = []
      //     let chatID = this.id
      //     this.currentRef = firebase.database().ref('messages').child(chatID).child('messages').limitToLast(20)
      //     this.currentRef.on('child_added', this.onNewMessageAdded)
      //   }
      // },
      // onScroll () {
      //   let scrollValue = this.$refs.chatContainer.scrollTop
      //   const that = this
      //   if (scrollValue < 100 && !this.loading) {
      //     this.totalChatHeight = this.$refs.chatContainer.scrollHeight
      //     this.loading = true
      //     let chatID = this.id
      //     let currentTopMessage = this.chatMessages[0]
      //     if (currentTopMessage === undefined) {
      //       this.loading = false
      //       return
      //     }
      //     firebase.database().ref('messages').child(chatID).child('messages').orderByKey().endAt(currentTopMessage.key).limitToLast(20).once('value').then(
      //       function (snapshot) {
      //         let tempArray = []
      //         snapshot.forEach(function (item) {
      //           tempArray.push(item)
      //         })
      //         if (tempArray[0].key === tempArray[1].key) return
      //         tempArray.reverse()
      //         tempArray.forEach(function (child) { that.onNewMessageAdded(child, false) })
      //         that.loading = false
      //       }
      //     )
      //   }
      // },
      // processMessage (message) {
      //   /*eslint-disable */
      //   var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
      //   if (imageRegex.test(message.content)) {
      //     message.image = imageRegex.exec(message.content)[0]
      //   }
      //   var emojiRegex = /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{2934}-\u{1f18e}])/gu
      //   if (emojiRegex.test(message.content)) {
      //     message.content = message.content.replace(emojiRegex, '<span class="emoji">$1</span>')
      //   }
      //   return message
      // },
      sendMessage () {
        if (this.content !== '') {
          // send message to store
          this.$store.dispatch('sendMessage', {
            username: this.username,
            content: this.content,
            date: new Date().toString(),
            chatID: this.id
          })
          this.content = ''
        }
      },
      scrollToEnd () {
        this.$nextTick(() => {
          var container = this.$el.querySelector('.chat-container')
          container.scrollTop = container.scrollHeight
        })
      },
      scrollTo () {
        this.$nextTick(() => {
          let currentHeight = this.$refs.chatContainer.scrollHeight
          let difference = currentHeight - this.totalChatHeight
          var container = this.$el.querySelector('.chat-container')
          container.scrollTop = difference
        })
      }
    }
  }
</script>

<style>
  .scrollable {
    overflow-y: auto;
    height: 90vh;
  }
  .typer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    bottom: 0;
    height: 4.9rem;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
  }
  .typer input[type=text]{
    position: absolute;
    left: 2.5rem;
    padding: 1rem;
    width: 80%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.25rem;
  }
  .chat-container{
    box-sizing: border-box;
    height: calc(100vh - 9.5rem);
    overflow-y: auto;
    padding: 10px;
    background-color: #f2f2f2;
  }
  .message{
    margin-bottom: 3px;
  }
  .message.own{
    text-align: right;
  }
  .message.own .content{
    background-color: lightskyblue;
  }
  .chat-container .username{
    font-size: 18px;
    font-weight: bold;
  }
  .chat-container .content{
    padding: 8px;
    background-color: lightgreen;
    border-radius: 10px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 50%;
    word-wrap: break-word;
    }
  @media (max-width: 480px) {
    .chat-container .content{
      max-width: 60%;
    }
  }

</style>

