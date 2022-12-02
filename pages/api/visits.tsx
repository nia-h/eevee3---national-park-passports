import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('(visits)req.body==>', req.body);
  const visits = await prisma.visitedPark.findMany({
    where: {
      fk_user_id: req.body,
    },
    // include: {
    //   visitedPark: {
    //     where: {
    //         fk_user_id:
    //     },
    //   },
    // },
  });
  prisma.$disconnect();
  res.status(200).json(visits);
}
