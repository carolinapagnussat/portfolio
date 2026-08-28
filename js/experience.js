/*
  Experience data. To add a new role: push a new object onto EXPERIENCE —
  the timeline on the About page renders from this.
*/
const EXPERIENCE = [
  {
    role: "Product Designer | UX/UI",
    org: "Cuia Criativa",
    type: "Contract",
    period: "Aug 2025 — Present",
    bullets: [
      "Design of websites, landing pages, and digital interfaces focused on usability, visual clarity, and conversion.",
      "Brand and campaign systems for national and multinational clients — including Pirelli's incentive program language, C&amp;A's internal sub-brand, Bayer's campaign architecture, and AI-assisted content workflows for Magalu.",
      "Communication and training materials for Incentive.me, including a new training format for app rollout, email campaigns, and strategic assets.",
      "Cross-functional collaboration with marketing, product, and engineering teams across digital products and channels.",
      "Responsible for maintaining visual consistency and brand standards across digital products and communication channels."
    ]
  },
  {
    role: "Product Designer | UX/UI",
    org: "TartariTech",
    type: "Contract",
    period: "May 2024 — Dec 2025",
    bullets: [
      "Led UX/UI for Shopify redesigns, migrations, and CRO across 10+ DTC stores.",
      "Designed the navigation and information architecture for a luxury tableware brand's move to Shopify (~900 SKUs); the store exceeded its first-year revenue projection by ~75%.",
      "Built scalable taxonomies and product-page structures (metafields/metaobjects) made to grow with the catalog.",
      "Collaborated closely with developers, marketing teams, and product stakeholders to ship user-centered, conversion-focused solutions."
    ]
  },
  {
    role: "Co-founder | Product Designer",
    org: "Ludovikas",
    type: "Self-employed",
    period: "Aug 2021 — May 2024",
    bullets: [
      "Co-founded a DTC eCommerce brand and ran the full eCommerce operation — storefront, curation, fulfillment, support.",
      "Designed and launched the Shopify store, including UX architecture, interface, and conversion structure.",
      "Led digital marketing and continuous UX improvements to optimize store performance."
    ]
  },
  {
    role: "Graphic Designer",
    org: "Cadupa Estúdio Criativo",
    type: "Self-employed",
    period: "Mar 2016 — Sep 2025",
    bullets: [
      "Developed visual identities, branding systems, and graphic materials for a range of clients.",
      "Worked on educational design projects including children's books, learning games, and didactic materials."
    ]
  }
];

function renderExperience() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.innerHTML = `
    <div class="timeline-track"></div>
    <div class="timeline-progress" id="timeline-progress"></div>
    ${EXPERIENCE.map((exp) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <p class="period mono">${exp.period}</p>
        <h3>${exp.role}</h3>
        <p class="org">${exp.org} · ${exp.type}</p>
        <ul>
          ${exp.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    `).join("")}
  `;
}

document.addEventListener("DOMContentLoaded", renderExperience);
