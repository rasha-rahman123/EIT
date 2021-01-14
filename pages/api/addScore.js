import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../config/prisma'
import {getSession} from 'next-auth/client'
const findProfile = async (nn) => {
  const posts = await prisma.user.findUnique({
    where: { id: +nn },
  });

  return posts.score;
};
export default async (req , res) => {
  const session = getSession({req})
  
  if(session){
    var score = await findProfile(req.query.id)
    await prisma.user
    .update({
        data: { score: score + 1},
        where: { id: +req.query.id,}
    })
    .then(() => res.status(200).json({success: 'Score Added'})) 
  } else {
    return res.status(500).json({error: 'Not Authenticated'})
  }
  
    
};
