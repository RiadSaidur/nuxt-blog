<template>
  <v-card v-if="userProfile" class="d-flex align-start justify py-4" max-height='400px' elevation="0" outlined>
    <div>
      <v-card-text>Posts by: <router-link :to="`/${userProfile.email}`" v-text="userProfile.email" /></v-card-text>
      <v-card-title v-text="userProfile.displayName" />
    </div>
    <v-spacer />
    <v-img :src="userProfile.photoURL" alt="user photo" contain max-height='300px' />
  </v-card>
</template>

<script>
import { getUserByEmail } from '@/helpers/user'
export default {
  name: 'user-profile',
  data() {
    return {
      userProfile: null
    }
  },
  computed: {
    userEmail() {
      return this.$nuxt._route.params.user
    }
  },
  async fetch() {
    this.userProfile = await getUserByEmail(this.userEmail)
  }
}
</script>