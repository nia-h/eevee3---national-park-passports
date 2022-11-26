'use client';

export default async function ParkDetails() {
  // console.log('parkCode', parkCode);
  
  // console.log('parkInfo data', parkInfo.data)

  // Wait for the promises to resolve
  const [
    fullName, 
    description, 
    activites, 
    contactInfo,
    entranceFees, 
    entrancePasses, 
    directionsInfo, 
    directionsUrl, 
    operatingHours, 
    imageUrl, 
    imageAltText, 
    weatherInfo
   ] = parkInfo.data;

  // should we destructure down below?
  //contactInfo = contacts.phoneNumbers[0].phoneNumber,  
  //imageUrl = images[0].url, 
  // imageAltText = images[0].altText, 

  return (
    <>
      <h1>HI</h1>
      {/* <ParkPage 
      fullName={fullName} 
      description={description} 
      activites={activites} 
      contactInfo={contactInfo} 
      entranceFees={entranceFees} 
      entrancePasses={entrancePasses} 
      directionsInfo={directionsInfo} 
      directionsUrl={directionsUrl} 
      operatingHours={operatingHours} 
      imageUrl={imageUrl} 
      imageAltText={imageAltText} 
      weatherInfo={weatherInfo}
      ></ParkPage> */}
    </>
  );
};
