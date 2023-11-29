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
  const upsertUser = await prisma.user.upsert({
    where:{
      email: 'elsa@prisma.io',
    },
    update: {
      name: 'Elsa Imoet',
    },
    create: {
      email: 'elsa@prisma.io',
      name:  'Elsa Imoet',
      profileViews: 0,
      role: 'ADMIN',
    }
  })
  console.log(upsertUser)
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