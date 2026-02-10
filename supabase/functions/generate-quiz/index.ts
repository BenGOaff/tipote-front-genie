import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { objective, target, tone, cta, bonus, niche, questionCount = 7, resultCount = 3 } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Tu es un expert en quiz marketing à forte conversion. Tu crées des quiz engageants qui capturent des emails et apportent une vraie valeur transformationnelle aux participants. Le contenu doit être en français.`;

    const userPrompt = `Crée un quiz lead magnet complet avec les paramètres suivants :

Objectif du quiz : ${objective}
Cible : ${target}
Ton : ${tone}
CTA final (après résultat) : ${cta}
${bonus ? `Bonus de partage : ${bonus}` : ""}
${niche ? `Niche/secteur : ${niche}` : ""}
Nombre de questions : ${questionCount}
Nombre de profils résultat : ${resultCount}

Chaque question doit avoir 3-4 options. Chaque option doit mapper vers un profil résultat.
Chaque résultat doit contenir un insight fort, une reformulation valorisante, une projection ("si tu continues comme ça…"), et un pont naturel vers le CTA.`;

    const tools = [{
      type: "function",
      function: {
        name: "create_quiz",
        description: "Génère un quiz lead magnet complet avec questions et profils résultat.",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string", description: "Titre accrocheur du quiz" },
            introduction: { type: "string", description: "Texte d'introduction qui donne envie de participer (2-3 phrases)" },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question_text: { type: "string" },
                  options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        result_index: { type: "integer", description: "Index du profil résultat (0-based)" }
                      },
                      required: ["text", "result_index"]
                    }
                  }
                },
                required: ["question_text", "options"]
              }
            },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Nom du profil (ex: L'Entrepreneur Stratège)" },
                  description: { type: "string", description: "Description valorisante du profil" },
                  insight: { type: "string", description: "Prise de conscience forte" },
                  projection: { type: "string", description: "Projection positive si la personne passe à l'action" },
                  cta_text: { type: "string", description: "CTA personnalisé pour ce profil" }
                },
                required: ["title", "description", "insight", "projection", "cta_text"]
              }
            },
            cta_text: { type: "string", description: "CTA principal affiché après le résultat" },
            share_message: { type: "string", description: "Message incitatif pour le partage si bonus activé" }
          },
          required: ["title", "introduction", "questions", "results", "cta_text"],
          additionalProperties: false
        }
      }
    }];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "create_quiz" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits insuffisants." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("Erreur IA");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call response");

    const quiz = JSON.parse(toolCall.function.arguments);
    console.log("Quiz generated:", quiz.title);

    return new Response(JSON.stringify({ quiz }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-quiz error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
