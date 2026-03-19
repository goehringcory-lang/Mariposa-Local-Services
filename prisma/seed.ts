import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    {
      name: "Property Maintenance & Handyman Trades",
      slug: "property-maintenance-handyman-trades",
      description: "General handyman, plumbing, concrete & masonry, small engine & equipment repair",
      icon: "wrench",
      sortOrder: 1,
    },
    {
      name: "Land & Vegetation Management",
      slug: "land-vegetation-management",
      description: "Weed abatement, heavy excavation, brush clearing & fire breaks, tree services",
      icon: "tree",
      sortOrder: 2,
    },
    {
      name: "Short-Term Rental & Residential Cleaning",
      slug: "short-term-rental-residential-cleaning",
      description: "STR turnover cleaning, luxury & deep cleaning, routine residential, local property management",
      icon: "sparkles",
      sortOrder: 3,
    },
    {
      name: "Firewood Services",
      slug: "firewood-services",
      description: "Seasoned firewood sales, delivery & logistics, wood splitting & stacking",
      icon: "log",
      sortOrder: 4,
    },
    {
      name: "Pet Care & Animal Sitting",
      slug: "pet-care-animal-sitting",
      description: "Pet sitting & doggy daycare, overnight boarding, dog walking, specialized pet care",
      icon: "pets",
      sortOrder: 5,
    },
    {
      name: "Domestic & Senior Support",
      slug: "domestic-senior-support",
      description: "In-home chore assistance, homemaker services",
      icon: "heart-hand",
      sortOrder: 6,
    },
  ];

  // Remove old categories that are no longer in the new set
  const newSlugs = categories.map((c) => c.slug);
  await prisma.category.deleteMany({
    where: { slug: { notIn: newSlugs } },
  });

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mariposalocalservices.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  });

  console.log("Seed completed: categories and admin user created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
