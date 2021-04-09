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

    <!-- <v-text-field
      v-model="experience.Title"
      :label="experience.Title"
      :rules="textRules"
      hide-details="auto"
      class="mb-5"
      autocomplete="off"
      prepend-icon="mdi-format-title"
    ></v-text-field> -->

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
            [{ color: [] }],
            ['link', 'image']
          ]
        }
      }
    }
  },
  computed: {
    postID(): string {
      return this.$route.params.postID
    }
  },
  async fetch() {
    if(this.update) this.experience = <NEWPOST>(await getPostByID(this.postID))
  },
  methods: {
    saveExperience() {
      this.$emit('submit', this.experience)
    }
  }
})
</script>