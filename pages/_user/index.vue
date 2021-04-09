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
      <v-tab-item>
        <Posts :posts="posts" class="mt-5"/>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import { getPostByUser } from '@/handlers/public/posts'

import Profile from '@/components/user/Profile.vue'
import Posts from '@/components/posts/Posts.vue'

interface HEAD {
  title: string;
}

export default Vue.extend({
  name: "user",
  components: {
    Profile,
    Posts
  },
  head(): HEAD {
    return {
      title: `Explore - ${this.user}`
    }
  },
  data() {
    return {
      tab: null,
      items: [
        'Profile', 'Experiences'
      ],
      posts: <POST[] | boolean> false
    }
  },
  computed: {
    user(): string {
      return this.$route.params.user
    }
  },
  async fetch() {
    this.posts = await getPostByUser(this.user)
  }
})
</script>