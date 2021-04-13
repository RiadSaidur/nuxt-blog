<template>
  <v-card
    :loading="isLoading"
    elevation="24"
  >
    <div v-if="user.username">
      <div class="d-flex justify-center py-3">
        <v-avatar
          v-if="user.photoURL"
          size="250"
        >
          <img
            :src="user.photoURL"
            alt="account"
          >
        </v-avatar>
      </div>
      <nuxt-link :to="`/${user.username}`">
        <v-card-title class="headline justify-center" v-text="user.username" />
      </nuxt-link>
      <v-card-subtitle class="text-center" v-text="user.displayName" />
      <v-card-subtitle class="text-center" v-text="user.email" />
    </div>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="signin" v-if="!user.username">
        <v-icon class="mr-2">mdi-google</v-icon>
        Login with Google
      </v-btn>
      <v-btn @click="signout" v-else>
        <v-icon class="mr-2">mdi-logout</v-icon>
        Signout
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    isLoading: false
  }),
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async signin() {
      if(process.browser) {
        this.isLoading = true
        
        try {
          const provider = new this.$fireModule.auth.GoogleAuthProvider()
          const { credential, user } = await this.$fireModule.auth().signInWithPopup(provider)

          let token = (<any>credential)?.idToken
          
          localStorage.token = token
          // if(user?.displayName) user.displayName = `${ user.displayName.replaceAll(/\s/g,'').toLowerCase() }-${Math.random() * 1000}`
          
          const userProfle = {
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            uid: user?.uid,
            username: `${ user?.displayName?.replaceAll(/\s/g,'').toLowerCase() }-${Math.floor(Math.random() * 1000)}`
          }
          
          this.$store.dispatch('getUser', userProfle)
        } catch (err) {
          // let errorCode = error.code
          // let errorMessage = error.message
          // let email = error.email
          // let credential = error.credential
          console.log('err:', err)
        }
        
        this.isLoading = false

        // this.$fireModule.auth().signInWithPopup(provider).then(result => {
        //   let token = result.credential.idToken
        //   this.displayName = result.user.displayName
        //   this.email = result.user.email
        //   this.photoURL = result.user.photoURL
        //   localStorage.token = token
        //   this.isLoading = false
        // }).catch(error => {
        //   let errorCode = error.code
        //   let errorMessage = error.message
        //   let email = error.email
        //   let credential = error.credential
        //   console.log('err:', error)
        //   this.isLoading = false
        // })
      }
    },
    
    async signout() {
      if(process.browser) {
        try {
          this.isLoading = true
          this.$fireModule.auth().signOut()
          this.isLoading = false
        } catch (error) {
          console.log(error)
          this.isLoading = false
        }
      }
    }
  }
})
</script>