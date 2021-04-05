import { currentUser } from "@/firebase/firebase";

export default function ({ redirect }) {
  if(!currentUser()) redirect("/")
}