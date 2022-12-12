// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import type { NextApiRequest, NextApiResponse } from 'next';
//import { Park } from '../../typings';
//import prisma from '../../lib/prisma';
//import parkBasicInfo from '../../data/parkBasicInfo.json';

//console.log('parkBasicInfo.length==>', parkBasicInfo.length);

// type Data = {
//   allParks: Park[];
// };

//function to store park info into database
// async function main() {
//   await prisma.park.deleteMany();
//   for (let park of parkBasicInfo) {
//     const result = await prisma.park.create({ data: { park_name: park.fullName, state: park.states, park_code: park.parkCode } });
//     console.log('result==>', result);
//   }
//   prisma.$disconnect();
// }

// main().catch(e => {
//   console.log(e.message);
// });

export default function handler(req, res) {
  fetch(`https://developer.nps.gov/api/v1/parks?&start=100&limit=50&api_key=I9sAHx1bu9OtW60yyqrgRBMPTDnsuPrMQJrkngf1`)
    .then(data => data.json())
    .then(data => {
      //console.log('data==>', data);
      const noHours = data.data.filter(park => !park.operatingHours[0]);
      console.log('noHours[0]==>', noHours[0]);
      res.status(200).json(noHours);
    });
}
