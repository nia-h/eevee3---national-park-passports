import type { NextApiRequest, NextApiResponse } from 'next';
import { Park } from '../../typings';
import { PrismaClient } from '@prisma/client';

type Data = {
  name: {}
};


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const parks = await prisma.park.findMany({
    select: {
      park_code: true
    },
  });
  prisma.$disconnect();

  //const data: string = JSON.stringify(parks);
  const parkCodes = parks.map(el => {
    return el.park_code
  })

  //console.log(parkCodes)

  res.status(200).json({name: parkCodes});
}