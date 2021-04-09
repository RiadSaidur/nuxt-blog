<template>
  <v-container >
    <comment-form :addComment="addComment" :comment="comment" v-if="isAuthenticated"/>
    <comment-list :comments="comments" :deleteComment="deleteComment" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import CommentForm from "@/components/comments/CommentForm.vue"
import CommentList from "@/components/comments/CommentList.vue"

import { newComment, removeComment } from '@/handlers/protected/comments'
import { getCommentsByID } from "@/handlers/public/comments"
import { COMMENT } from '@/interface/types/comment'

export default Vue.extend({
  name: "Comments",
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      commentRules: [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 2) || 'Min 2 characters',
      ],
      comments: [],
      loading: false,
      comment: {
        body: '',
        childs: 0,
        createdAt: ''
      }
    }
  },
  computed: {
    postID() {
      return this.$route.params.postID
    },
    isAuthenticated() {
      return this.$store.state.user
    }
  },
  async fetch() {
    this.comments = await getCommentsByID(this.postID)
  },
  methods: {
    async addComment() {
      this.loading = true
      this.comment.childs = 0

      try {
        this.comment.createdAt = new Date().toLocaleString()
        const res = await newComment(this.comment, this.postID)
        if(res) {
          console.log("Posting comment was successful")
          this.comment.body = ''
          this.refreshComments()
        } else {
          console.log("Posting comment failed")
        }
      } catch (err) {
        console.log(err)
      }
      
      this.loading = false
    },
    async refreshComments() {
      this.comments = await getCommentsByID(this.postID)
    },
    async deleteComment(comment: COMMENT) {
      await removeComment(comment, this.postID)
      this.refreshComments()
    }
  }
})
</script>