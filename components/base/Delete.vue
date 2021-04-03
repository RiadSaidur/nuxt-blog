<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="warning"
          dark
          v-bind="attrs"
          v-on="on"
          width="100%"
          text
        >
          Delete {{ type }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Delete {{ type }}
        </v-card-title>

        <v-card-text class="mt-2">
          Are you sure you want to delete this {{ type }}?
          This action cannot be undone.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text
            @click="handleAction"
          >
            Delete
          </v-btn>
          <v-btn
            color="primary"
            text
            outlined
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "delete-action",
  props: [ "type", "deleteItem" ],
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    handleAction() {
      this.dialog = false
      this.deleteItem()
    }
  }
}
</script>