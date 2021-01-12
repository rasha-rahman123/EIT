import prisma from '../../config/prisma'

const findProfile = async (nn,res) => {
  const posts = await prisma.user.findUnique({
    where: {email: nn}
  })

await res.send(posts.score)
}
export default (req,res)  => {
  
  

      findProfile(req.query.name,res);

    
}