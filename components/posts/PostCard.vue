<template>
  <v-card>
    <nuxt-link :to="`/${post.author}/${post.postID}`">
      <v-img
        :src="post.TitleImage || defaultImage"
        class="white--text align-end"
        gradient="to left, rgba(0,0,0,.1), rgba(0,0,0,.6)"
        height="200px"
      >
        <v-card-title v-text="post.Title" />

        <v-card-subtitle >
          written by: <nuxt-link :to="`/${post.author}`" v-text="post.author" class="author-link"/>
        </v-card-subtitle>

        <v-card-text v-html="post.Body.split(/\<*>/g)[1].split(/<\//g)[0]" />
      </v-img>
    </nuxt-link>

    <post-actions
      :likes="post.likes"
      :shareInfo="shareInfo"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import PostActions from './PostActions.vue'

interface SHARE {
  Title: string;
  author: string;
  postID: string;
}

export default Vue.extend({
  components: { PostActions },
  name: "Post",
  props: ["post"],
  computed: {
    shareInfo(): SHARE {
      const info = {
        Title: this.post.Title,
        author: this.post.author,
        postID: this.post.postID
      }
      return info
    }
  },
  data() {
    return {
      defaultImage: "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  }
})
</script>

<style scoped>
  .author-link {
    color: rgba(255, 255, 255, 0.7);
  }
  .author-link:hover {
    color: rgba(255, 255, 255, 1);
  }
</style>