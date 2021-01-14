import prisma from '../../config/prisma'
export default async (req , res ) => {
    
    if (req.method === 'POST'){
        try {
            await prisma.user.updateMany({
                data: { 
                    dailyCheck: false
                },
                where: {dailyCheck: true}
            }).then(response => {
                return res.status(200).json({count: response.count})
            })
        } catch (err) {
            return res.status(500).json({error: 500, message: err.message})
        }
    } else {
        return res.status(500).json({erorr: 500, message: 'No authentication found.'})
    }

    
}