<template>
  <v-chip
    class="ml-4"
    color="deep-purple accent-1"
    outlined
    :to="`/${username}/update`"
  >
    <v-icon left>
      mdi-wrench
    </v-icon>
    Update Profile
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "profile-update-button",
  props: [ 'username' ]
})
</script>