// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { User } from '../../../typings';

type Data = {
  user: any;
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body;
  //console.log(email, password);
  const users: User[] = await prisma.user.findMany({
    where: {
      email: email,
      password: password,
    },
    select: {
      pk_user_id: true,
      email: true,
    },
  });
  prisma.$disconnect();
  //console.log(users);

  res.status(200).json({ user: users[0] });
}
