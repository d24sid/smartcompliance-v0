import { redirect } from "next/navigation"

export default function RootPage() {
  // Redirect to login by default
  // Note: redirect() automatically handles basePath in Next.js
  redirect("/login")
}
