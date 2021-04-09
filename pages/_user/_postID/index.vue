<template>
  <v-container>
    <v-card elevation="0 pt-4">
      <v-img :src="post.TitleImage || defaultImage" max-height="300px" :contain="true"/>

      <v-card-title v-text='post.Title' />

      <v-card-subtitle class="mt-2">
          <v-icon>mdi-account</v-icon> <nuxt-link :to="`/${post.author}`" v-text="post.author" /> |
          <v-icon>mdi-calendar</v-icon> {{ post.createdAt }}  |
          <span v-if="isAuthor">
            <v-icon>mdi-pencil</v-icon> <nuxt-link :to="`/${post.author}/${postID}/edit`">edit</nuxt-link>
          </span>
      </v-card-subtitle>

      <v-card-text>
        <p>
          <v-icon>mdi-map-marker</v-icon> {{ post.Place }} |
          <v-icon>mdi-calendar</v-icon> {{ post.createdAt }}
        </p>
      </v-card-text>

      <v-card-text>
        <p v-html="post.Body"></p>
      </v-card-text>
    </v-card>
    <Comments />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { POST } from '@/interface/types/post'

import Comments from "@/components/comments/Comments.vue"

interface POSTVIEW extends POST {
  author: string;
  slug?: string;
  TitleImage: string;
}

export default Vue.extend({
  name: "Post",
  components: {
    Comments
  },
  data() {
    return {
      post: {} as POSTVIEW,
      defaultImage: "https://images.unsplash.com/photo-1533850595620-7b1711221751?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    }
  },
  head(): any {
    return {
      title: this.post.Title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.slug
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.Title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.slug
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.post.TitleImage || this.defaultImage
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.post.Title
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.Title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.slug
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.post.TitleImage || this.defaultImage
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.post.Title
        }
      ]
    }
  },
  computed: {
    postID(): string {
      return this.$route.params.postID
    },
    isAuthor(): boolean {
      return this.$store.state.user?.username === this.post.author
    },
  },
  async fetch() {
    this.post = await this.$store.getters['posts/getSinglePost'](this.postID)
    this.post.slug = this.post.Body.split(/\<*>/g)[1].split(/<\//g)[0]
  }
})
</script> 