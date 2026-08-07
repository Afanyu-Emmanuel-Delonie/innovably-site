export type Solution = {
  slug: string;
  name: string;
  accent: string;
  subtitle: string;
  desc: string;
  image: string;
  features: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "eazz-quote",
    name: "EAZZ",
    accent: "QUOTE",
    subtitle: "CRM & CPQ Software",
    desc: "Manage leads, sales opportunities, quotations, approvals, and customer relationships efficiently from one powerful platform.",
    image: "/img/solutions/eazzquote.png",
    features: [
      "Lead & pipeline tracking",
      "Automated quotation & approval workflows",
      "Customer relationship history in one place",
      "Real-time sales reporting",
    ],
  },
  {
    slug: "eazz-books",
    name: "EAZZ",
    accent: "BOOKS",
    subtitle: "Accounting & Finance",
    desc: "Smart financial management for invoicing, expenses, taxation, and business reporting tailored for modern businesses.",
    image: "/img/solutions/eazzbooks.png",
    features: [
      "Invoicing & recurring billing",
      "Expense tracking & approvals",
      "Tax-ready financial reports",
      "Multi-currency support",
    ],
  },
  {
    slug: "eazz-track",
    name: "EAZZ",
    accent: "TRACK",
    subtitle: "Fleet & GPS Management",
    desc: "Monitor, manage, and optimize your vehicles in real time. Reduce fuel costs, improve efficiency, and enhance driver safety.",
    image: "/img/solutions/eazztrack.png",
    features: [
      "Live GPS vehicle tracking",
      "Fuel & maintenance cost monitoring",
      "Driver behavior & safety scoring",
      "Route optimization",
    ],
  },
  {
    slug: "eazz-meetings",
    name: "EAZZ",
    accent: "MEETINGS",
    subtitle: "Virtual Meeting Suite",
    desc: "Automate Meeting Minutes (MoM), generate AI summaries, track action items, and improve team collaboration seamlessly.",
    image: "/img/solutions/eazzmeetings.png",
    features: [
      "AI-generated meeting summaries",
      "Automated minutes & action items",
      "Team collaboration & follow-ups",
      "Searchable meeting history",
    ],
  },
  {
    slug: "eazz-docs",
    name: "EAZZ",
    accent: "DOCS",
    subtitle: "AI Document Intelligence",
    desc: "Securely organize, store, share, and manage your digital documents with advanced version control and workflow management.",
    image: "/img/solutions/eazzdocs.png",
    features: [
      "Secure document storage & sharing",
      "Version control & audit history",
      "AI-powered search & extraction",
      "Custom approval workflows",
    ],
  },
  {
    slug: "eazz-edu",
    name: "EAZZ",
    accent: "EDU",
    subtitle: "Education Management System",
    desc: "Simplify and automate academic, administrative, and communication processes for educational institutions from a centralized platform.",
    image: "/img/solutions/eazzedu.png",
    features: [
      "Student records & admissions",
      "Timetables & attendance",
      "Fees & finance management",
      "Parent-teacher communication",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
