// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

type Category = {
  name: string;
  description: string;
}

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryIndex: number;
  stock: number;
}

type User = {
  name: string;
  email: string;
  password: string;
}

type Order = {
  userIndex: number;
  total: number;
  status: string;
  items: [
    {
      productIndex: number;
      quantity: number;
      price: number;
    }
  ];
};

type Cart = {
  userIndex: number;
  items: [
    {
      productIndex: number;
      quantity: number;
    }
  ];
};

type Wishlist = {
  userIndex: number;
  items: [
    {
      productIndex: number;
    }
  ];
};

type Account = {
  userIndex: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
};

async function main() {
  // Read seed data from JSON file
  const data = JSON.parse(fs.readFileSync("prisma/seedData.json", "utf-8"));

  // Seed Categories
  const categories = await Promise.all(
    data.categories.map((category: Category) =>
      prisma.category.create({
        data: category,
      })
    )
  );

  
  // Seed Products
  const products = await Promise.all(
    data.products.map((product: Product) => {
      const { categoryIndex, ...rest } = product;
      return prisma.product.create({
        data: {
          ...rest,
          categoryId: categories[categoryIndex].id,
        },
      })
    }
    )
  );

  // Seed Users
  const users = await Promise.all(
    data.users.map((user: User) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  // Seed Orders
  const orders = await Promise.all(
    data.orders.map((order: Order) =>
      prisma.order.create({
        data: {
          userId: users[order.userIndex].id,
          total: order.total,
          status: order.status,
          items: {
            create: order.items.map((item) => ({
              productId: products[item.productIndex].id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      })
    )
  );

  // Seed Carts
  await Promise.all(
    data.carts.map((cart: Cart) =>
      prisma.cart.create({
        data: {
          userId: users[cart.userIndex].id,
          items: {
            create: cart.items.map((item) => ({
              productId: products[item.productIndex].id,
              quantity: item.quantity,
            })),
          },
        },
      })
    )
  );

  // Seed Wishlists
  await Promise.all(
    data.wishlists.map((wishlist: Wishlist) =>
      prisma.wishlist.create({
        data: {
          userId: users[wishlist.userIndex].id,
          items: {
            create: wishlist.items.map((item) => ({
              productId: products[item.productIndex].id,
            })),
          },
        },
      })
    )
  );

  // Seed Accounts
  await Promise.all(
    data.accounts.map((account: Account) =>
      prisma.account.create({
        data: {
          userId: users[account.userIndex].id,
          firstName: account.firstName,
          lastName: account.lastName,
          address: account.address,
          phone: account.phone,
        },
      })
    )
  );

  console.log("Database seeded successfully with JSON data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
