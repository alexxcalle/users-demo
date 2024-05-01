import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.users.upsert({
    where: { name: 'Juan Perez' },
    update: {},
    create: {
      name: 'Juan Perez',
      about: 'Mi nombre es Juan Perez y estudio programacion',
      role: 'Estudiante',
      email: 'juan@gmail.com',
      password: '124325345',
      cellphone: 9951227483,
    },
  });

  const post2 = await prisma.users.upsert({
    where: { name: 'Pedro Messi' },
    update: {},
    create: {
      name: 'Pedro Messi',
      about: '',
      role: 'Docente',
      email: 'pedroms@gmail.com',
      password: '1245657545',
      cellphone: 9951576583,
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
