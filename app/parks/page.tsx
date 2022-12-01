'use client';
import React, { useState } from 'react';
import ParkList from './parkList';

export default function Parks() {
  const [userEmail, setUserEmail] = useState('joy@test.com');
  return (
    <div>
      {/*@ts-ignore*/}
      {/* map would go here */}
      <ParkList userEmail={userEmail} />
    </div>
  );
}
