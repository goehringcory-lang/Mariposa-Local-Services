import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    {
      name: "Electricians",
      slug: "electricians",
      description: "Licensed and experienced electricians for residential and commercial work",
      icon: "bolt",
      sortOrder: 1,
    },
    {
      name: "Handymen",
      slug: "handymen",
      description: "General home repairs, maintenance, and odd jobs",
      icon: "wrench",
      sortOrder: 2,
    },
    {
      name: "Vacation Rental Cleaners",
      slug: "vacation-rental-cleaners",
      description: "Professional cleaning services for vacation rentals and homes",
      icon: "sparkles",
      sortOrder: 3,
    },
    {
      name: "Landscaping & Weed Eating",
      slug: "landscaping-weed-eating",
      description: "Yard work, weed eating, brush clearing, and landscaping",
      icon: "leaf",
      sortOrder: 4,
    },
    {
      name: "Plumbers",
      slug: "plumbers",
      description: "Plumbing repairs, installations, and emergency services",
      icon: "droplet",
      sortOrder: 5,
    },
    {
      name: "Mobile Mechanics",
      slug: "mobile-mechanics",
      description: "Auto repair and maintenance that comes to you",
      icon: "truck",
      sortOrder: 6,
    },
    {
      name: "Painters",
      slug: "painters",
      description: "Interior and exterior painting services",
      icon: "paintbrush",
      sortOrder: 7,
    },
    {
      name: "Other Services",
      slug: "other-services",
      description: "Other local services and trades",
      icon: "grid",
      sortOrder: 99,
    },
  ];

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
