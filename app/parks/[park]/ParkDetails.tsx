// // 'use client';

// // export default async function ParkDetails() {
// //   // console.log('parkCode', parkCode);

// //   // console.log('parkInfo data', parkInfo.data)

// //   // Wait for the promises to resolve
// //   const [fullName, description, activites, contactInfo, entranceFees, entrancePasses, directionsInfo, directionsUrl, operatingHours, imageUrl, imageAltText, weatherInfo] = parkInfo.data;

// //   // should we destructure down below?
// //   //contactInfo = contacts.phoneNumbers[0].phoneNumber,
// //   //imageUrl = images[0].url,
// //   // imageAltText = images[0].altText,

// //   return (
// //     <>
// //       <h1>HI</h1>
// //       {/* <ParkPage
// //       fullName={fullName}
// //       description={description}
// //       activites={activites}
// //       contactInfo={contactInfo}
// //       entranceFees={entranceFees}
// //       entrancePasses={entrancePasses}
// //       directionsInfo={directionsInfo}
// //       directionsUrl={directionsUrl}
// //       operatingHours={operatingHours}
// //       imageUrl={imageUrl}
// //       imageAltText={imageAltText}
// //       weatherInfo={weatherInfo}
// //       ></ParkPage> */}
// //     </>
// //   );
// // }

// import React from 'react';
// import { Park } from '../../.././typings';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// const fetchPakrs = async () => {
//   const res = await prisma.park.findMany();
//   console.log('res==>', res);
//   return res;
// };

// export default async function ParkList() {
//   //const res = await fetch('https://api.example.com/...');
//   const parks = await fetchPakrs();
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   return;
//   <div>test</div>;
// }
