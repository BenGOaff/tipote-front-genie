// ─── Content Interfaces ──────────────────────────────────────────

export interface CaptureContent {
  headline: string;
  subtitle: string;
  bullets: string[];
  ctaText: string;
  proofText?: string;
}

export interface SalesContent {
  headline: string;
  subtitle: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  benefits: string[];
  testimonials: { name: string; text: string }[];
  offerTitle: string;
  offerItems: string[];
  bonuses: string[];
  guarantee: string;
  ctaText: string;
  faq: { q: string; a: string }[];
  urgencyText?: string;
}

// ─── Themes ──────────────────────────────────────────────────────

interface TemplateTheme {
  id: string;
  name: string;
  fontBody: string;
  fontHeading: string;
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentText: string;
  cardBg: string;
  cardBorder: string;
  heroOverlay?: string;
  googleFonts?: string;
}

const themes: Record<string, TemplateTheme> = {
  luxe: {
    id: "luxe",
    name: "Luxe",
    fontBody: "'Montserrat', sans-serif",
    fontHeading: "'Playfair Display', serif",
    bg: "#0a0a0a",
    bgAlt: "#141414",
    text: "#f5f0e8",
    textMuted: "#a89f91",
    accent: "#c9a84c",
    accentHover: "#d4b85c",
    accentText: "#0a0a0a",
    cardBg: "rgba(201,168,76,0.06)",
    cardBorder: "rgba(201,168,76,0.2)",
    heroOverlay: "linear-gradient(135deg, rgba(10,10,10,0.92), rgba(20,20,20,0.88))",
    googleFonts: "Playfair+Display:wght@400;700&family=Montserrat:wght@400;500;600;700",
  },
  modern: {
    id: "modern",
    name: "Modern",
    fontBody: "'Inter', sans-serif",
    fontHeading: "'Inter', sans-serif",
    bg: "#ffffff",
    bgAlt: "#f8fafc",
    text: "#0f172a",
    textMuted: "#64748b",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    accentText: "#ffffff",
    cardBg: "#f1f5f9",
    cardBorder: "#e2e8f0",
    googleFonts: "Inter:wght@400;500;600;700;800",
  },
  fresh: {
    id: "fresh",
    name: "Fresh",
    fontBody: "'Poppins', sans-serif",
    fontHeading: "'Poppins', sans-serif",
    bg: "#ffffff",
    bgAlt: "#fef9f0",
    text: "#1a1a2e",
    textMuted: "#6b7280",
    accent: "#f97316",
    accentHover: "#ea580c",
    accentText: "#ffffff",
    cardBg: "#fff7ed",
    cardBorder: "#fed7aa",
    heroOverlay: "linear-gradient(135deg, #667eea22, #764ba222)",
    googleFonts: "Poppins:wght@400;500;600;700;800",
  },
  zen: {
    id: "zen",
    name: "Zen",
    fontBody: "'Lora', serif",
    fontHeading: "'Cormorant Garamond', serif",
    bg: "#faf5ef",
    bgAlt: "#f0ebe3",
    text: "#3d3229",
    textMuted: "#8b7e74",
    accent: "#6b705c",
    accentHover: "#5a5f4e",
    accentText: "#ffffff",
    cardBg: "rgba(107,112,92,0.06)",
    cardBorder: "rgba(107,112,92,0.2)",
    googleFonts: "Cormorant+Garamond:wght@400;600;700&family=Lora:wght@400;500;600",
  },
  bold: {
    id: "bold",
    name: "Bold",
    fontBody: "'Space Grotesk', sans-serif",
    fontHeading: "'Space Grotesk', sans-serif",
    bg: "#0f0f1a",
    bgAlt: "#1a1a2e",
    text: "#eef0f2",
    textMuted: "#9ca3af",
    accent: "#e94560",
    accentHover: "#d63851",
    accentText: "#ffffff",
    cardBg: "rgba(233,69,96,0.08)",
    cardBorder: "rgba(233,69,96,0.25)",
    heroOverlay: "linear-gradient(135deg, rgba(15,15,26,0.95), rgba(26,26,46,0.9))",
    googleFonts: "Space+Grotesk:wght@400;500;600;700",
  },
};

// ─── Template → Theme mapping ────────────────────────────────────

export const templateThemeMap: Record<string, string> = {
  "capture-ads": "modern",
  "dream-team": "luxe",
  "feel-good": "zen",
  "simple-orange": "modern",
  "up-to-challenge": "bold",
  "mega-event": "bold",
  "golden-business": "luxe",
  "click-tunnel": "modern",
  "banger": "fresh",
  "e-learning": "modern",
  "fresh": "fresh",
  "funnel-100k": "luxe",
  "funnel-fan": "bold",
  "funny-sales": "fresh",
  "loose-weight": "zen",
  "sweet-zen": "zen",
  "video-master": "bold",
  "blog-coach": "zen",
};

// ─── Lorem Ipsum Defaults ────────────────────────────────────────

export const defaultCaptureContent: CaptureContent = {
  headline: "Découvrez La Méthode Qui Va Transformer Votre Quotidien",
  subtitle: "Rejoignez plus de 2 000 personnes qui ont déjà changé leur vie grâce à cette approche simple et éprouvée.",
  bullets: [
    "Accédez à une formation complète en 5 modules",
    "Obtenez des résultats visibles dès la première semaine",
    "Profitez d'un accompagnement personnalisé et bienveillant",
    "Rejoignez une communauté active et motivante",
  ],
  ctaText: "Je veux accéder gratuitement →",
  proofText: "★★★★★ Recommandé par +2 000 personnes",
};

export const defaultSalesContent: SalesContent = {
  headline: "Arrêtez De Perdre Du Temps — Voici La Solution Qui Change Tout",
  subtitle: "La méthode pas-à-pas pour atteindre vos objectifs sans sacrifier votre bien-être.",
  problemTitle: "Vous en avez assez de…",
  problemText: "Vous avez tout essayé. Les formations, les livres, les conseils. Mais rien ne semble fonctionner durablement. Vous stagnez, vous vous épuisez, et la frustration grandit chaque jour.",
  solutionTitle: "Il existe une meilleure approche",
  solutionText: "Notre méthode a été développée après 8 ans de recherche et testée auprès de milliers de personnes. Elle repose sur 3 piliers fondamentaux qui garantissent des résultats concrets et durables.",
  benefits: [
    "Un plan d'action clair et structuré étape par étape",
    "Des outils concrets utilisables immédiatement",
    "Un suivi personnalisé pour ne jamais rester bloqué",
    "L'accès à une communauté de pairs motivés",
    "Des résultats mesurables dès les 7 premiers jours",
    "Une garantie satisfait ou remboursé de 30 jours",
  ],
  testimonials: [
    { name: "Marie D.", text: "En seulement 3 semaines, j'ai vu une transformation incroyable. Je recommande à 100% !" },
    { name: "Thomas L.", text: "Sceptique au départ, je suis maintenant convaincu. Les résultats parlent d'eux-mêmes." },
    { name: "Sophie R.", text: "La meilleure décision que j'ai prise cette année. Merci pour cette méthode exceptionnelle !" },
  ],
  offerTitle: "Ce que vous obtenez aujourd'hui",
  offerItems: [
    "Formation complète en 8 modules vidéo (valeur 497€)",
    "Workbook pratique de 60 pages (valeur 97€)",
    "Accès à la communauté privée à vie (valeur 297€)",
    "3 sessions de coaching de groupe par mois (valeur 597€)",
    "Mises à jour gratuites à vie (inestimable)",
  ],
  bonuses: [
    "BONUS #1 : Masterclass exclusive « Les 10 erreurs à éviter » (valeur 197€)",
    "BONUS #2 : Templates et check-lists prêts à l'emploi (valeur 97€)",
    "BONUS #3 : Accès prioritaire aux futurs programmes (inestimable)",
  ],
  guarantee: "Garantie 100% satisfait ou remboursé pendant 30 jours. Aucun risque pour vous.",
  ctaText: "Oui, je veux transformer ma vie →",
  faq: [
    { q: "Combien de temps faut-il pour voir des résultats ?", a: "La plupart de nos membres voient des résultats dès la première semaine. Les transformations profondes se manifestent entre 3 et 6 semaines." },
    { q: "Est-ce adapté aux débutants ?", a: "Absolument ! La méthode est conçue pour être accessible à tous, quel que soit votre niveau de départ." },
    { q: "Combien de temps dure l'accès ?", a: "Vous bénéficiez d'un accès à vie à l'ensemble du contenu et des mises à jour futures." },
  ],
  urgencyText: "⚠️ Offre spéciale : -50% uniquement cette semaine. Plus que quelques places disponibles.",
};

// ─── Shared CSS helpers ──────────────────────────────────────────

function baseHead(t: TemplateTheme, title: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${t.googleFonts ? `<link href="https://fonts.googleapis.com/css2?family=${t.googleFonts}&display=swap" rel="stylesheet">` : ""}
<style>
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  font-family:${t.fontBody};
  background:${t.bg};
  color:${t.text};
  line-height:1.7;
  -webkit-font-smoothing:antialiased;
}
.container{max-width:960px;margin:0 auto;padding:0 24px}
h1,h2,h3{font-family:${t.fontHeading};line-height:1.2}
h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:700;letter-spacing:-0.02em}
h2{font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:700}
h3{font-size:1.2rem;font-weight:600}
.accent{color:${t.accent}}
.btn{
  display:inline-block;
  background:${t.accent};
  color:${t.accentText};
  padding:16px 40px;
  border-radius:8px;
  font-size:1.1rem;
  font-weight:700;
  text-decoration:none;
  border:none;
  cursor:pointer;
  transition:all 0.3s ease;
  letter-spacing:0.02em;
}
.btn:hover{background:${t.accentHover};transform:translateY(-2px);box-shadow:0 8px 25px ${t.accent}44}
.section{padding:80px 0}
.section-alt{background:${t.bgAlt}}
.card{
  background:${t.cardBg};
  border:1px solid ${t.cardBorder};
  border-radius:12px;
  padding:28px;
}
.text-muted{color:${t.textMuted}}
.text-center{text-align:center}
.badge{
  display:inline-block;
  background:${t.accent}18;
  color:${t.accent};
  padding:4px 14px;
  border-radius:100px;
  font-size:0.8rem;
  font-weight:600;
  letter-spacing:0.05em;
  text-transform:uppercase;
}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.animate{animation:fadeInUp 0.8s ease forwards}
.delay-1{animation-delay:0.1s;opacity:0}
.delay-2{animation-delay:0.2s;opacity:0}
.delay-3{animation-delay:0.3s;opacity:0}
.delay-4{animation-delay:0.4s;opacity:0}
`;
}

// ─── Capture Page Generator ──────────────────────────────────────

export function generateCaptureHtml(
  themeId: string,
  content: CaptureContent = defaultCaptureContent
): string {
  const t = themes[themeId] || themes.modern;
  const c = { ...defaultCaptureContent, ...content };
  const isDark = ["luxe", "bold"].includes(t.id);

  return `${baseHead(t, c.headline)}
/* Capture-specific */
.hero{
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  ${t.heroOverlay ? `background:${t.heroOverlay};` : ""}
  padding:60px 24px;
  position:relative;
  overflow:hidden;
}
.hero::before{
  content:'';
  position:absolute;
  top:-50%;right:-30%;
  width:600px;height:600px;
  background:radial-gradient(circle,${t.accent}15 0%,transparent 70%);
  border-radius:50%;
  pointer-events:none;
}
.hero-content{max-width:640px;position:relative;z-index:1}
.hero h1{margin-bottom:20px}
.hero .subtitle{
  font-size:1.15rem;
  color:${t.textMuted};
  margin-bottom:36px;
  line-height:1.6;
}
.bullets{
  text-align:left;
  max-width:480px;
  margin:0 auto 36px;
  list-style:none;
}
.bullets li{
  padding:10px 0;
  padding-left:32px;
  position:relative;
  font-size:1rem;
}
.bullets li::before{
  content:'✓';
  position:absolute;
  left:0;
  color:${t.accent};
  font-weight:700;
  font-size:1.1rem;
}
.email-form{
  display:flex;
  gap:12px;
  max-width:440px;
  margin:0 auto 24px;
  flex-wrap:wrap;
}
.email-form input{
  flex:1;
  min-width:200px;
  padding:14px 18px;
  border:2px solid ${t.cardBorder};
  border-radius:8px;
  font-size:1rem;
  background:${isDark ? t.bgAlt : "#fff"};
  color:${t.text};
  font-family:${t.fontBody};
  outline:none;
  transition:border-color 0.3s;
}
.email-form input:focus{border-color:${t.accent}}
.email-form .btn{white-space:nowrap;padding:14px 28px}
.proof{
  font-size:0.9rem;
  color:${t.textMuted};
  margin-top:8px;
}
.footer{
  padding:40px 24px;
  text-align:center;
  font-size:0.8rem;
  color:${t.textMuted};
  border-top:1px solid ${t.cardBorder};
}
</style>
</head>
<body>
<section class="hero">
  <div class="hero-content animate">
    <span class="badge delay-1">Accès Gratuit</span>
    <h1 class="delay-2" style="margin-top:20px">${c.headline}</h1>
    <p class="subtitle delay-3">${c.subtitle}</p>
    <ul class="bullets delay-3">
      ${c.bullets.map((b) => `<li>${b}</li>`).join("\n      ")}
    </ul>
    <form class="email-form delay-4" onsubmit="event.preventDefault()">
      <input type="email" placeholder="Votre adresse email" required>
      <button type="submit" class="btn">${c.ctaText}</button>
    </form>
    ${c.proofText ? `<p class="proof delay-4">${c.proofText}</p>` : ""}
  </div>
</section>
<footer class="footer">
  <p>© ${new Date().getFullYear()} — Tous droits réservés. Mentions légales.</p>
</footer>
</body>
</html>`;
}

// ─── Sales Page Generator ────────────────────────────────────────

export function generateSalesHtml(
  themeId: string,
  content: SalesContent = defaultSalesContent
): string {
  const t = themes[themeId] || themes.modern;
  const c = { ...defaultSalesContent, ...content };
  const isDark = ["luxe", "bold"].includes(t.id);

  return `${baseHead(t, c.headline)}
/* Sales-specific */
.hero-sales{
  padding:100px 24px 80px;
  text-align:center;
  ${t.heroOverlay ? `background:${t.heroOverlay};` : ""}
  position:relative;
  overflow:hidden;
}
.hero-sales::before{
  content:'';position:absolute;top:-40%;right:-20%;
  width:800px;height:800px;
  background:radial-gradient(circle,${t.accent}12 0%,transparent 70%);
  border-radius:50%;pointer-events:none;
}
.hero-sales .inner{max-width:720px;margin:0 auto;position:relative;z-index:1}
.hero-sales h1{margin-bottom:20px}
.hero-sales .subtitle{font-size:1.2rem;color:${t.textMuted};margin-bottom:40px}

.problem{padding:80px 24px;background:${t.bgAlt}}
.problem .inner{max-width:720px;margin:0 auto}
.problem h2{margin-bottom:20px}
.problem p{color:${t.textMuted};font-size:1.05rem}

.solution{padding:80px 24px}
.solution .inner{max-width:720px;margin:0 auto}
.solution h2{margin-bottom:20px}
.solution p{color:${t.textMuted};font-size:1.05rem;margin-bottom:32px}

.benefits-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:20px;
  max-width:960px;
  margin:0 auto;
}
.benefit-card{
  background:${t.cardBg};
  border:1px solid ${t.cardBorder};
  border-radius:12px;
  padding:24px;
  position:relative;
  padding-left:52px;
}
.benefit-card::before{
  content:'✓';
  position:absolute;left:20px;top:24px;
  background:${t.accent};
  color:${t.accentText};
  width:24px;height:24px;
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:0.8rem;font-weight:700;
  line-height:24px;text-align:center;
}

.testimonials{padding:80px 24px;background:${t.bgAlt}}
.testimonials h2{text-align:center;margin-bottom:40px}
.testimonials-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:24px;max-width:960px;margin:0 auto;
}
.testimonial{
  background:${isDark ? t.bg : "#fff"};
  border:1px solid ${t.cardBorder};
  border-radius:12px;padding:28px;
}
.testimonial .stars{color:${t.accent};font-size:1.1rem;margin-bottom:12px}
.testimonial p{font-style:italic;color:${t.textMuted};margin-bottom:12px;font-size:0.95rem}
.testimonial .author{font-weight:600;font-size:0.9rem}

.offer{padding:80px 24px;text-align:center}
.offer h2{margin-bottom:40px}
.offer-box{
  max-width:640px;margin:0 auto;
  background:${t.cardBg};
  border:2px solid ${t.accent};
  border-radius:16px;padding:40px;
  text-align:left;
}
.offer-box ul{list-style:none;margin:20px 0 0}
.offer-box li{
  padding:10px 0;padding-left:28px;position:relative;
  border-bottom:1px solid ${t.cardBorder};
}
.offer-box li:last-child{border-bottom:none}
.offer-box li::before{
  content:'✓';position:absolute;left:0;
  color:${t.accent};font-weight:700;
}

.bonuses{padding:60px 24px;background:${t.bgAlt}}
.bonuses h2{text-align:center;margin-bottom:32px}
.bonuses .bonus-item{
  max-width:640px;margin:0 auto 16px;
  background:${isDark ? t.bg : "#fff"};
  border:1px solid ${t.cardBorder};
  border-radius:12px;padding:20px 24px;
  font-weight:500;
}

.guarantee-section{padding:60px 24px;text-align:center}
.guarantee-box{
  max-width:560px;margin:0 auto;
  background:${t.cardBg};
  border:1px solid ${t.cardBorder};
  border-radius:12px;padding:32px;
}
.guarantee-box h3{margin-bottom:12px}
.guarantee-box p{color:${t.textMuted}}

.faq{padding:80px 24px}
.faq h2{text-align:center;margin-bottom:40px}
.faq-list{max-width:680px;margin:0 auto}
.faq-item{
  border-bottom:1px solid ${t.cardBorder};
  padding:20px 0;
}
.faq-item h3{margin-bottom:8px}
.faq-item p{color:${t.textMuted};font-size:0.95rem}

.final-cta{
  padding:80px 24px;text-align:center;
  ${t.heroOverlay ? `background:${t.heroOverlay};` : `background:${t.bgAlt};`}
}
.final-cta h2{margin-bottom:16px}
.final-cta .urgency{
  color:${t.accent};font-weight:600;
  margin-bottom:24px;font-size:1.05rem;
}
.final-cta .subtitle{color:${t.textMuted};margin-bottom:32px}

.footer{
  padding:40px 24px;text-align:center;
  font-size:0.8rem;color:${t.textMuted};
  border-top:1px solid ${t.cardBorder};
}
</style>
</head>
<body>

<!-- HERO -->
<section class="hero-sales">
  <div class="inner animate">
    <span class="badge">Offre Spéciale</span>
    <h1 style="margin-top:20px">${c.headline}</h1>
    <p class="subtitle">${c.subtitle}</p>
    <a href="#offer" class="btn">${c.ctaText}</a>
  </div>
</section>

<!-- PROBLEM -->
<section class="problem">
  <div class="inner animate">
    <h2 class="accent">${c.problemTitle}</h2>
    <p>${c.problemText}</p>
  </div>
</section>

<!-- SOLUTION -->
<section class="solution">
  <div class="inner animate">
    <h2>${c.solutionTitle}</h2>
    <p>${c.solutionText}</p>
    <div class="benefits-grid">
      ${c.benefits.map((b) => `<div class="benefit-card">${b}</div>`).join("\n      ")}
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials">
  <h2>Ce Qu'en Disent Nos Membres</h2>
  <div class="testimonials-grid">
    ${c.testimonials
      .map(
        (t) => `<div class="testimonial">
      <div class="stars">★★★★★</div>
      <p>"${t.text}"</p>
      <div class="author">— ${t.name}</div>
    </div>`
      )
      .join("\n    ")}
  </div>
</section>

<!-- OFFER -->
<section class="offer" id="offer">
  <h2>${c.offerTitle}</h2>
  <div class="offer-box">
    <ul>
      ${c.offerItems.map((item) => `<li>${item}</li>`).join("\n      ")}
    </ul>
    <div style="text-align:center;margin-top:32px">
      <a href="#" class="btn">${c.ctaText}</a>
    </div>
  </div>
</section>

<!-- BONUSES -->
<section class="bonuses">
  <h2>🎁 Bonus Exclusifs</h2>
  ${c.bonuses.map((b) => `<div class="bonus-item">${b}</div>`).join("\n  ")}
</section>

<!-- GUARANTEE -->
<section class="guarantee-section">
  <div class="guarantee-box">
    <h3>🛡️ Garantie Sans Risque</h3>
    <p>${c.guarantee}</p>
  </div>
</section>

<!-- FAQ -->
<section class="faq">
  <h2>Questions Fréquentes</h2>
  <div class="faq-list">
    ${c.faq
      .map(
        (f) => `<div class="faq-item">
      <h3>${f.q}</h3>
      <p>${f.a}</p>
    </div>`
      )
      .join("\n    ")}
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta">
  ${c.urgencyText ? `<p class="urgency">${c.urgencyText}</p>` : ""}
  <h2>Prêt à Passer à l'Action ?</h2>
  <p class="subtitle">${c.subtitle}</p>
  <a href="#offer" class="btn">${c.ctaText}</a>
</section>

<footer class="footer">
  <p>© ${new Date().getFullYear()} — Tous droits réservés. Mentions légales.</p>
</footer>
</body>
</html>`;
}

// ─── Get theme id for a template ─────────────────────────────────

export function getThemeForTemplate(templateId: string): string {
  return templateThemeMap[templateId] || "modern";
}

// ─── Generate HTML for a template ────────────────────────────────

export function generateTemplateHtml(
  templateId: string,
  pageType: "capture" | "sales",
  content?: Partial<CaptureContent> | Partial<SalesContent>
): string {
  const themeId = getThemeForTemplate(templateId);
  if (pageType === "capture") {
    return generateCaptureHtml(themeId, content as CaptureContent);
  }
  return generateSalesHtml(themeId, content as SalesContent);
}

// ─── Available theme list for UI ─────────────────────────────────

export const availableThemes = Object.values(themes).map((t) => ({
  id: t.id,
  name: t.name,
}));
