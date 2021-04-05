<template>
  <v-container>
    <!-- <Profile /> -->
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

<script>
import { getPostByUser } from '@/handlers/public/posts'

import Profile from '@/components/user/Profile'
import Posts from '@/components/posts/Posts'

export default {
  name: "user",
  components: {
    Profile,
    Posts
  },
  head() {
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
      posts: ''
    }
  },
  computed: {
    user() {
      return this.$nuxt._route.params.user
    }
  },
  async fetch() {
    this.posts = await getPostByUser(this.user)
  }
}
</script>