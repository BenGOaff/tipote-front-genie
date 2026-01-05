import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, language = "fr" } = body;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating content for type:", type, body);

    const systemPrompt = `Tu es un expert en création de contenu marketing et copywriting. Tu crées du contenu engageant, professionnel et adapté à chaque plateforme.
Réponds uniquement avec le contenu demandé, sans explication ni commentaire.
Le contenu doit être en ${language === "fr" ? "français" : "anglais"}.
Utilise un formatage clair avec des sections, des sauts de ligne et du markdown si approprié.`;

    let userPrompt = "";

    switch (type) {
      case "post": {
        const { platform, theme, subject, tone, batchCount = 1 } = body;
        const themeLabels: Record<string, string> = {
          educate: "éduquer et apporter de la valeur",
          sell: "vendre et promouvoir",
          entertain: "divertir et engager",
          storytelling: "raconter une histoire",
          social_proof: "preuve sociale et témoignage",
        };
        const toneLabels: Record<string, string> = {
          professional: "professionnel",
          casual: "décontracté",
          inspirational: "inspirant",
          educational: "éducatif",
          humorous: "humoristique",
        };
        
        userPrompt = `Crée ${batchCount} post${batchCount > 1 ? "s" : ""} pour ${platform || "les réseaux sociaux"}.
Thème: ${themeLabels[theme] || theme}
${subject ? `Sujet spécifique: ${subject}` : ""}
Ton: ${toneLabels[tone] || tone || "professionnel"}

Directives par plateforme:
${platform === "linkedin" ? "- LinkedIn: Utilise des emojis avec parcimonie, ajoute des sauts de ligne pour la lisibilité, commence par un hook accrocheur." : ""}
${platform === "instagram" ? "- Instagram: Rends le contenu visuellement engageant, ajoute des emojis et des hashtags pertinents à la fin." : ""}
${platform === "twitter" ? "- Twitter/X: Le contenu doit faire moins de 280 caractères." : ""}
${platform === "tiktok" ? "- TikTok: Style conversationnel et dynamique, parfait pour être lu à voix haute." : ""}
${platform === "facebook" ? "- Facebook: Contenu engageant qui invite à l'interaction et au partage." : ""}

${batchCount > 1 ? "Sépare chaque post par '---'" : ""}`;
        break;
      }

      case "email": {
        const { emailType, offer, formality, subject } = body;
        const emailTypeLabels: Record<string, string> = {
          nurturing: "email de nurturing pour maintenir l'engagement",
          sales_sequence: "email de séquence de vente",
          onboarding: "email d'onboarding pour accueillir un nouveau membre",
        };
        
        userPrompt = `Crée un ${emailTypeLabels[emailType] || emailType}.
Sujet/Thème: ${subject}
${emailType === "sales_sequence" && offer ? `Offre à promouvoir: ${offer}` : ""}
Utilise le ${formality === "tu" ? "tutoiement" : "vouvoiement"}.

Structure à fournir:
1. **Objet de l'email** (accrocheur, moins de 50 caractères)
2. **Contenu complet de l'email** (accroche, corps, appel à l'action)
3. **3 variantes d'objet** alternatives`;
        break;
      }

      case "article": {
        const { subject, seoKeyword, links, cta } = body;
        
        userPrompt = `Crée un article de blog complet sur: ${subject}
${seoKeyword ? `Mot-clé SEO principal: ${seoKeyword}` : ""}
${links ? `Liens à intégrer naturellement: ${links}` : ""}
${cta ? `CTA final: ${cta}` : ""}

Structure à fournir:
1. **Titre SEO** (optimisé, moins de 60 caractères)
2. **Meta description** (moins de 160 caractères)
3. **10 mots-clés SEO** secondaires
4. **Article complet** avec:
   - H1 (titre principal)
   - Introduction engageante
   - H2 et H3 structurés
   - Conclusion avec CTA
   - Environ 1500-2000 mots`;
        break;
      }

      case "video": {
        const { platform, subject, duration } = body;
        const platformLabels: Record<string, string> = {
          youtube_long: "YouTube format long",
          youtube_shorts: "YouTube Shorts (moins de 60 secondes)",
          tiktok: "TikTok",
          reel: "Instagram Reel",
        };
        
        userPrompt = `Crée un script vidéo pour ${platformLabels[platform] || platform}.
Sujet: ${subject}
Durée cible: ${duration}

Structure à fournir:
1. **Hook/Accroche** (les 3 premières secondes cruciales)
2. **Script structuré** complet avec indications de timing
3. **Description SEO** pour la vidéo
4. **Timestamps suggérés** (pour YouTube long)
5. **Conseils de tournage** (angles, visuels suggérés)`;
        break;
      }

      case "offer": {
        const { offerType, theme, target } = body;
        const offerTypeLabels: Record<string, string> = {
          lead_magnet: "lead magnet gratuit",
          paid_training: "formation payante",
        };
        
        userPrompt = `Crée une offre de type: ${offerTypeLabels[offerType] || offerType}
Thème: ${theme}
${target ? `Cible: ${target}` : ""}

Structure à fournir:
1. **Titre accrocheur** de l'offre
2. **Pitch** (2-3 phrases percutantes)
3. **Structure du contenu** (modules, chapitres, sections)
4. **Contenu détaillé** de chaque section
5. **Bénéfices clés** pour le client
6. **Garanties/Bonus** suggérés`;
        break;
      }

      case "funnel": {
        const { funnelType, linkedOffer } = body;
        const funnelTypeLabels: Record<string, string> = {
          capture_page: "page de capture (opt-in)",
          sales_page: "page de vente",
        };
        
        userPrompt = `Crée le copywriting complet pour une ${funnelTypeLabels[funnelType] || funnelType}.
Offre liée: ${linkedOffer}

Structure à fournir pour ${funnelType === "capture_page" ? "la page de capture" : "la page de vente"}:
${funnelType === "capture_page" ? `
1. **Headline principale** (promesse irrésistible)
2. **Sous-titre** (renforce la promesse)
3. **3-5 bullet points** des bénéfices
4. **CTA** clair et urgent
5. **Élément de preuve sociale** (optionnel)
` : `
1. **Headline principale** (promesse transformationnelle)
2. **Sous-titres** pour chaque section
3. **Section Problème** (identifier la douleur)
4. **Section Solution** (votre offre)
5. **Bénéfices détaillés** (liste à puces)
6. **Témoignages** (structure suggérée)
7. **Contenu de l'offre** (ce qu'ils obtiennent)
8. **Bonus** (valeur ajoutée)
9. **Garantie** (réduction du risque)
10. **FAQ** (objections courantes)
11. **CTA multiple** (boutons d'action)
12. **Urgence/Rareté** (si applicable)
`}
Formatage prêt pour Systeme.io.`;
        break;
      }

      default:
        userPrompt = `Crée du contenu marketing de type "${type}".`;
    }

    console.log("User prompt:", userPrompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte, réessayez dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits insuffisants pour la génération IA." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erreur lors de la génération");
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content || "";

    console.log("Generated content length:", generatedContent.length);

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
