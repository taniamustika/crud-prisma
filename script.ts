import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // //***create a single record***//
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'elsa@prisma.io',
  //     name: 'Elsa Prisma',
  //   },
  // })
  // console.log(user)
  let includePosts: boolean = true
  let user: Prisma.UserCreateInput

  if (includePosts) {
    user = {
      email: 'elsaaaprisma.io',
      name: 'Elsa Prisma',
      posts: {
        create: {
          title: 'Include this post!',
        },
      },
    }
  } else {
    user = {
      email: 'elsaaa@prisma.io',
      name: 'Elsa Prisma'
    }
  }
  const createUser = await prisma.user.create({ data: user, include: {posts: true} })
  console.log(createUser)
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