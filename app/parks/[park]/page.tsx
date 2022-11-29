import Image from 'next/image';
import hydrateRoot from 'react-dom';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function getData(req,res) {
//   const parksCodes = await prisma.park.parkCode.findMany();
//   prisma.$disconnect();
//   const data: string = JSON.stringify(parksCodes);

//   res.status(200).json({ parksCodes: data });
// }

export async function generateStaticParams() {
  const parkCodes = await getData();

  return parkCodes.map((code) => ({
    park: code,
  }));
}

export default async function ParkDetails({ params }) {
  const { park } = params;
  // console.log('params', params)
  //{ park: 'acad' }

  const parkInfo = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${park}&api_key=I9sAHx1bu9OtW60yyqrgRBMPTDnsuPrMQJrkngf1`)
    .then(res => res.json())

  const { data } = parkInfo;

  const {
    fullName, 
    url,
    description, 
    activities, 
    contacts, 
    entranceFees, 
    entrancePasses, 
    directionsInfo, 
    directionsUrl, 
    operatingHours, 
    images, 
    weatherInfo
   } = data[0];

  const activityList = activities.map((activity: any) => {
    <li>{activity.name}</li>;
  });

  const feeInfo = entranceFees.map((fee: any, i: any) => {
    return (
      <div className='fees' key={i}>
        <h3>{fee.title}</h3>
        <p>{fee.cost}</p>
        <p>{fee.description}</p>
      </div>
    )
  });

  const passInfo = entrancePasses.map((fee: any, i: any) => {
    return (
      <div className='fees' key={i}>
        <h3>{fee.title}</h3>
        <p>{fee.cost}</p>
        <p>{fee.description}</p>
      </div>
    )
  });

  // oper hours
  // loop thru operatingHours[0].standardHours and display each day of the week as a p tag 

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
    <>
      <div id='parkNameAndPhoto'>
        <h1>{fullName}</h1>
        <p>{description}</p>
        {/* <Image src={images[0].url} alt={images[0].altText} width='300' height='300'/> */}
        <caption>{images[0].caption}</caption>
        <caption>`Photographer: ${images[0].credit}`</caption>
        <br />
        <br />
        {/* <a href={url}>More Park Details</a> */}
      </div>
      <div id='parkActivities'>
        <h2>Park Activities</h2>
        <ul>{activityList}</ul>
      </div>
      <div id='parkFees'>
        <h2>Entrance Fees & Passes</h2>
        {feeInfo}
        {passInfo}
      </div>
      <div id='parkOperatingHours'>
        <h2>Operating Hours</h2>
        {/* <h3>{operatingHours[0].description}</h3>
        <p>{operatingHours[0].standardHours}</p> */}
      </div>
      <div id='parkDirections'>
        <h2>Parking Directions</h2>
        <p>{directionsInfo}</p>
        {/* <a href={directionsUrl}>Click for Directions</a> */}
      </div>
      <div id='parkWeather'>
        <h2>Weather Info</h2>
        <p>{weatherInfo}</p>
      </div>
      <div id='parkContactInfo'>
        <h2>Park Phone Number</h2>
        <p>{contacts.phoneNumbers[0].phoneNumber}</p>
      </div>
    </>
  );
}





