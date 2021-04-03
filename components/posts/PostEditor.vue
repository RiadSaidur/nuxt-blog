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
      :loading=loading
    >Share</v-btn>

    <Delete v-if="update" type="Post" :deleteItem="deleteExperience" />

  </v-form>
</template>

<script>
import Delete from "@/components/base/Delete"

export default {
  name: "post-editor",
  props: [ "experience", "saveExperience", "update", "deleteExperience" ],
  components: {
    Delete
  },
  data() {
    return {
      dialog: false,
      isMenu: false,
      isValid: false,
      loading: false,
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
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      imageRules: [
        value => !value || value.size < 2000000 || 'Title image size should be less than 2 MB!',
        value => {
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
            ['blockquote', 'code-block'],
            [{ header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ header: [2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ['clean'],
            ['link', 'image']
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value
          }
        }
      }
    }
  }
}
</script>