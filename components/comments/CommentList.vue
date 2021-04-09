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

<script lang="ts">
import Vue from 'vue'

import CommentListItem from '@/components/comments/CommentListItem.vue'
import { COMMENT } from '@/interface/types/comment'

export default Vue.extend({
  name: "comment-list",
  props: [ "comments", "deleteComment" ],
  components: {
    CommentListItem
  },
  computed: {
    commentList() {
      return this.comments.sort((a: COMMENT, b: COMMENT) => b.createdAt.localeCompare(a.createdAt))
    }
  }
})
</script>