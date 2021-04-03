<template>
  <section>
    <post-editor :experience="experience" :saveExperience="saveExperience" :update="false" />
  </section>
</template>

<script>
import PostEditor from "@/components/posts/PostEditor"
import { newPost } from '@/handlers/protected/posts'
export default {
  components: {
    PostEditor
  },
  data() {
    return {
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
  head() {
    return {
      title: `Create Post`
    }
  },
  methods: {
    // Save experience in the DB
    async saveExperience() {
      this.loading =  true
      const postID = await newPost(this.experience)
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
}
</script>