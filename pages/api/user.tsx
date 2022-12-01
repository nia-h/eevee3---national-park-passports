import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.body==>', req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: req.body,
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
  res.status(200).json(user);
}
