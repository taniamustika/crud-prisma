import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: 'E',
          },
        },
        {
          AND: {
            profileViews: {
              gt: 0,
            },
            role: {
              equals: 'ADMIN',
            },
          },
        },
      ],
    },
  })
  console.log(users)
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