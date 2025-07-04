import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      name?: string | null
      email?: string | null
    }
  }

  interface User {
    id: string
    username: string
    email: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string
    username?: string
  }
}