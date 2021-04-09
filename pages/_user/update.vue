<template>
  <v-container>
    <v-container class="d-flex justify-center">
      <v-avatar size="250px">
        <v-img :src="profile.photoURL" />
      </v-avatar>
    </v-container>
    <ProfileEditor :profile="profile" :updateProfile="updateProfile"/>
    <v-snackbar
      v-model="snackbar"
      multi-line
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import { updateUserProfile } from '@/handlers/protected/user'
import ProfileEditor from '@/components/user/ProfileEditor.vue'

export default Vue.extend({
  components: { ProfileEditor },
  middleware: ['authenticated'],
  data() {
    return {
      snackbar: false,
      text: ''
    }
  },
  head() {
    return {
      title: 'Update Profile'
    }
  },
  computed: {
    profile() {
      return {
        displayName: this.$store.state.user?.displayName,
        photoURL: this.$store.state.user?.photoURL,
        email: this.$store.state.user?.email,
        username: this.$store.state.user?.username
      }
    },
    targetUser() {
      return this.$route.params.user
    }
  },
  created() {
    if(this.targetUser != this.profile.username) this.$nuxt.$options.router.push("/")
  },
  methods: {
    async updateProfile() {
      this.profile.username = this.replaceWhiteSpaceAndToLowerCase(this.profile.username)
      const success = await updateUserProfile(this.profile)
      if(success) {
        this.snackbar = true
        this.text = "Successfully updated profile"
        this.$store.dispatch('updateCurrentUser', this.profile)
      } else {
        this.snackbar = true
        this.text = "Updating profile failed"
      }
    },
    replaceWhiteSpaceAndToLowerCase(text: string) {
      return text.replaceAll(/\s/g,'').toLowerCase()
    }
  }
})
</script>