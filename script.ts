import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  //By unique identifier
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: 'elsa@prisma.io',
  //   },
  // })
  // console.log(user)

  //By ID
  const user = await prisma.user.findUnique({
    where: {
      id: 5,
    },
  })
  console.log(user)
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