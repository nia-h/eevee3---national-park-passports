'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import UserInfo from './userInfo';
import Button from '@mui/material/Button';

export default function Component({ children }) {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.email} <br />
        {/* <UserInfo data={session.user} /> */}
        <Button onClick={() => signOut()}>Sign out</Button>
        {children}
      </>
    );
  }
  return (
    <>
      <Button variant='contained' onClick={() => signIn(undefined, { callbackUrl: '/parks' })}>
        Sign in
      </Button>
    </>
  );
}
