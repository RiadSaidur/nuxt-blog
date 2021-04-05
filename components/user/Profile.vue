<template>
  <v-card v-if="userProfile" class="d-flex align-start justify py-4" max-height='400px' elevation="0">
    <div>
      <v-chip
        class="ml-4"
        color="deep-purple accent-1"
        outlined
        :to="`/${userProfile.email}/update`"
        v-if="admin"
      >
        <v-icon left>
          mdi-wrench
        </v-icon>
        Update Profile
      </v-chip>
      <v-card-text>Posts by: <router-link :to="`/${userProfile.email}`" v-text="userProfile.email" /></v-card-text>
      <v-card-title v-text="userProfile.displayName" />
    </div>
    <v-spacer />
    <v-img :src="userProfile.photoURL" alt="user photo" contain max-height='300px' />
  </v-card>
</template>

<script>
import { getUserByEmail } from '@/helpers/user'
import { currentUser } from '@/firebase/firebase'
export default {
  name: 'user-profile',
  data() {
    return {
      userProfile: null,
      admin: false
    }
  },
  computed: {
    userEmail() {
      return this.$nuxt._route.params.user
    },  
  },
  created() {
    if(this.userEmail === currentUser()) this.admin = true
  },
  async fetch() {
    this.userProfile = await getUserByEmail(this.userEmail)
  }
}
</script>