<template>
  <v-container fluid class="px-0">
    <v-row dense>
      <v-col
        v-for="(post, idx) in posts"
        :key="idx"
        xs="12"
        sm="6"
        md="4"
        xl="3"
      >
        <PostCard :post="post" />
      </v-col>
    </v-row>
  </v-container>
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