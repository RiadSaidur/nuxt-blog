<template>
  <section>
    <post-editor @submit="saveExperience" :update="false" :loading="loading" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import PostEditor from "@/components/posts/PostEditor.vue"
import { newPost } from '@/handlers/protected/posts'

interface NEWPOST extends POST {
  author: string;
  TitleImage: File;
}

export default Vue.extend({
  components: {
    PostEditor
  },
  middleware: ['authenticated'],
  data() {
    return {
      loading: false,
      // input field values
      experience: {
        Title: '',
        Place: '',
        VisitDate: '',
        Body: '',
        TitleImage: undefined
      },
    }
  },
  computed: {
    author(): string {
      return this.$store.state.user.username
    }
  },
  head() {
    return {
      title: `Create Post`
    }
  },
  methods: {
    // Save experience in the DB
    async saveExperience(experience: NEWPOST) {
      this.loading =  true
      experience.author = this.author
      const postID = await newPost(experience)
      if(postID) this.$nuxt.$options.router.push(`/posts/${postID}`)
      else console.log('ops')
      this.loading = false

      // if(this.experience.Title && this.experience.Body && this.experience.Place) {
      //   const formData = new FormData()
      //   for(const [key, value] of Object.entries(this.experience)) {
      //     if(key === 'TitleImage') formData.append(key, value, value.name)
      //     else formData.append(key, value)
      //   }
      //   const response = await this.$axios.post(
      //     '/private/shareExperience', 
      //     formData,
      //     { onUploadProgress: e => console.log(Math.floor((e.loaded / e.total) * 100)) }
      //   )
      // }
    }
  }
})
</script>