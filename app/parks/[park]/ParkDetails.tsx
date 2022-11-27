'use client';
import Image from "next/image";

export default function ParkDetails(props: any) {
  console.log('props', props)

  const [
    fullName, 
    description, 
    activites, 
    contacts,
    entranceFees, 
    entrancePasses, 
    directionsInfo, 
    directionsUrl, 
    operatingHours, 
    images, 
    weatherInfo
   ] = props.data;

  const activityList = activites.map((activity: any) => {
    <li>{activity.name}</li>
  });

  const feeInfo = entranceFees.map((fee: any) => {
    <div id="fees">
      <h3>{fee.title}</h3>
      <p>{fee.cost}</p>
      <p>{fee.description}</p>
    </div>
  });

  const passInfo = entrancePasses.map((fee: any) => {
    <div id="fees">
      <h3>{fee.title}</h3>
      <p>{fee.cost}</p>
      <p>{fee.description}</p>
    </div>
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
    <>
      <div id="parkNameAndPhoto">
        <h1>{fullName}</h1>
        <p>{description}</p>
        <Image src={images[0].url} alt={images[0].altText}/>
        <caption>{images[0].caption}</caption>
        <caption>`Photographer: ${images[0].credit}`</caption>
        <br /><br />
        <a href="">More Park Details</a>
      </div>
      <div id="parkActivities">
        <h2>Park Activities</h2>
        <ul>
          {activityList}
        </ul>
      </div>
      <div id="parkFees">
        <h2>Entrance Fees & Passes</h2>
        {feeInfo}
        {passInfo}
      </div> 
      <div id="parkOperatingHours">
        <h2>Operating Hours</h2>
        <h3>{operatingHours.description}</h3>
        <p>{operatingHours.standardHours}</p>
      </div>
      <div id="parkDirections">
        <h2>Parking Directions</h2>
        <p>{directionsInfo}</p>
        <a href={directionsUrl}>Click for Directions</a>
      </div>
      <div id="parkWeather">
        <h2>Weather Info</h2>
        <p>{weatherInfo}</p>
      </div>
      <div id="parkContactInfo">
        <h2>Park Phone Number</h2>
        <p>{contacts.phoneNumbers[0].phoneNumber}</p>
      </div>     
    </>
  );
};
