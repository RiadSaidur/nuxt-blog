<template>
  <v-container class="px-0">
    <v-list>
        <CommentListItem
          v-for="(comment, idx) in commentList"
          :key="idx"
          :comment="comment"
          :deleteComment="deleteComment"
        />
    </v-list>
  </v-container>
</template>

<script>
import CommentListItem from '@/components/comments/CommentListItem'

export default {
  name: "comment-list",
  props: [ "comments", "deleteComment" ],
  components: {
    CommentListItem
  },
  computed: {
    commentList() {
      return this.comments.sort((a, b) => b.createdAt.localeCompare(a.last_nom))
    }
  }
}
</script>