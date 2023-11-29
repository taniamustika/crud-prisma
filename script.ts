import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query' as never, (e: any) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

async function main() {
  // (name === StartWith('E') OR (Profile Views > 0 AND Role === 'ADMIN'))
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