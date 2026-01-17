import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MetricsData {
  visitors: number;
  new_subscribers: number;
  email_open_rate: number;
  email_click_rate: number;
  sales_page_views: number;
  sales_count: number;
  revenue: number;
  capture_rate: number;
  conversion_rate: number;
  avg_basket: number;
  subscriber_value: number;
  profile?: {
    niche?: string;
    business_type?: string;
    financial_goal?: string;
    main_goals?: string[];
  };
  previousMetrics?: MetricsData;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { metrics } = await req.json() as { metrics: MetricsData };
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es un expert en stratégie business et marketing digital. Tu analyses les métriques d'un entrepreneur pour lui donner des conseils actionnables et concis.

RÈGLES:
- Tutoie l'utilisateur
- Sois direct et concis (max 3-4 phrases par point)
- Identifie le problème principal et LA priorité #1
- Donne des conseils pratiques et spécifiques
- Ne répète pas les chiffres, analyse-les

SEUILS DE RÉFÉRENCE:
- Taux de capture (visiteurs → inscrits): 2-5% = bon, <1% = à améliorer
- Taux d'ouverture emails: >25% = excellent, 15-25% = normal, <15% = problème
- Taux de clic emails: >3% = très bon, 1-3% = normal, <1% = à revoir
- Taux de conversion (vues → ventes): >5% = excellent, 2-5% = normal, <2% = à optimiser
- Valeur par inscrit: dépend du prix de l'offre

FORMAT DE RÉPONSE (utilise exactement ces sections):
## 🎯 Diagnostic rapide
[1 phrase sur la santé globale du business]

## 🔥 Ta priorité #1
[Le point le plus urgent à améliorer avec UNE action concrète]

## 📈 Points forts
[1-2 points positifs à maintenir]

## ⚠️ Points d'attention
[1-2 autres points à surveiller, moins urgents]`;

    const userPrompt = `Analyse ces métriques business:

DONNÉES SAISIES:
- Visiteurs: ${metrics.visitors}
- Nouveaux inscrits: ${metrics.new_subscribers}
- Taux d'ouverture emails: ${metrics.email_open_rate}%
- Taux de clic emails: ${metrics.email_click_rate}%
- Vues page de vente: ${metrics.sales_page_views}
- Nombre de ventes: ${metrics.sales_count}
- Chiffre d'affaires: ${metrics.revenue}€

CALCULS AUTOMATIQUES:
- Taux de capture: ${metrics.capture_rate?.toFixed(2) || 0}%
- Taux de conversion: ${metrics.conversion_rate?.toFixed(2) || 0}%
- Panier moyen: ${metrics.avg_basket?.toFixed(2) || 0}€
- Valeur par inscrit: ${metrics.subscriber_value?.toFixed(2) || 0}€

${metrics.profile ? `CONTEXTE:
- Niche: ${metrics.profile.niche || 'Non définie'}
- Type de business: ${metrics.profile.business_type || 'Non défini'}
- Objectif financier: ${metrics.profile.financial_goal || 'Non défini'}
- Objectifs: ${metrics.profile.main_goals?.join(', ') || 'Non définis'}` : ''}

${metrics.previousMetrics ? `ÉVOLUTION (vs mois précédent):
- Visiteurs: ${metrics.visitors - metrics.previousMetrics.visitors > 0 ? '+' : ''}${metrics.visitors - metrics.previousMetrics.visitors}
- CA: ${metrics.revenue - metrics.previousMetrics.revenue > 0 ? '+' : ''}${(metrics.revenue - metrics.previousMetrics.revenue).toFixed(2)}€` : ''}

Donne-moi ton analyse.`;

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
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessaie dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits épuisés, contacte le support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erreur d'analyse IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || "Analyse non disponible";

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-metrics error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
