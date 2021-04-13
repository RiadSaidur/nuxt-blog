<template>
  <v-container>
    <v-toolbar-title class="px-4 pb-4">{{ user }}</v-toolbar-title>
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="red lighten-3"></v-tabs-slider>
      
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>

      <v-tab-item>
        <Profile />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import Profile from '@/components/user/Profile.vue'

interface HEAD {
  title: string;
}

export default Vue.extend({
  name: "user",
  components: {
    Profile
  },
  head(): HEAD {
    return {
      title: `Explore - ${this.user}`
    }
  },
  data() {
    return {
      tab: 0,
      items: [
        'Profile'
      ]
    }
  },
  computed: {
    user(): string {
      return this.$route.params.user
    }
  }
})
</script>