<template>
  <v-list-item three-line>
    <v-list-item-avatar>
      <v-img :src="authorDisplayPhoto" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <NuxtLink v-text="comment.author" :to="`/${comment.author}`" />

        <v-list-item-action class="pa-0 ma-0">
          <Delete v-if="currentUser == comment.author" :deleteItem="() => deleteComment(comment)" />
        </v-list-item-action>

        <v-list-item-subtitle v-text="comment.createdAt" />
      </v-list-item-title>

      <v-list-item-subtitle v-text="comment.body" />

    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { getUserByUsername } from '@/helpers/user'
import Delete from "@/components/base/Delete"

export default {
  props: [ 'comment', 'deleteComment' ],
  components: {
    Delete
  },
  data() {
    return {
      authorDisplayPhoto: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user?.username
    }
  },
  mounted() {
    this.getAuthorDisplayPhoto()
  },
  watch: {
    comment: function () {
      this.getAuthorDisplayPhoto()
    }
  },
  methods: {
    async getAuthorDisplayPhoto() {
      const author = await getUserByUsername(this.comment.author)
      return this.authorDisplayPhoto = author.photoURL
    }
  }
}
</script>