import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const findUser = await prisma.user.findFirst({
    where: {
      posts: {
        some: {
          likes: {
            gt: 100
          }
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  })
  console.log(findUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })