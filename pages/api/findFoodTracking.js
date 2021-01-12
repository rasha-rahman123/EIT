import prisma from '../../config/prisma'
export default async (req,res) => {
    const feed = await prisma.tracking_food.findMany({

        where: { trackerEmail:  req.query.email},
    orderBy: {
        date: 'desc'
    },
    include: {
        tracker: false
    }
      })

     
    
      await res.send([feed[0],feed[1]])
}