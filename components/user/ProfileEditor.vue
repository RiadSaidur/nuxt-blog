<template>
  <v-form @submit.prevent="updateProfile">
    <v-list-item class="pa-0 mt-4">
      <v-list-item-content v-for="(inputField, idx) in inputFields" :key="idx" class="pa-0">
        <v-text-field
          v-model="profile[inputField.name]"
          :label="inputField.name"
          :rules="textRules"
          hide-details="auto"
          class="mb-5"
          autocomplete="off"
          :prepend-icon="inputField.icon"
        ></v-text-field>
      </v-list-item-content>
    </v-list-item>

    <v-btn 
      type="submit" 
      class="my-2 primary"
      block 
      
    >Save</v-btn>
  </v-form>
</template>

<script>
export default {
  props: ["profile", "updateProfile"],
  data () {
    return {
      inputFields: [
        {
          name: "displayName",
          icon: "mdi-format-title"
        },
        {
          name: "username",
          icon: "mdi-format-title"
        }
      ],
      textRules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ]
    }
  }
}
</script>