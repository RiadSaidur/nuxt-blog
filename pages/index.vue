<template>
  <v-container v-if="posts">
    <Posts :posts="posts" />
  </v-container>
</template>

<script>
import Posts from "@/components/posts/Posts"

export default {
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
      return this.$store.state.posts
    }
  },
  mounted() {
    this.$store.dispatch('getPosts')
  }
}
</script>
