'use client';
import React, { useState } from 'react';
import ParkList from './parkList';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Parks() {
  const [userEmail, setUserEmail] = useState('joy@test.com');
  // const { data } = useSession();
  // if (data) {
  //   console.log('session.data==>', data);
  //   setUserEmail(data.user.email);
  // }

  return (
    <div>
      {/*@ts-ignore*/}
      {/* map would go here */}
      <ParkList userEmail={userEmail} />
    </div>
  );
}
