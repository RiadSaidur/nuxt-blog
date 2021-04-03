import { currentUser } from "@/firebase/firebase";

const protectedRoutes = [ "create-post", "user-postID-edit"]

export default function ({ app }) {
  app.router.beforeEach((to, from, next) => {
    if(protectedRoutes.includes(to.name) && !currentUser()) return next(false)
    
    next()
  })
}