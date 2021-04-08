<template>
  <v-card v-if="userProfile" class="d-flex align-start justify py-4" max-height='400px' elevation="0">
    <div>
      <profile-update-button v-if="admin" :username="userProfile.username" />
      <v-card-text>Posts by: <router-link :to="`/${userProfile.username}`" v-text="userProfile.username" /></v-card-text>
      <v-card-title v-text="userProfile.displayName" />
    </div>
    <v-spacer />
    <v-img :src="userProfile.photoURL" alt="user photo" contain max-height='300px' />
  </v-card>
</template>

<script>
import { getUserByUsername } from '@/helpers/user'
import ProfileUpdateButton from '@/components/user/ProfileUpdateChip'

export default {
  name: 'user-profile',
  components: {
    ProfileUpdateButton
  },
  data() {
    return {
      userProfile: null,
      admin: false
    }
  },
  computed: {
    username() {
      return this.$nuxt._route.params.user
    },
    currentUser() {
      return this.$store.state.user?.username
    }
  },
  created() {
    if(this.username === this.currentUser) this.admin = true
  },
  async fetch() {
    this.userProfile = await getUserByUsername(this.username)
  }
}
</script>