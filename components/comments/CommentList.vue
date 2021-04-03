<template>
  <v-container>
    <v-list>
      <v-list-item three-line v-for="(comment, idx) in commentList" :key="idx">
        <v-list-item-avatar>
          <v-img :src="defaultImage" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <NuxtLink v-text="comment.author" :to="`/${comment.author}`" />
            <v-list-item-action class="pa-0 ma-0">
            <!-- <v-btn text class="pa-0 ma-0">
              <v-icon>
                mdi-delete-outline
              </v-icon>
            </v-btn> -->
            <Delete v-if="currentUser == comment.author" :deleteItem="() => deleteComment(comment)" />
          </v-list-item-action>
            <v-list-item-subtitle v-text="comment.createdAt" />
          </v-list-item-title>
          <v-list-item-subtitle v-text="comment.body" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import Delete from "@/components/base/Delete"
export default {
  name: "comment-list",
  props: [ "comments", "deleteComment" ],
  components: {
    Delete
  },
  computed: {
    commentList() {
      return this.comments.sort((a, b) => b.createdAt.localeCompare(a.last_nom))
    },
    currentUser() {
      return this.$store.state.user?.email
    }
  },
  data() {
    return {
      defaultImage: "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  }
}
</script>