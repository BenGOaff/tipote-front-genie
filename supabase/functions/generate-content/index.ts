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
    const { type, platform, topic, tone, language = "fr" } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const typeLabels: Record<string, string> = {
      post: "post pour les réseaux sociaux",
      email: "email marketing",
      article: "article de blog",
      video: "script vidéo",
    };

    const systemPrompt = `Tu es un expert en création de contenu marketing. Tu crées du contenu engageant, professionnel et adapté à chaque plateforme.
Réponds uniquement avec le contenu demandé, sans explication ni commentaire.
Le contenu doit être en ${language === "fr" ? "français" : "anglais"}.`;

    const userPrompt = `Crée un ${typeLabels[type] || type} ${platform ? `pour ${platform}` : ""} sur le sujet suivant: "${topic}".
${tone ? `Le ton doit être: ${tone}.` : ""}
${platform === "linkedin" ? "Utilise des emojis avec parcimonie et ajoute des sauts de ligne pour la lisibilité." : ""}
${platform === "instagram" ? "Rends le contenu accrocheur et ajoute des hashtags pertinents à la fin." : ""}
${platform === "twitter" ? "Le contenu doit faire moins de 280 caractères." : ""}
${type === "email" ? "Structure avec un objet accrocheur, une accroche, le corps et un appel à l'action." : ""}
${type === "video" ? "Structure le script avec une accroche, les points clés et une conclusion avec appel à l'action." : ""}`;

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
