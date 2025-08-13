// --- Section templates (plain HTML + Tailwind) ---
const T = {
  hero(appName) {
    return `
<section class="pt-16 pb-20">
  <div class="text-center max-w-3xl mx-auto">
    <div class="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-white/10 bg-white/5 text-xs text-zinc-300">
      <span class="w-1.5 h-1.5 rounded-full" style="background:var(--lux)"></span>
      Luxury design by App Genie
    </div>
    <h1 class="mt-6 text-4xl sm:text-6xl font-black tracking-tight leading-[1.05]">
      Build gorgeous apps <span style="color:var(--lux)">without code</span>
    </h1>
    <p class="mt-5 text-zinc-300 text-lg">Describe your idea. App Genie crafts a premium UI in minutes.</p>
    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
      <a href="#contact" class="px-6 py-3 rounded-xl bg-white text-black font-semibold">Start for free</a>
      <a href="#features" class="px-6 py-3 rounded-xl border border-white/15">See features</a>
    </div>
  </div>
</section>`;
  },

  features() {
    const items = ["Luxury themes", "AI sections", "One-click export"];
    return `
<section id="features" class="pt-6 pb-10">
  <div class="grid sm:grid-cols-3 gap-4">
    ${items
      .map(
        (t) => `
      <div class="lux-card p-6">
        <div class="w-10 h-10 rounded-xl mb-4" style="background:linear-gradient(135deg, var(--lux), transparent)"></div>
        <h3 class="font-semibold mb-1">${t}</h3>
        <p class="text-sm text-zinc-300">Premium visuals and sensible defaults crafted for modern brands.</p>
      </div>`
      )
      .join("")}
  </div>
</section>`;
  },

  pricing() {
    const tiers = ["Starter", "Pro", "Elite"];
    const prices = [0, 29, 99];
    return `
<section id="pricing" class="pt-6 pb-14">
  <div class="grid sm:grid-cols-3 gap-4">
    ${tiers
      .map((t, i) => {
        const hl = i === 1;
        return `
      <div class="lux-card p-6 ${hl ? "gold-glow" : ""}">
        <div class="text-sm text-zinc-400 mb-1">${t}</div>
        <div class="text-3xl font-bold mb-4">$${prices[i]}<span class="text-sm text-zinc-400">/mo</span></div>
        <ul class="text-sm text-zinc-300 space-y-2 mb-6">
          <li>Unlimited projects</li>
          <li>Luxury components</li>
          <li>Exportable code</li>
        </ul>
        <button class="w-full px-4 py-2 rounded-xl ${hl ? "bg-[var(--lux)] text-black" : "border border-white/15"}">Choose ${t}</button>
      </div>`;
      })
      .join("")}
  </div>
</section>`;
  },

  testimonials() {
    return `
<section class="pt-6 pb-14">
  <div class="grid sm:grid-cols-2 gap-4">
    ${[1, 2, 3, 4]
      .map(
        (i) => `
      <div class="lux-card p-6">
        <p class="italic text-zinc-300">“App Genie gave our startup a six-figure look in a weekend.”</p>
        <div class="mt-4 text-sm text-zinc-400">— Happy Founder ${i}</div>
      </div>`
      )
      .join("")}
  </div>
</section>`;
  },

  dashboard() {
    const labels = ["Revenue", "Users", "Sessions", "Conversion"];
    const vals = ["$42k", "3.1k", "12.4k", "3.2%"];
    return `
<section class="pt-6 pb-14">
  <div class="grid sm:grid-cols-4 gap-3">
    ${labels
      .map(
        (t, i) => `
      <div class="lux-card p-5">
        <div class="text-sm text-zinc-400">${t}</div>
        <div class="text-2xl font-bold mt-1">${vals[i]}</div>
      </div>`
      )
      .join("")}
  </div>
</section>`;
  },

  gallery() {
    return `
<section class="pt-6 pb-14">
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
    ${Array.from({ length: 6 })
      .map(
        () =>
          `<div class="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10"></div>`
      )
      .join("")}
  </div>
</section>`;
  },

  cta() {
    return `
<section class="pt-6 pb-14">
  <div class="lux-card p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>
      <h3 class="text-xl font-semibold mb-1">Ready to create in luxury?</h3>
      <p class="text-sm text-zinc-300">Export your project and deploy today.</p>
    </div>
    <a href="#contact" class="px-5 py-3 rounded-xl bg-[var(--lux)] text-black font-semibold">Get App Genie</a>
  </div>
</section>`;
  },
};

// List of selectable sections (id -> generator)
const SECTION_LIST = [
  ["hero", "Hero", T.hero],
  ["features", "Features", T.features],
  ["dashboard", "Dashboard Cards", T.dashboard],
  ["pricing", "Pricing", T.pricing],
  ["testimonials", "Testimonials", T.testimonials],
  ["gallery", "Gallery", T.gallery],
  ["cta", "CTA", T.cta],
];

// Build the full HTML doc for preview/export
function buildDocument({ appName, color, rounded, sections, prompt }) {
  const bodySections = sections
    .map(([id, , fn]) => (id === "hero" ? fn(appName) : fn()))
    .join("\n");

  const radiusCss = rounded === "round" ? "16px" : "8px";

  return `<!doctype html>
<html><head>
  <meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${appName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root{ --lux:${color}; }
    body{ background:#0b0b0f; color:#e5e7eb; }
    .lux-card{ background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); border-radius:${radiusCss}; }
    .gold-glow{ box-shadow:0 0 0 1px rgba(212,175,55,0.28), 0 10px 40px rgba(212,175,55,0.12); }
    .gradient-gold{ 
      background:
        radial-gradient(1200px 600px at 80% -20%, rgba(212,175,55,0.14), transparent 50%),
        radial-gradient(900px 500px at -20% 120%, rgba(212,175,55,0.10), transparent 55%);
    }
    a{ cursor:pointer }
  </style>
</head>
<body class="gradient-gold min-h-screen">
  <header class="sticky top-0 z-40 backdrop-blur-xl bg-black/30 border-b border-white/10">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl" style="background:var(--lux)"></div>
        <div>
          <h1 class="text-lg font-semibold">${appName}</h1>
          <p class="text-xs text-zinc-400">Generated by App Genie</p>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm text-zinc-300">
        <a href="#features" class="hover:text-white">Features</a>
        <a href="#pricing" class="hover:text-white">Pricing</a>
        <a href="#contact" class="hover:text-white">Contact</a>
      </nav>
      <button class="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium">Get Started</button>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-12">
    ${bodySections}
    <section class="lux-card p-8" id="contact">
      <h2 class="text-2xl font-semibold mb-2">Stay in the loop</h2>
      <form class="flex flex-col sm:flex-row gap-3">
        <input placeholder="you@luxury.app" class="flex-1 rounded-xl px-4 py-3 bg-white/5 border border-white/10 outline-none focus:border-[var(--lux)]"/>
        <button class="px-5 py-3 rounded-xl bg-[var(--lux)] text-black font-semibold">Subscribe</button>
      </form>
      <p class="text-xs text-zinc-500 mt-3">Prompt: ${prompt.replace(/`/g,"").slice(0,180)}</p>
    </section>
  </main>

  <footer class="border-t border-white/10 py-10 text-center text-sm text-zinc-400">
    © ${new Date().getFullYear()} ${appName}. Built with ♥ by App Genie.
  </footer>
</body></html>`;
}

function $(id) { return document.getElementById(id); }

function renderSectionCheckboxes() {
  const wrap = $("sections");
  wrap.innerHTML = SECTION_LIST.map(([id, label]) => `
    <label class="flex items-center gap-2 border border-white/10 rounded-xl px-3 py-2">
      <input type="checkbox" data-sec="${id}" class="accent-white/80" ${["hero","features","dashboard","pricing","cta"].includes(id) ? "checked" : ""}/>
      <span class="text-sm">${label}</span>
    </label>
  `).join("");
}

function getSelectedSections() {
  const boxes = [...document.querySelectorAll("input[type='checkbox'][data-sec]")];
  const chosenIds = boxes.filter(b => b.checked).map(b => b.getAttribute("data-sec"));
  return SECTION_LIST.filter(([id]) => chosenIds.includes(id));
}

function updatePreview() {
  const appName = $("appName").value.trim() || "App Genie Project";
  const color = $("accent").value || "#D4AF37";
  const rounded = $("rounded").value; // "round" | "square"
  const prompt = $("prompt").value || "";
  document.documentElement.style.setProperty("--lux", color);

  const html = buildDocument({ appName, color, rounded, sections: getSelectedSections(), prompt });
  $("preview").srcdoc = html;
  $("meta").textContent = `${getSelectedSections().length} sections`;
}

async function exportZip() {
  const appName = $("appName").value.trim() || "App Genie Project";
  const color = $("accent").value || "#D4AF37";
  const rounded = $("rounded").value;
  const prompt = $("prompt").value || "";
  const html = buildDocument({ appName, color, rounded, sections: getSelectedSections(), prompt });

  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file("README.txt",
`# ${appName}
Static site generated by App Genie (Demo).

How to run:
1) Double-click index.html to open in a browser
   - or host the folder on any static host (Vercel, Netlify, GitHub Pages).
`);
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${appName.replace(/\s+/g, "-").toLowerCase()}-site.zip`);
}

function reset() {
  $("appName").value = "App Genie Project";
  $("accent").value = "#D4AF37";
  $("rounded").value = "round";
  $("prompt").value = "Luxury fintech landing with dashboard cards and pricing.";
  renderSectionCheckboxes();
  updatePreview();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderSectionCheckboxes();
  ["appName","accent","rounded","prompt"].forEach(id => $(id).addEventListener("input", updatePreview));
  document.addEventListener("change", (e) => {
    if (e.target && e.target.matches("input[type='checkbox'][data-sec]")) updatePreview();
  });
  $("refresh").addEventListener("click", updatePreview);
  $("reset").addEventListener("click", reset);
  $("exportZip").addEventListener("click", exportZip);
  updatePreview();
});
