<template>
  <v-container v-if="posts">
    <Profile />
    <Posts :posts="posts" class="mt-5" />
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