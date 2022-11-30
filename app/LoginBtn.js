"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import UserInfo from "./userInfo"

export default function Component({children}) {
  const { data: session } = useSession()
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.email} <br />
        <UserInfo data={session.user} />
        <button onClick={() => signOut()}>Sign out</button>
        {children}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}