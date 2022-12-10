import { Customer, PrismaClient } from "@prisma/client";
import encrypt from "../src/util/encrypt";
const prisma = new PrismaClient();

async function main() {
  // seed here
  // remove all users
  await prisma.customer.deleteMany({});

  await prisma.customer.createMany({
    // @ts-ignore
    data: generateCustomers(),
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const generateCustomers = () => {
  const customers = [];
  for (let i = 0; i < 10; i++) {
    customers.push({
      email: `email${i}@email.com`,
      password: encrypt("123456"),
      name: `Customer${i}`,
      balance: parseFloat((Math.random() * 4000 + 1000).toFixed(2)),
      role: "USER",
      username: `cus${i}`,
      accountNumber: `123456789${i}`,
    });
  }

  return customers;
};
export {};
