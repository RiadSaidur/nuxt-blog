<template>
  <v-container>
    <v-toolbar-title class="px-4 pb-4">Q/A</v-toolbar-title>
    <v-tabs
      v-model="tab"
      align-with-title
    >
      <v-tabs-slider color="red lighten-3"></v-tabs-slider>
      
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>

      <v-tab-item>
        Discover
      </v-tab-item>
      <v-tab-item>
        Your Questions
      </v-tab-item>
      <v-tab-item>
        <QuestionsAsk />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

import QuestionsAsk from "@/components/questions/QuestionsAsk.vue"

export default Vue.extend({
  name: "questions",
  components: {
    QuestionsAsk
  },
  data() {
    return {
      tab: null,
      items: [
        'Discover', 'Your Questions', 'Ask Questions'
      ]
    }
  },
  mounted() {
    this.$store.dispatch('questions/getQuestions')
  }
})
</script>