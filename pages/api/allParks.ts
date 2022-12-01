// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Park } from '../../typings';
import prisma from '../../lib/prisma';
import parkBasicInfo from '../../data/parkBasicInfo.json';

console.log('parkBasicInfo.length==>', parkBasicInfo.length);

type Data = {
  allParks: Park[];
};

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const allParks: Park[] = await prisma.park.findMany({
    include: {
      visitedUser: true,
    },
  });
  prisma.$disconnect();
  res.status(200).json({ allParks: allParks });
}
