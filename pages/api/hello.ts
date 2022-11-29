// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Park } from '../../typings';
import prisma from '../../lib/prisma';

type Data = {
  name: Park[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const parks: Park[] = await prisma.park.findMany();
  prisma.$disconnect();
  //const data: string = JSON.stringify(parks);

  res.status(200).json({ name: parks });
}
