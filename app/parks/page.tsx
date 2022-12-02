import React, { useState } from 'react';
import ParkList from './parkList';
import styles from './page.module.css';
import map from '../../public/map.png';
import Image from 'next/image';

export default function Parks() {
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
      <ParkList />
    </div>
  );
}
