import { LeadPriority, LeadStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const now = new Date();
const day = 24 * 60 * 60 * 1000;

const seeds = [
  {
    fullName: "Amina Rahman",
    email: "amina@northbridge.io",
    phone: "+1 917 555 0131",
    company: "Northbridge Labs",
    source: "Website",
    status: LeadStatus.new,
    value: 18000,
    priority: LeadPriority.high,
    tags: ["ai", "launch"],
    owner: "Matei",
    nextFollowUpAt: new Date(now.getTime() + day),
  },
  {
    fullName: "Theo Carter",
    email: "theo@atelierstudio.co",
    company: "Atelier Studio",
    source: "Referral",
    status: LeadStatus.contacted,
    value: 9000,
    priority: LeadPriority.medium,
    tags: ["branding"],
    owner: "Andra",
    lastContactedAt: new Date(now.getTime() - 2 * day),
    nextFollowUpAt: new Date(now.getTime() + 2 * day),
  },
  {
    fullName: "Sofia Mendes",
    email: "sofia@growthdeck.app",
    company: "GrowthDeck",
    source: "Instagram",
    status: LeadStatus.qualified,
    value: 26000,
    priority: LeadPriority.high,
    tags: ["retainer", "ads"],
    owner: "Matei",
    lastContactedAt: new Date(now.getTime() - day),
    nextFollowUpAt: new Date(now.getTime() + day * 3),
  },
  {
    fullName: "Liam Novak",
    email: "liam@craftgrid.dev",
    company: "CraftGrid",
    source: "Website",
    status: LeadStatus.proposal_sent,
    value: 14000,
    priority: LeadPriority.medium,
    tags: ["website"],
    owner: "Andra",
    lastContactedAt: new Date(now.getTime() - 3 * day),
    nextFollowUpAt: new Date(now.getTime() + day),
  },
  {
    fullName: "Maya Singh",
    email: "maya@vellorahealth.com",
    company: "Vellora Health",
    source: "Referral",
    status: LeadStatus.won,
    value: 32000,
    priority: LeadPriority.high,
    tags: ["healthtech"],
    owner: "Matei",
    lastContactedAt: new Date(now.getTime() - 5 * day),
  },
];

async function main() {
  await prisma.leadNote.deleteMany();
  await prisma.lead.deleteMany();

  for (const lead of seeds) {
    await prisma.lead.create({
      data: {
        ...lead,
        notes: {
          create: [
            { body: "Initial intake completed." },
            { body: "Waiting for follow-up scheduling." },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
