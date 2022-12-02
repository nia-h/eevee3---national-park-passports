'use client';
import React, { useState } from 'react';
import ParkList from './parkList';
import styles from './page.module.css';
import map from '../../public/map.png';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Parks() {
  const [userEmail, setUserEmail] = useState('joy@test.com');
  // const { data } = useSession();
  // if (data) {
  //   console.log('session.data==>', data);
  //   setUserEmail(data.user.email);
  // }

  return (
    <div className={styles.container}>
      {/*@ts-ignore*/}
      {/* map would go here */}
      <Image 
        src={map}
        alt='a map of the national parks in the USA'
        width='750'
        height='500'
        className={styles.map}
      ></Image>
      <br />
      <ParkList userEmail={userEmail} />
    </div>
  );
}
