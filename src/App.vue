<template>
  <v-app>

    <v-app-bar app>
      <navbar></navbar>
    </v-app-bar>

    <v-main>
      <div class="container-fluid">
        <v-row>
          <router-view></router-view>
        </v-row>
      </div>
    </v-main>

  </v-app>
</template>

<script>
import Navbar from './components/MainDashboard/Navbar'

export default {
  name: 'App',
  components: {
    'navbar': Navbar
  }
}
</script>
