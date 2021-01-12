import prisma from '../../config/prisma'

const findProfile = async (nn) => {
  const posts = await prisma.user.findUnique({
    where: { email: nn },
  });

  return posts.score;
};
export default async (req, res) => {
  var score = await findProfile(req.query.name)
  await prisma.user
    .update({
        data: { score: score + 1},
        where: { email: req.query.name,}
    })
    .then(() => res.send("success"));
};
