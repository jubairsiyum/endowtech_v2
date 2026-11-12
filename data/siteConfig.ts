import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Endow Tech",
  tagline: "Enterprise Software & Digital Product Studio",
  description:
    "Endow Tech is the technology and product engineering wing of Endow Corporation. We build high-performance web applications, student portal systems, and scalable SaaS platforms.",
  url: "https://endowtech.net",
  parentCompany: {
    name: "Endow Corporation",
    url: "https://endowglobaledu.com",
    hq: "Seoul, South Korea",
  },
  contact: {
    email: "hello@endowtech.net",
    phoneDhaka: "+880 1901-463209",
    whatsapp: "https://wa.me/8801901463209",
    whatsappDisplay: "+880 1901-463209",
    schedulerUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2zexcWNE3NziYY_WuRT2fORMic816-dL_sf099AVlqES2rHl27JJdYb5BKtYqNNAYs07YbWFdy?gv=true",
  },
  offices: [
    {
      city: "Seoul",
      country: "South Korea",
      type: "Corporate HQ",
      address: "Gangnam-daero, Seocho-gu, Seoul, Republic of Korea",
      phone: "+82 2-555-0199",
      status: "Active",
    },
    {
      city: "Dhaka",
      country: "Bangladesh",
      type: "Regional Operations & Tech Hub",
      address:
        "Level 8, Shyamoli Square (House 24/1 & 24/2), Mirpur Road, Dhaka-1207",
      phone: "+880 1901-463209",
      status: "Active",
    },
  ],
  socials: {
    github: "https://github.com/endowtech",
    linkedin: "https://linkedin.com/company/endowtech",
    twitter: "https://x.com/endowtech",
  },
};
