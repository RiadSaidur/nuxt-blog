<template>
  <v-container v-if="posts">
    <Posts :posts="posts" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import Posts from "@/components/posts/Posts.vue"

export default Vue.extend({
  components: {
    Posts
  },
  head() {
    return {
      title: `Explore`
    }
  },
  computed:{
    posts() {
      return this.$store.state.posts.posts
    }
  },
  mounted() {
    this.$store.dispatch('posts/getPosts')
  }
})
</script>
