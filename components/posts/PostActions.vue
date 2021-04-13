<template>
  <v-card-actions>
    <v-spacer></v-spacer>

    <v-btn icon v-if="isAuth" @click="handleLike">
      <v-icon :color="isLiked">mdi-heart</v-icon>
    </v-btn>
    {{ likes.length }}

    <v-btn icon @click="sharePost">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: [
    'likes', 'shareInfo'
  ],
  computed: {
    isAuth(): string {
      return this.$store.state.user?.username
    },
    currentUserEmail(): string {
      return this.$store.state.user?.email
    },
    isLiked(): string {
      return this.likes?.includes(this.currentUserEmail) ? 'red' : ''
    },
  },
  methods: {
    sharePost() {
      if(!navigator.share) return
      
      try {
        const shareItem = {
          title: this.shareInfo.Title,
          url: `${window.location.origin}/${this.shareInfo.author}/${this.shareInfo.postID}`
        }
        navigator.share(shareItem)
      } catch (err) {
        console.log(err)
      }
    },
    async handleLike() {
      let success = false
      if(this.isLiked) {
        success = await this.$store.dispatch('posts/unlikePost', this.shareInfo.postID)
      } else {
        success = await this.$store.dispatch('posts/likePost', this.shareInfo.postID)
      }
      this.$emit('isLiked', success)
    }
  }
})
</script>