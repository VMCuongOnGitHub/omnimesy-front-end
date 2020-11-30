import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import express from 'express'

/* eslint-disable */
Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:5000'

const stores = new Vuex.Store({
  state:{
    token: localStorage.getItem("usertoken"),
    appList: []
  },
  getters:{
    loggedIn(state){
      return state.token !== null
    },
    getAppList(state){
      return state.appList
    }
  },
  mutations:{
    loginAndGetToken(state, token){
      state.token = token
    },
    deleteToken(state){
      state.token = null
    },
    getAllApps(state, payload){
      // console.log(payload)
      for (let index = 0; index < payload.length; index++) {
        // state.appList.app[index].app_name = appList.data[index].app_name
        state.appList.push({app_id: payload[index].app_id, app_name: payload[index].app_name})
        // console.log(state)
      }
      // console.log(state.appList)
      // state.appList = appList
    },
    addNewApp(state, payload){
      state.appList.push({app_id: payload.app_id, app_name: payload.app_name})
    }
  },
  actions:{
    addNewApp(context, data){
      return new Promise((resolve, reject) => {
        axios.post('apps/addApp', {
          app_name: data.app_name,
          webhook_url: data.webhook_url,
          facebook_page_token: data.facebook_page_token,
          zalo_access_token: data.zalo_access_token,
          viber_access_token: data.viber_access_token,
          created_date: data.created_date,
          user_id: data.user_id
        }).then(response => {
          let payload = []
          payload.push({app_id: response.data.app_id, app_name: response.data.app_name, created_date: response.data.created_date})
          context.commit('addNewApp', payload)
          resolve(payload)
        }).catch(error => {
          reject(error)
        })
      })
    },
    register(context, data){
      return new Promise((resolve, reject) => {
        axios.post('users/register', {
          account_name: data.account_name,
          email: data.email,
          password: data.password
        }).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    loginAndGetToken(context, credential){
      return new Promise((resolve, reject) => {
        axios.post('users/login', {
          email: credential.email,
          password: credential.password
        }).then(response => {
          console.log("token");
          const token = response.data
          console.log(token);
          localStorage.setItem('usertoken', token)
          context.commit('loginAndGetToken', token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deleteToken(context){
      return new Promise((resolve, reject) => {
        localStorage.removeItem('usertoken')
        context.commit('deleteToken')
        resolve(response)
      }).catch(error => {
        localStorage.removeItem('usertoken')
        context.commit('deleteToken')
        reject(error)
      })
    },

    getAllApps(context, data){
      return new Promise((resolve, reject) => {
        axios.post('apps/getAllApps', {
          user_id: data.user_id
        }).then(response => {
          let payload = []
          for (let index = 0; index < response.data.length; index++) {
            payload.push({app_id: response.data[index].app_id, app_name: response.data[index].app_name, created_date: response.data[index].created_date})
          }
          context.commit('getAllApps', payload)
          resolve(payload)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
})


export default stores

