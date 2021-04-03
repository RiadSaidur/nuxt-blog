<template>
  <section>
    <post-editor :experience="experience" :saveExperience="saveExperience" :deleteExperience="deleteExperience" :update="true" />
  </section>
</template>

<script>
import PostEditor from "@/components/posts/PostEditor"
import { deletePostByID, updatePostByID } from '@/handlers/protected/posts'
import { currentUser } from '@/firebase/firebase'


export default {
  components: {
    PostEditor
  },
  data() {
    return {
      experience: {},
    }
  },
  head() {
    return {
      title: `Edit - ${this.experience.Title}`
    }
  },
  computed: {
    postID() {
      return this.$nuxt._route.params.postID
    },
    postAuthor() {
      return this.$nuxt._route.params.user
    }
  },
  async fetch() {
    this.experience = await this.$store.getters.getSinglePost(this.postID)
  },
  created() {
    if(this.postAuthor != currentUser()) this.$nuxt.$options.router.push("/")
  },
  methods: {
    async deleteExperience() {
      const isDeleted  = await deletePostByID(this.experience, this.postID)
      if(isDeleted) this.$nuxt.$options.router.push("/")
    },
    // Save experience in the DB
    async saveExperience() {
      this.loading =  true
      const postID = await updatePostByID(this.experience, this.postID)
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