import prisma from '../../config/prisma'
import {getSession} from 'next-auth/client'
const findProfile = async (nn,res) => {

  const posts = await prisma.user.findUnique({
    where: {id: +nn}
  })

 

await res.send(posts.score)
}
export default async (req,res)  => {
  const session = await getSession({req});

  if(session){
    findProfile(req.query.id,res);
  } else
  {
    res.send('Not logged in')
  }
  

    

    
}