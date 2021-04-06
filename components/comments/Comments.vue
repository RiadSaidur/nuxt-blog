<template>
  <v-container >
    <comment-form :addComment="addComment" :comment="comment" v-if="isAuthenticated"/>
    <comment-list :comments="comments" :deleteComment="deleteComment" />
  </v-container>
</template>

<script>
import CommentForm from "@/components/comments/CommentForm"
import CommentList from "@/components/comments/CommentList"

import { newComment, removeComment } from '@/handlers/protected/comments'
import { getCommentsByID } from "@/handlers/public/comments"

export default {
  name: "Comments",
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      commentRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 2) || 'Min 2 characters',
      ],
      comments: [],
      loading: false,
      comment: {
        body: '',
        childs: 0
      }
    }
  },
  computed: {
    postID() {
      return this.$nuxt._route.params.postID
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
    async deleteComment(comment) {
      await removeComment(comment, this.postID)
      this.refreshComments()
    }
  }
}
</script>