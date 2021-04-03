<template>
  <v-row justify="center">
    <v-card v-for="(post, idx) in posts" :key="idx" max-width="400px" height="460px" class="ma-2 overflow-hidden" elevation="1">
      <PostCard :post="post" />
    </v-card>
  </v-row>
</template>

<script>
import PostCard from "@/components/posts/PostCard"

export default {
  name: "Posts",
  props: ["posts"],
  components: {
    PostCard
  }
}
</script>