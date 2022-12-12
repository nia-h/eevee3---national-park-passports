//'use client';
import Image from 'next/image';
import styles from 'page.module.css';
import axios from 'axios';
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CodeSharp } from '@mui/icons-material';

export async function getParkCodes() {
  const parks = await prisma.park.findMany({
    select: {
      park_code: true,
    },
  });
  prisma.$disconnect();

  //const data: string = JSON.stringify(parks);
  return parks.map(el => {
    return el.park_code;
  });
}

export async function generateStaticParams() {
  // only used for statically generated route segemnt(slug?) at build time
  const codes = await getParkCodes();

  //const codes = await res.json();
  console.log('codes==>', codes);
  const trimmedCodes = codes.splice(0, 10);
  const params = trimmedCodes.map(code => ({
    park: code,
  }));
  // const params = codes.map(code => ({
  //   park: code,
  // }));

  console.log('params==>,', params);
  return params;
}

export default async function ParkDetails({ params }) {
  const { park } = params;

  const parkInfo = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=I9sAHx1bu9OtW60yyqrgRBMPTDnsuPrMQJrkngf1`).then(res => res.json());

  const { data } = parkInfo;

  const { fullName, url, description, activities, contacts, entranceFees, entrancePasses, directionsInfo, directionsUrl, operatingHours, images, weatherInfo } = data[0];

  const activityList = activities.map((activity: any, i: any) => {
    return <li key={i}>{activity.name}</li>;
  });

  const feeInfo = entranceFees.map((fee: any, i: any) => {
    return (
      <div className='fees' key={i}>
        <h3>{fee.title}</h3>
        <p>{fee.cost}</p>
        <p>{fee.description}</p>
      </div>
    );
  });

  const imageArray = Object.values(images[0]);
  const imageURL: any = imageArray[4];
  console.log('imageURL==>', imageURL);
  // console.log('imageArray', imageArray)
  // const imageURL = images[0].url;
  // const imageAlt = images[0].altText;
  // const imageCaption = images[0].caption;

  const passInfo = entrancePasses.map((fee: any, i: any) => {
    return (
      <div className='fees' key={i}>
        <h3>{fee.title}</h3>
        <p>{fee.cost}</p>
        <p>{fee.description}</p>
      </div>
    );
  });

  //const obj = operatingHours[0] && operatingHours[0].standardHours ? operatingHours[0].standardHours : {};
  let obj: object | undefined = operatingHours[0]?.standardHours;
  if (!obj) obj = {};
  const arr = [];
  for (const key in obj) {
    /*@ts-ignore*/
    arr.push(`${key}: ${obj[key]}`);
  }
  const hours = arr.map((hour, i) => {
    return <li key={i}>{hour}</li>;
  });

  // STYLING:
  /*
  Each section is divided into divs for easier styling with responsive design
  Each section also has their own id for syling

  Thoughts:
  - for mobile, organize into a vertical line
  - each increase in screen width we could add a column?
      mid size screen: title on top --> 2 columns of 3 rows
      large size screen: title on top --> 3 columns of 2 rows
  */
  return (
    <div id={styles.app}>
      <div className={styles.container} id='parkNameAndPhoto'>
        <h1 className={styles.header}>{fullName}</h1>
        <p className={styles.header}>{description}</p>
        {/*typescript-ignore*/}
        <Image src={imageURL} alt='something went wrong' width='375' height='250' className={styles.header} />
        <br />
        {/* <caption>{imageArray[3]}</caption> */}
        {/* <caption>{`Photographer: ${imageArray[3]}`}</caption> */}
        <br />
        <br />
        <a className={styles.header} href={url}>
          More Park Details
        </a>
      </div>
      <br />
      <div className={styles.container} id={styles.parkActivities}>
        <h2 className={styles.header}>Park Activities</h2>
        <ul className={styles.header}>{activityList}</ul>
      </div>
      <br />
      <div className={styles.container} id={styles.parkFees}>
        <h2 className={styles.header}>Entrance Fees & Passes</h2>
        {feeInfo}
        {passInfo}
      </div>
      <br />
      <div className={styles.container} id={styles.parkOperatingHours}>
        <h2 className={styles.header}>Operating Hours</h2>
        <h3 className={styles.header}>{operatingHours[0] && operatingHours[0].description ? operatingHours[0].description : 'n/a'}</h3>
        <ul className={styles.header}>{hours}</ul>
      </div>
      <br />
      <div className={styles.container} id={styles.parkDirections}>
        <h2 className={styles.header}>Parking Directions</h2>
        <p className={styles.header}>{directionsInfo}</p>
        <a className={styles.header} href={directionsUrl}>
          Click for Directions
        </a>
      </div>
      <br />
      <div className={styles.container} id={styles.parkWeather}>
        <h2 className={styles.header}>Weather Info</h2>
        <p className={styles.header}>{weatherInfo}</p>
      </div>
      <br />
      <div className={styles.container} id={styles.parkContactInfo}>
        <h2 className={styles.header}>Park Phone Number</h2>
        <p className={styles.header}>{contacts.phoneNumbers[0].phoneNumber}</p>
      </div>
    </div>
  );
}
