import prisma from "../../config/prisma";
import {getSession} from 'next-auth/client'

export default async (req , res ) => {
    const session = getSession({req})
    const id = req.query.id
    if (session && req.method === 'GET'){
        try {
            await prisma.user.findUnique({
                where: {id: +id}
            }).then(response => {
                if(response?.dailyCheck){
                    return res.status(200).json({complete: true})
                } else {
                    return res.status(200).json({complete: false})
                }
            })
        } catch (err) {
            return res.status(500).json({error: 500, message: err.message})
        }
    } else {
        return res.status(500).json({erorr: 500, message: 'No authentication found.'})
    }

    
}