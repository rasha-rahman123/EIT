import prisma from '../../config/prisma'
import {getSession} from 'next-auth/client'

export default async (req , res ) => {
    const session = getSession({req})
    const id = req.query.id
    const msg = req.query.msg + ""
    const mood = +req.query.mood
    if (session && req.method === 'POST'){
        try {
            await prisma.daily_journal.create({
                data: {
                    journalConnector: {connect: {id: +id}},
                    journalMsg: msg,
                    moodRating: mood
                }
            }).then(async response => {
                await prisma.user.update({
                    where: {id: +id},
                    data: {dailyCheck: true}
                }).then(response => res.status(200).json({success: true}))
            }, reject => res.status(500).json({success: false, message: reject}))
        } catch (err) {
            return res.status(500).json({error: 500, message: err.message})
        }
    } else {
        return res.status(500).json({erorr: 500, message: 'No authentication found.'})
    }

    
}