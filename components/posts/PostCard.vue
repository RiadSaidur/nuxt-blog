<template>
  <v-col class="pa-0">
    <v-img
      :src="post.TitleImage || defaultImage"
      height="200px"
    />

    <v-card-title>
      <nuxt-link :to="`/${post.author}/${post.postID}`" v-text="post.Title" />
    </v-card-title>

    <v-card-subtitle>
      written by: <nuxt-link :to="`/${post.author}`" v-text="post.author" />
    </v-card-subtitle>

    <v-card-text v-html="post.Body" />
  </v-col>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      defaultImage: "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  }
}
</script>