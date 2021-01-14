import prisma from '../../config/prisma'
import {getSession} from 'next-auth/client'
export default async (req,res) => {
    const session = getSession({req})
    if(session) {
        const feed = await prisma.daily_journal.findMany({

            where: { journalAuthorID: +req.query.id},
        orderBy: {
            date: 'desc'
        }
          })
    
         
        
          await res.status(200).send(feed)
    }
}