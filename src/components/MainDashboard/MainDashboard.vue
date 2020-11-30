<template>
  <v-container fluid>
    <h1>hello {{user_id}}</h1>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">

        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Add New App
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add New App</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Your App Name" v-model="app_name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Facebook Page Token" v-model="facebook_page_token"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Zalo Webhook" v-model="zalo_access_token"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Viber Access Token" v-model="viber_access_token"></v-text-field>
                </v-col>
              </v-row>
            </v-container>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewApp()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-item-group mandatory>
      <v-container>
        <v-row>
          <v-col
            v-for="n in appList.length"
            :key="n"
            cols="12"
            md="3"
            @click="openChat(appList[n-1].app_id)"
          >
            <v-item>
              <v-card class="" dark height="200" style="padding: 5px 20px 5px 20px">
                <h4 style="word-wrap: break-word;width: inherit;">{{appList[n-1].app_name}}</h4>
                <p style="word-wrap: break-word;width: inherit;">{{appList[n-1].created_date}}</p>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

  </v-container>
</template>

<script>
import jwtDecode from 'jwt-decode'
/* eslint-disable */
  const token = localStorage.usertoken
  const decoded = jwtDecode(token)
  export default {
    data: () => ({
        account_name: decoded.account_name,
        email: decoded.email,
        user_id: decoded.user_id,
        dialog: false,
        app_name: "",
        webhook_url: "",
        viber_access_token: "",
        facebook_page_token: "",
        zalo_access_token: "",
        appList : this.getAllApps
    }),
    methods: {
      addNewApp () {
        // console.log("before: " + this.appList.length);
        this.$store.dispatch('addNewApp', {
            app_name: this.app_name,
            webhook_url: this.webhook_url,
            facebook_page_token: this.facebook_page_token,
            zalo_access_token: this.zalo_access_token,
            viber_access_token: this.viber_access_token,
            user_id: decoded.user_id
        }).then(response => {
          // this.getAllApps()
          this.appList = this.getAllApps
          // console.log("after: " + this.appList.length);
          this.dialog = false
        })
      },
      getAllApp () {
        // console.log("test")
        this.$store.dispatch('getAllApps', {
          user_id: this.user_id
        }).then(response => {
          this.appList = response
        })
      },
      openChat(app_id){
        this.$router.push({path: '/chat/' + app_id})
      }


    },
    computed: {
      appList(){
        return this.$store.state.appList
      }
    },
    beforeMount(){
      this.getAllApp()
    }
  }
</script>

<style modules>
  .add-app {
    height: 100px;
    background-color: aqua;
  }
</style>
