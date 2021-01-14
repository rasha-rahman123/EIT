import prisma from '../../config/prisma'
export default async (req,res) => {
    
     var id = await req.query.id
     var food = await req.query.food
     var water = await req.query.water
     
await prisma.tracking_food.create({
    data: {
        tracker: {connect: {id: +id}},
        foods: food,
        water: +water
    }
})
await res.send('success')
}