<template>
  <v-form
    @submit.prevent="saveExperience"
    v-model="isValid"
    ref="form"
  >
    <!-- input field for Title and Place -->
    <v-list-item class="pa-0">
      <v-list-item-content v-for="(inputField, idx) in inputFields" :key="idx" class="pa-0">
        <v-text-field
          v-model="experience[inputField.name]"
          :label="inputField.name"
          :rules="textRules"
          hide-details="auto"
          class="mb-5"
          autocomplete="off"
          :prepend-icon="inputField.icon"
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>

    <!-- Date -->
    <v-menu
      v-model="isMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="experience.VisitDate"
          label="Date of Visit"
          readonly
          v-bind="attrs"
          v-on="on"
          prepend-icon="mdi-calendar"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="experience.VisitDate"
        @input="isMenu = false"
      ></v-date-picker>
    </v-menu>

    <!-- Rich Text Editor -->
    <client-only>
      <quill-editor
        v-model="experience.Body"
        :options="editorOption"
        class="rich-text"
      />
    </client-only>

    <!-- Title image uploader -->
    <v-file-input
      v-if="!update"
      v-model="experience.TitleImage"
      :rules="imageRules"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick an Title image"
      prepend-icon="mdi-camera"
      label="Title image"
      class="mt-2"
    ></v-file-input>

    <!-- Submit button -->
    <v-btn 
      type="submit" 
      class="my-2 primary"
      block 
      :disabled="!experience.Title || !experience.Body || !experience.Place || loading"
      :loading="loading"
    >Share</v-btn>

    <Delete v-if="update" type="Post" :deleteItem="deleteExperience" />

  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import Delete from "@/components/base/Delete.vue"
import { getPostByID } from '@/handlers/public/posts'
import { savePostBodyImages } from '@/handlers/protected/posts'

interface NEWPOST extends POST {
  author: string;
  TitleImage: File;
}

export default Vue.extend({
  name: "post-editor",
  props: [ "update", "deleteExperience", "loading" ],
  components: {
    Delete
  },
  data() {
    return {
      experience: {} as NEWPOST,
      dialog: false,
      isMenu: false,
      isValid: false,
      inputFields: [
        {
          name: "Title",
          icon: "mdi-format-title"
        },
        {
          name: "Place",
          icon: "mdi-map-marker"
        },
      ],
      // Rules for input fields
      textRules: [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 3) || 'Min 3 characters',
      ],
      imageRules: [
        (value: File) => !value || value.size < 2000000 || 'Title image size should be less than 2 MB!',
        (value: File) => {
          if(!value) return false
          else {
            const acceptedTypes = ['png', 'jpg', 'jpeg', 'gif']
            const extension = value.type.split('/')[1]

            if(!acceptedTypes.includes(extension)) return 'Only JPEG/PNG/GIF is accepted'
            else return true
          }
        }
      ],
      // Some Quill options...
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{ header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'super' }],
            ['link', 'image']
          ]
        }
      }
    }
  },
  computed: {
    postID(): string {
      return this.$route.params.postID
    },
    author(): string {
      return this.$store.state.user.username
    }
  },
  async fetch() {
    if(this.update) this.experience = <NEWPOST>(await getPostByID(this.postID))
  },
  methods: {
    dataURLtoFile(dataurl: string, filename: string) {
      let arr = dataurl.split(',')
      const mime = arr[0]?.match(/:(.*?);/)?.[1]
      const bstr = atob(arr[1])
      const n = bstr.length
      const u8arrs = new Uint8Array(n)
      
      u8arrs.forEach((u8arr, idx) => {
        u8arrs[idx] = bstr.charCodeAt(idx);
      })

      return new File([u8arrs], filename, {type:mime});
    },

    getImageFiles(images: NodeListOf<Element>, author: string): File[] {
      const imageFiles = [] as File[]

      images.forEach(async image => {
        if(image.getAttribute('src')?.startsWith('data:image/')) {
          const imageDataUrl = <string>image.getAttribute('src')
          const imageFileName = `${author}-${Math.floor(Math.random() * 1000000)}`
          const imageFile = this.dataURLtoFile(imageDataUrl, imageFileName)
          imageFiles.push(imageFile)
        }
      })

      return imageFiles
    },

    async uploadImages(imageFiles: File[], author: string): Promise<string[]> {
      const imageURLs = await savePostBodyImages(imageFiles, author)
      return imageURLs
    },

    async saveExperience() {
      this.experience.author = this.author
      const images = document.querySelectorAll("div .ql-editor p img")
      if(images.length) {
        const imageFiles = this.getImageFiles(images, this.author)
        const imageURLs = await this.uploadImages(imageFiles, this.author)

        if(imageURLs.length) {
          let imageURLidx = 0
          images.forEach(image => {
            if(image.getAttribute('src')?.startsWith('data:image/')) {
              image.removeAttribute('src')
              image.setAttribute('src', imageURLs[imageURLidx])
              imageURLidx++
            }
          })
        }
        const textEditorInnerHtml = document.querySelector("div .ql-editor")?.innerHTML
        this.experience.Body = <string>textEditorInnerHtml
      }
      
      this.$emit('submit', this.experience)
    }
  }
})
</script>