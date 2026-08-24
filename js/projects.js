/*
  Single source of truth for all case studies.
  To add a new project: push a new object here. The homepage index list
  and the case-study template both render from this array.
*/
const PROJECTS = [
  {
    slug: "celadon",
    tag: "Featured",
    company: "Celadon",
    year: "2025",
    title: "Celadon",
    theme: "From physical retail to Shopify eCommerce — luxury tableware, ~900 SKUs, first-year revenue ~75% above projection.",
    thumb: "assets/celadon-hover.jpg",
    disciplines: ["UX Strategy", "Information Architecture", "Shopify"],
    facts: { role: "UX/UI Designer", timeline: "5 months · 2025", team: "Branding [Cuia Co.] | Development [<a href='https://www.tartaritech.com.br/' target='_blank' rel='noopener'>TartariTech</a>]" },
    cover: { src: "assets/celadon-hero.jpg", note: "Hero — the live Celadon storefront homepage (desktop): brand identity + curated luxury tableware, setting the premium tone for the whole case." },
    overview: "Celadon is a premium Brazilian tableware brand carrying luxury pieces from 20 international labels. In early 2025 it moved from physical retail into eCommerce for the first time — launching on Shopify with ~900 SKUs across dozens of product types, materials, and brand collections. I led the UX and information architecture end to end, and contributed to the Shopify management.",
    sections: [
      {
        heading: "Context",
        body: [
          "Celadon was entering eCommerce for the first time, moving a physical-retail catalog of luxury tableware onto Shopify.",
          "The team was lean and cross-functional — one branding designer, one developer, and one UX/UI designer (me). Every decision had to be aligned between all three before it reached the client."
        ],
        media: { type: "single", src: "assets/celadon-context.jpg", note: "Brand / lifestyle photo — a styled Celadon table setting that conveys the luxury positioning and the world the navigation had to live up to." }
      },
      {
        heading: "The core problem",
        quote: [
          "How do you make ~900 luxury products feel organized, discoverable, and true to the brand — without overwhelming the customer?",
          "And how do you build it to grow — a taxonomy that scales with the catalog, without losing the structural strategy?"
        ],
        body: [
          "The catalog was a structural puzzle: 85 product types, 20 luxury brands, 101 brand collections, 29 materials, 37 colors — all in the same niche, but serving customers with very different shopping behaviors. Some knew exactly what they wanted; others were shopping by occasion or aesthetic feeling.",
          "At the same time, the brand identity was strong and specific. The navigation language couldn't just be functional — it had to carry Celadon's world of curated sophistication."
        ],
        media: { type: "single", src: "assets/celadon-catalog.jpg", note: "Screenshot — the full catalog grid, showing the density and breadth of ~900 SKUs the structure had to tame." }
      },
      {
        heading: "Key challenges",
        points: [
          { title: "Brand vision vs. UX reality", text: "The branding designer proposed renaming “Products” to “Gallery,” drawn from Celadon's concept of curation as art. Poetic — but it would fail users scanning for tableware or barware, and undermine SEO for the categories Celadon needed to rank for. I defended functional clarity with reasoning and examples; we kept the clear naming and wove the brand language in elsewhere — the Collections entry point, product-page copy, and storytelling across the navigation." },
          { title: "Multiple customer mental models", text: "Luxury shoppers don't all navigate the same way — some think by occasion (“I'm hosting a dinner”), some by product type (“a set of wine glasses”), some by brand loyalty. One rigid structure wouldn't serve them equally." },
          { title: "Scale and long-term taxonomy", text: "The structure had to work at launch and as the catalog grew — categorization logic that was scalable and maintainable, embedded in the product-page architecture, not just the menu. Within Shopify, I built this with metafields and metaobjects: product types, materials, finishes, collections, and other attributes were defined as structured, reusable data rather than one-off tags. That let the taxonomy and filters expand as new products and brands were added, without reworking the navigation or rebuilding product pages each time." }
        ]
      },
      {
        heading: "Navigation architecture",
        body: [
          "The solution: three parallel entry points into the catalog, each serving a distinct mental model — while holding brand alignment through intentional naming and language."
        ],
        points: [
          { title: "Collections", text: "Brand-aligned Portuguese verbs — Servir, Brindar, Decorar, Perfumar (to serve, to offer, to decorate, to perfume) — to shop by the experience or occasion in mind." },
          { title: "Products", text: "Clear, SEO-optimized categories — Tableware, Barware, Decoration, Perfumery — for customers with a specific item in mind." },
          { title: "Brands", text: "20 luxury labels, each its own subcategory, for loyal customers who already shop by name." }
        ],
        media: { type: "stack", items: [
          { src: "assets/celadon-nav-collections.jpg", caption: "Collections — brand-aligned verbs (Servir · Brindar · Decorar · Perfumar) to shop by occasion." },
          { src: "assets/celadon-nav-products.jpg", caption: "Products — clear, SEO-optimized categories (Mesa · Bar · Decoração · Perfumaria) for shoppers with a specific item in mind." },
          { src: "assets/celadon-nav-brands.jpg", caption: "Brands — 20 luxury labels, each its own subcategory, for customers who shop by name." }
        ] }
      },
      {
        heading: "Filter system",
        body: [
          "Within each category, customers could narrow hundreds of products through a structured filter taxonomy — built to support discovery without creating decision fatigue: product type (85), material (29), color (37), brand (20), price, collection (101), and availability.",
          "The 101 brand collections mattered most: each luxury brand has its own collections, and many loyal customers search by collection name directly. Without that filter, they simply wouldn't find what they came for."
        ],
        media: { type: "row", items: [
          { src: "assets/celadon-filter-panel.jpg" },
          { src: "assets/celadon-filter-collection.jpg" },
          { src: "assets/celadon-filter-results.jpg" }
        ] }
      },
      {
        heading: "Product page design",
        body: [
          "The IA thinking extended beyond navigation into the product page itself. Each PDP was structured to reduce friction at the moment of the purchase decision:"
        ],
        points: [
          { title: "Shipping info near the CTA", text: "Trust-building content placed right by the buy button to reduce purchase anxiety." },
          { title: "Structured specifications", text: "Color, material, finish, diameter, capacity, weight — organized for scannability." },
          { title: "Usage & care information", text: "Relevant for luxury buyers making a considered purchase." },
          { title: "“Complete your table”", text: "A contextual upsell that lifts average order value while staying true to the brand world." }
        ],
        media: { type: "single", src: "assets/celadon-pdp.jpg", note: "Full PDP layout — gallery, specifications, usage & care, and the “Complete your table” upsell." }
      },
      {
        heading: "Outcome",
        points: [
          { title: "First-year revenue ~75% above projection", text: "The online store's first year came in roughly 75% over its initial revenue target — a strong result for a brand's first move into eCommerce." },
          { title: "Zero structural revision requests from the client", text: "For a ~900-SKU store with complex taxonomy, that signals the system worked as intended from launch." },
          { title: "A scalable taxonomy", text: "Embedded in metafields and product-page architecture — built to grow without a structural redesign." }
        ],
        footnote: "A note on attribution: navigation-specific metrics weren't isolated, so the revenue reflects the full project. But a broken structure would have directly limited discoverability and conversion for a catalog of this scale.",
        media: { type: "single", src: "assets/celadon-outcome.jpg", note: "Screenshot — the live Celadon storefront at launch (homepage or a category page), as the closing proof of the shipped work." }
      }
    ]
  },
  {
    slug: "studio-ima",
    tag: "UX Audit",
    company: "Studio Ímã",
    year: "2026",
    title: "Studio Ímã",
    theme: "A full UX audit, redesign, and Shopify migration for an authorial jewelry brand — turning a poor eCommerce experience into a store ready to convert.",
    thumb: "assets/studio-ima-hover.jpg",
    disciplines: ["UX Strategy", "UX Audit", "Redesign", "Shopify Migration"],
    facts: { role: "UX/UI Designer", timeline: "4 months · 2026", team: "Branding [Dani Karnas] | Development [<a href='https://www.tartaritech.com.br/' target='_blank' rel='noopener'>TartariTech</a>]" },
    cover: { src: "assets/studio-ima-hero.jpg", note: "Hero — the rebuilt Studio Ímã storefront homepage (the new “front door”): the authorial-jewelry brand, “Peças únicas. Feitas à mão.”" },
    overview: "Studio Ímã is an authorial jewelry brand — each piece handmade and unique, built through a reverse-creation process from recycled tiles, glass, and brass. Its previous store was a poor eCommerce experience that hid the value of the work. I led the UX end to end — the UX audit and redesign — and contributed to the Shopify migration and the store management. I worked closely with the brand strategist and brand designer so the UX structure and the brand language reinforced each other, and grounded every recommendation in what was actually buildable on Shopify — so the audit became the agreed blueprint for everything the new site would do.",
    sections: [
      {
        heading: "The core problem",
        quote: "The experience began at the bottom of the funnel: visitors landed at the decision stage, without ever passing through discovery, connection, or trust.",
        body: [
          "For an authorial brand, its value is its meaning — the process, the materials, the story, the uniqueness of each piece. Skip the steps where that meaning is built, and the work reads as ordinary, flattening perceived value and raising price sensitivity. The audit reordered the journey to rebuild those earlier steps, so visitors could understand the value of the work."
        ],
        media: { type: "single", src: "assets/studio-ima-old-store.jpg", note: "The old Studio Ímã store — a glimpse of the previous eCommerce experience that dropped visitors straight at the decision stage." }
      },
      {
        heading: "The diagnosis",
        body: [
          "The audit covered nine touchpoints. Rather than treat them as nine separate problems, I read them as four breaks in a single journey — each a place where the experience failed to build meaning before asking for a decision."
        ],
        points: [
          { title: "1 · No front door", text: "The store opened directly onto a product-listing page — there was no homepage at all, and no search bar. A visitor who knew what they wanted couldn't search; one who wanted to explore had nowhere to start." },
          { title: "2 · Exploration without control", text: "Category pages had no filters, breadcrumbs, product counts, or quick view — browsing that gets harder as the catalog grows. And collection pages — an authorial brand's primary branding asset — were stripped of any narrative or concept." },
          { title: "3 · Meaning scattered", text: "The brand's richest asset — its story of materials, process, and origin — lived on the “Sobre” page as an unstructured stream. Strong, authentic content, but with no hierarchy, no journey, and no connection to the rest of the store." },
          { title: "4 · Decision without confidence", text: "At the moment of decision, the store gave the least support: a bare technical description with no storytelling to justify a one-of-a-kind price, no social proof, no in-context imagery, no delivery or returns clarity near the CTA, no related products. The cart had the same gaps. The two stages where confidence matters most offered the least." }
        ],
        media: { type: "single", video: true, src: "assets/studio-ima-audit.mp4", note: "The full UX audit walkthrough — the audited store's breaks: no homepage, no filters, the scattered “Sobre” page, and the bare product page." }
      },
      {
        heading: "Key reasoning moments",
        points: [
          { title: "The homepage: narrative as a conversion mechanism", text: "I specified a modular, scannable narrative — concept, curated highlights, process and added value, a featured collection, trust and social proof, closing on newsletter — where each block hands the visitor a concrete next action.", media: { type: "single", note: "The redesigned homepage — the modular narrative sequence (concept → highlights → process → featured collection → trust → newsletter). To be added at launch." } },
          { title: "Filters to restore control at the exploration stage", text: "The old store gave no way to narrow or sort the catalog. I gave the collection a structured filter set — availability, price, collection, type, materials, and tone — so visitors can explore on their own terms. It's built on Shopify metafields, so each attribute is structured and reusable data — consistent to filter on and simple to maintain. Materials and tone matter most here: for a brand built from recycled tiles, glass, and brass, letting people shop by what a piece is made of turns filtering into an extension of the brand's story, not just a utility.", media: { type: "single", note: "The collection page with its full filter set — availability, price, collection, type, materials, and tone — plus sort and a live product count." } },
          { title: "PDP storytelling to make price legible", text: "Enriched the description with each piece's inspiration, process, and uniqueness, backed by well-produced images and videos — plus specific product detail, care guidance, and practical reassurance like shipping, returns, and social proof. For a one-of-a-kind piece, that's the baseline of a PDP that converts.", media: { type: "single", note: "The redesigned product page — enriched story (inspiration, process, uniqueness), images and videos, product detail, care, and reassurance (shipping, returns, social proof). To be added at launch." } },
          { title: "The About section restructured into a brand hub", text: "The single About section was split into three dedicated pages — A Studio Ímã (About us), Da Matéria à Forma (from matter to form), and Materiais e Cuidados (Materials & Care). A deliberate SEO and navigation-depth play: independent, well-structured pages strengthen discoverability and turn brand content into navigable entry points.", media: { type: "single", note: "The About content split into three pages — A Studio Ímã (About us), Da Matéria à Forma, and Materiais e Cuidados. To be added at launch." } }
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The redesign reverses the store's original problem: an experience that once opened at the decision stage now earns it — giving visitors the context to understand a piece's value and pay its price.",
          "Because it's a new launch, the proof today is qualitative: the store finally reads as premium and authorial, aligned to the value of the work. The numbers it was designed to earn are what the next phase will measure."
        ],
        media: { type: "single", note: "The rebuilt store, live — the new homepage, enriched product pages, and the restructured About hub across the key touchpoints." }
      }
    ]
  },
  {
    slug: "demuda",
    tag: "MVP",
    company: "Demudá",
    year: "2026",
    title: "Demudá",
    theme: "A high-end bridal resale MVP — built to test an idea without looking like a test.",
    thumb: "assets/demuda-hover.jpg",
    disciplines: ["UX/UI Design", "MVP Strategy", "eCommerce"],
    facts: { role: "UX/UI Designer", timeline: "4 months · 2026", team: "Branding & Strategy [Cuia Co.]" },
    cover: { src: "assets/demuda-hero.jpg", note: "Hero — the live Demudá storefront homepage: curated high-end bridal resale, positioned away from “second-hand,” with a premium tone." },
    overview: "Demudá is a curated resale platform for high-end bridal dresses. It began with an idea and no business plan — only a strong concept and a client who wanted to know whether the market would respond before investing heavily. In a two-person team, we designed the system, and I designed the platform end-to-end — how the idea would function as a working store within the constraints.",
    sections: [
      {
        heading: "Context",
        body: [
          "Each dress is selected, the price point is high, and the brand rests on careful curation. The client wanted to test the concept before investing heavily — so the first two to three months went into defining the business with them, surfacing constraints, and teaching the client how eCommerce actually works."
        ],
        media: { type: "single", src: "assets/demuda-context.jpg", note: "Hero / brand shot — the Demudá storefront homepage, or a curated bridal-dress image that sets the high-end, curated tone." }
      },
      {
        heading: "The core problem",
        quote: "How do you build an MVP store for a high-ticket audience that doesn't look cheap?",
        body: [
          "Two constraints pulled in opposite directions. The client wanted to spend as little as possible — the whole point was to test the idea first. But the result couldn't look like a test: the buyers are high-ticket brides making an expensive, emotional, one-of-a-kind purchase, and a storefront that signalled “MVP” would erode the very perception of value the brand depended on.",
          "So the real work wasn't “build something cheap to test the idea.” A cheap-looking store wouldn't give the idea a fair test — it would only prove that a cheap store doesn't sell. The task was to build an MVP store that doesn't look like an MVP store and could still feel credible enough to validate the concept honestly."
        ]
      },
      {
        heading: "Reframing the brief",
        body: [
          "The brief arrived with a solution already attached: sell through Instagram Shop, take payment over WhatsApp. Rather than execute it directly, I treated the proposed solution as an assumption to test.",
          "Researching the Instagram Shop route surfaced a gap: in Brazil, running an Instagram Shop requires products connected to a catalog — which means an underlying eCommerce structure has to exist regardless. The idea assumed a storefront could be skipped, when in fact a storefront was the foundation everything else would sit on. The brief described a sales channel; the project actually needed a credible storefront underneath it."
        ],
        footnote: "Naming that distinction up front reset the project on solid footing, prevented a costly detour later, and made the platform and budget decisions that followed coherent rather than reactive."
      },
      {
        heading: "Building the MVP credible store",
        body: [
          "With an eCommerce base established as a requirement, the question became which platform could protect the budget without looking cheap. Two decisions defined the answer."
        ],
        points: [
          { title: "Considered first — Shopify", text: "Set aside: the entry plan was hard to justify for a project whose entire purpose was low-cost validation." },
          { title: "Chosen — Nuvemshop", text: "A free starting point with a clear path to grow — right for an MVP that needed to begin small but not be rebuilt later if it worked." },
          { title: "The domain, argued back in", text: "Nuvemshop's free plan doesn't allow a custom domain — that needs the paid Basic plan at R$69/month. we made the case that a branded domain was non-negotiable for this audience: for a high-ticket buyer deciding whether to trust an unknown brand, the address bar itself is a credibility signal." }
        ]
      },
      {
        heading: "Designing the constraint into the experience",
        body: [
          "A full payment integration was outside the MVP's budget, so checkout would happen over WhatsApp. On a high-ticket store, an off-platform conversational checkout is exactly the kind of detail that can read as “this isn't a real business.” The response wasn't to hide it, but to design it into the brand — making the WhatsApp path explicit and consistently framed as easy, trustworthy, and human:"
        ],
        points: [
          { title: "Announcement bar", text: "A homepage banner stating that purchases are completed through WhatsApp — setting expectations before the customer reaches a product." },
          { title: "CTA button on the product page", text: "The purchase action itself — with an explicit “Buy through WhatsApp” positioned and worded to feel like the start of a guided, human conversation." },
          { title: "“How it works” storytelling", text: "FAQ, About, and a dedicated How It Works page explain the process and reinforce it as easy, trustworthy, and human." },
          { title: "Reinforced near the footer", text: "The WhatsApp path repeated at the bottom of the page, so the route is never more than a glance away." }
        ],
        close: "The constraint was reframed into something that fit the brand: a curated, high-touch, concierge purchase.",
        media: { type: "row", items: [
          { src: "assets/demuda-store.mp4", video: true, alt: "The live Demudá storefront, browsed on mobile" },
          { src: "assets/demuda-cta.jpg" },
          { src: "assets/demuda-whatsapp.jpg" }
        ] }
      },
      {
        heading: "Scoping a two-sided product",
        body: [
          "Demudá serves both buyers and sellers, but the supply side was scoped down on purpose. The demand side was built fully; the seller side was kept manual and told as part of the brand story."
        ],
        points: [
          { title: "Buyers — built fully", text: "Curated catalog and product pages, trust storytelling across the store, the WhatsApp purchase path, and complete policies, FAQ, and How It Works." },
          { title: "Sellers — kept manual", text: "Real dresses from brides at launch, an application form to list a dress, and a curation & acceptance step — no seller dashboard, by design." }
        ],
        footnote: "The acceptance gate is told as part of the brand story — “being accepted” reinforces the curation that justifies the price. A genuinely two-sided funnel, expressed through narrative and a simple application flow, without the cost of building a seller dashboard for a model that hadn't been validated yet.",
        media: { type: "single", src: "assets/demuda-seller.jpg", note: "The seller side — the “apply to list your dress” application form and the curation/acceptance step." }
      },
      {
        heading: "Designing the learning system",
        quote: "Launch is the beginning, not the end. Change should come from numbers, not assumptions.",
        body: [
          "Choosing WhatsApp for checkout solved the budget problem but created a measurement one: the decisive moment of the funnel now happens off the platform, in a conversation the store's own analytics can't see. Left unaddressed, the MVP could take orders without ever explaining why people did or didn't buy.",
          "To close that gap, I proposed and drove a measurement framework end to end — a structured KPI system that tracks each lead as a started conversation, with conversation stages, abandonment reasons, response times, interest type, and sale outcomes, rolling up into a dashboard, a first-100-conversations analysis, and a six-month review. It was built to answer the questions that actually decide the business's future: does the idea generate real market interest, is the problem acquisition or conversion, and is any bottleneck about price, clarity, service, or value proposition."
        ],
        footnote: "Because the client chose to handle the purchase over WhatsApp, the responsibility to measure it is theirs. The store and the KPI structure were delivered together for exactly that reason — when the data shows what needs to change and why, the next round of work has a foundation to stand on.",
        media: { type: "single", video: true, src: "assets/demuda-kpi.mp4", note: "The KPI framework — the conversation-tracking dashboard / measurement structure." }
      },
      {
        heading: "Outcome",
        body: [
          "The client's reaction was that it read as a real eCommerce store, with no changes requested at delivery — for a project defined by the tension between minimum spend and premium perception, the clearest available signal that the balance held.",
          "The result was a complete, credible, publicly live storefront, delivered end to end by a two-person team alongside the measurement system to learn from it. The store is now in the client's hands to run and measure, entering the validation phase the MVP exists to serve."
        ],
        media: { type: "single", src: "assets/demuda-outcome.jpg", note: "The live Demudá storefront at launch — homepage or a product page, as closing proof of the shipped work." }
      },
      {
        heading: "Validation phase — in progress",
        body: [
          "The store is now live and gathering its first conversations. As the KPI framework produces data, this case will be updated with the market-interest signal, conversion and acquisition findings, key objections, and the resulting decision — optimise, adjust, maintain, or pivot.",
          "No performance results are claimed yet — by design, this is the phase the MVP was built to measure. A connected Instagram Shop remains a possible future channel rather than a current dependency."
        ]
      }
    ]
  },
  {
    slug: "chibinski",
    tag: "Repositioning",
    company: "Chibinski",
    year: "2024",
    title: "Chibinski",
    theme: "From generalist footwear to a bridal & party niche — a Shopify redesign and SEO strategy that hit its annual revenue goal, with ~10% average YoY growth since.",
    thumb: "assets/chibinski-hover.jpg",
    disciplines: ["UX/UI Design", "Information Architecture", "SEO", "Shopify"],
    facts: { role: "UX/UI Designer", timeline: "2 months · 2024", team: "Development & SEO [<a href='https://www.tartaritech.com.br/' target='_blank' rel='noopener'>TartariTech</a>]" },
    cover: { src: "assets/chibinski-hero.jpg", note: "Hero — the redesigned Chibinski storefront homepage, showing the more sophisticated visual language and the bridal & party positioning." },
    overview: "Chibinski is a Brazilian footwear brand competing in one of the most crowded categories in eCommerce. In 2024 I redesigned its Shopify store — a more sophisticated visual language and a new layout — but the decisive move was strategic: repositioning the brand from a generalist “all kinds of shoes” store into a focused niche, bridal & party footwear, so a smaller brand could become a reference instead of a face in the crowd.",
    sections: [
      {
        heading: "The core problem",
        quote: "How does a smaller footwear brand stand out in a market crowded with giants — without competing head-on on price, breadth, or budget?",
        body: [
          "Chibinski is a footwear brand selling on Shopify. The store needed a redesign — a more sophisticated look and a layout that matched the brand's ambitions — but it was competing against household-name brands with far bigger budgets and reach.",
          "Trying to be “a store for every kind of shoe” put Chibinski in direct, unwinnable competition with those giants. The redesign couldn't just look better; it had to make the brand stand for something specific."
        ],
        media: { type: "single", video: true, src: "assets/chibinski-context.mp4", note: "A brand / lifestyle video that sets the new, more sophisticated tone." }
      },
      {
        heading: "From generalist to a niche",
        body: [
          "The turning point was reframing the brief from “redesign the store” to “decide what this store is for.”",
          "Working with the brand, we repositioned Chibinski from a general “all kinds of shoes” store into a focused niche: bridal & party footwear. Instead of one more generalist competing on the giants' terms, Chibinski could become the reference for a specific, high-intent occasion."
        ]
      },
      {
        heading: "Making the niche real",
        body: [
          "A new position only works if the whole store expresses it — in what the brand says, how the catalog is organized, and how customers find it in the first place."
        ],
        points: [
          { title: "Storytelling", text: "Rewrote the store's narrative — homepage, collections, and brand copy — around the bridal & party occasion, so the experience speaks to someone choosing shoes for their wedding or a celebration." },
          { title: "Category architecture", text: "Reorganized the catalog around the niche: categories and collections framed by occasion and moment rather than a flat list of shoe types, making the bridal & party focus the spine of the navigation instead of a buried subcategory." },
          { title: "SEO", text: "Worked with TartariTech to restructure the site's SEO around the niche's real search terms, so Chibinski could rank and be discovered for bridal & party footwear specifically — competing where it could win, instead of fighting the giants for generic “shoes” traffic." }
        ],
        media: { type: "single", src: "assets/chibinski-nav.jpg", note: "The reorganized navigation / category structure — the bridal & party niche made into the spine of the catalog (the menu or a collections overview)." }
      },
      {
        heading: "The redesign",
        body: [
          "With the positioning set, the redesign gave it a home. I refreshed the visual language toward greater sophistication and redesigned the store layout to fit the brand's audience — a more considered, editorial shopping experience aligned with the bridal & party world."
        ],
        media: { type: "stack", items: [
          { src: "assets/chibinski-context.jpg", note: "The redesigned homepage — the new visual language and layout, leading with the bridal & party positioning." },
          { src: "assets/chibinski-pdp.mp4", video: true, note: "A redesigned product page (PDP) — the elevated visual language at the point of the purchase decision." }
        ] }
      },
      {
        heading: "Outcome",
        points: [
          { title: "Hit the annual revenue goal", text: "The redesign and the niche-focused SEO together supported the repositioned Chibinski in reaching its annual revenue target for the year." },
          { title: "~10% average YoY growth since", text: "Since the redesign and its niche SEO, the store has kept growing steadily, averaging roughly 10% year-over-year." },
          { title: "A defensible position", text: "Beyond the numbers, Chibinski moved from competing head-on with giants to owning a niche it could credibly lead — a foundation that compounds over time." }
        ],
        footnote: "A note on attribution: revenue and growth reflect the whole brand and market, not the redesign alone. But repositioning around a focused niche — expressed through storytelling, category structure, and SEO — gave a smaller brand a space it could actually win, and a store built to convert the customers who came for it."
      }
    ]
  }
];

function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

function getAdjacentProjects(slug) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return { prev, next };
}
