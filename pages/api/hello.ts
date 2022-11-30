// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Park } from '../../typings';
import prisma from '../../lib/prisma';

type Data = {
  allParks: Park[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const allParks: Park[] = await prisma.park.findMany({
    include: {
      visitedUser: true,
    },
  });

  console.log('allParks[0]===>', allParks[0]);
  prisma.$disconnect();
  //const data: string = JSON.stringify(parks);
  res.status(200).json({ allParks: allParks });
}
