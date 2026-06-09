import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PRODUCT_SEEDS } from "../src/data/products.js";
import { getProductAssets } from "../src/lib/product-assets.js";
import bcrypt from "bcryptjs";

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DIRECT_DATABASE_URL or DATABASE_URL is required to run seed. Use a direct PostgreSQL connection string."
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const seed of PRODUCT_SEEDS) {
    const assets = getProductAssets(seed.slug);
    const imageCard = assets?.card ?? seed.imageCard;
    const imageHero = assets?.hero ?? seed.imageHero;
    const imageDetail = assets?.detail ?? seed.imageDetail;

    await prisma.product.upsert({
      where: { slug: seed.slug },
      update: {
        name: seed.name,
        category: seed.category,
        shortDesc: seed.shortDesc,
        description: seed.description,
        features: JSON.stringify(seed.features),
        specs: JSON.stringify(seed.specs),
        scenarios: JSON.stringify(seed.scenarios),
        accessories: JSON.stringify(seed.accessories),
        delivery: JSON.stringify(seed.delivery),
        maintenance: JSON.stringify(seed.maintenance),
        faq: JSON.stringify(seed.faq),
        priceUsd: seed.priceUsd,
        stock: seed.stock,
        imageCard,
        imageHero,
        imageDetail,
      },
      create: {
        slug: seed.slug,
        name: seed.name,
        category: seed.category,
        shortDesc: seed.shortDesc,
        description: seed.description,
        features: JSON.stringify(seed.features),
        specs: JSON.stringify(seed.specs),
        scenarios: JSON.stringify(seed.scenarios),
        accessories: JSON.stringify(seed.accessories),
        delivery: JSON.stringify(seed.delivery),
        maintenance: JSON.stringify(seed.maintenance),
        faq: JSON.stringify(seed.faq),
        priceUsd: seed.priceUsd,
        stock: seed.stock,
        imageCard,
        imageHero,
        imageDetail,
      },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@phonefarm.icu";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "admin",
      name: "Admin",
    },
    create: {
      email: adminEmail,
      name: "Admin",
      role: "admin",
      passwordHash,
    },
  });

  const defaultAdminEmail = "admin@phonefarm.icu";
  if (process.env.ADMIN_EMAIL && adminEmail !== defaultAdminEmail) {
    await prisma.user.deleteMany({ where: { email: defaultAdminEmail } });
  }

  console.log(`Seeded products and admin user (${adminEmail})`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
