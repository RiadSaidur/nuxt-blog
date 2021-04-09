<template>
  <div class="text-center">
    <v-dialog
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
            v-if="photoURL"
            size="36"
          >
            <img
              :src="photoURL"
              alt="account"
            >
          </v-avatar>
          <v-icon v-else>mdi-account-circle-outline</v-icon>
        </v-btn>
      </template>

      <User />
      
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import User from '@/components/user/User.vue'

export default Vue.extend({
  components: {
    User
  },
  computed : {
    // returns photoURL if there is user in state
    photoURL() {
      return this.$store.state.user ? this.$store.state.user.photoURL : null
    }

  }
})
</script>