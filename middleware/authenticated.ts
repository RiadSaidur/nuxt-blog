import { Context }  from '@nuxt/types'

import { currentUser } from "@/firebase/firebase";

export default function (ctx: Context) {
  if(!currentUser()) ctx.redirect("/")
}