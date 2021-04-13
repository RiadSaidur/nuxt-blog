<template>
  <section>
    <post-editor @submit="saveExperience" :deleteExperience="deleteExperience" :update="true" :loading="loading" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import PostEditor from "@/components/posts/PostEditor.vue"
import { deletePostByID, updatePostByID } from '@/handlers/protected/posts'

interface HEAD {
  title: string;
}

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
      experience: {} as NEWPOST
    }
  },
  head(): HEAD {
    return {
      title: `Edit - ${this.experience?.Title}`
    }
  },
  computed: {
    postID(): string {
      return this.$route.params.postID
    },
    postAuthor(): string {
      return this.$route.params.user
    },
    currentUser(): string {
      return this.$store.state.user?.username
    }
  },
  async fetch() {
    this.experience = await this.$store.getters['posts/getSinglePost'](this.postID)
  },
  created() {
    if(this.postAuthor != this.currentUser) this.$nuxt.$options.router.push("/")
  },
  methods: {
    async deleteExperience() {
      const isDeleted  = await deletePostByID(this.experience, this.postID)
      if(isDeleted) this.$nuxt.$options.router.push("/")
    },
    // Save experience in the DB
    async saveExperience(experience: NEWPOST) {
      this.loading =  true
      experience.author = this.currentUser
      const postID = await updatePostByID(experience, this.postID)
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