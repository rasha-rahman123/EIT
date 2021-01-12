

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async (req,res) => {
    
     var email = await req.query.email
     var food = await req.query.food
     var water = await req.query.water
     console.log(email,food,water)
await prisma.tracking_food.create({
    data: {
        tracker: {connect: {email: email}},
        foods: food,
        water: +water
    }
})
await res.send('success')
}