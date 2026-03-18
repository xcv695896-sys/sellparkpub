/* Run: node prisma/seed.cjs (after DATABASE_URL + prisma db push) */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.upsert({
    where: { slug: "sample-premium" },
    create: {
      slug: "sample-premium",
      name: "Sample Premium",
      description: "Replace with your real products in admin.",
      priceCents: 999,
      category: "Digital",
    },
    update: {},
  });
  console.log("Seeded sample product.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
