import { PrismaClient, type Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const SHOULD_LOG = true;
const log: typeof console.log = (...args) => {
  if (SHOULD_LOG) {
    console.log(...args);
  }
};

function batchCreateData<T>(factory: () => T, amount = 100) {
  return Array.from({ length: amount }).map(factory);
}

function randomUserData(): Prisma.UserCreateInput {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);
  return {
    email,
    name: faker.name.fullName({ firstName, lastName, sex }),
    googleId: faker.helpers.unique(faker.random.numeric, [21]),
  };
}

async function main() {
  prisma.user
    .createMany({
      data: batchCreateData(randomUserData),
    })
    .then(({ count }) => log(`Created ${count} users`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
