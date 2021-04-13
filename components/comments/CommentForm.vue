<template>
  <v-form @submit.prevent="addComment">
    <v-text-field
      v-model="comment.body"
      label="Leave a comment"
      hide-details="auto"
      autocomplete="off"
    />

    <v-btn
      type="submit"
      class="mt-5 primary"
      :disabled="loading"
      :loading="loading"
    >
      Comment
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "comment-form",
  props: [
    "addComment",
    "comment"
  ],
  data() {
    return {
      loading: false
    }
  }
})
</script>