import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es un expert en stratégie business pour solopreneurs et créateurs de contenu. 
Tu dois proposer exactement 3 pyramides d'offres différentes basées sur le profil de l'utilisateur.

Chaque pyramide doit contenir :
1. Un Lead Magnet (gratuit) : composition, but, format
2. Une Offre Low Ticket (petit prix) : composition, but, format  
3. Une Offre Middle/High Ticket (prix élevé) : composition, but, format
4. Une phrase de stratégie qui résume l'angle et le but de cette pyramide

Les pyramides doivent être distinctes et adaptées à la niche, la maturité et les objectifs de l'utilisateur.

Tu DOIS répondre UNIQUEMENT avec un JSON valide sans markdown, sans explication, dans ce format exact :
{
  "pyramids": [
    {
      "id": "pyramid_1",
      "name": "Nom de la stratégie",
      "strategy_summary": "Une phrase qui résume la stratégie, l'angle et le but",
      "lead_magnet": {
        "title": "Titre du lead magnet",
        "composition": "Ce que contient le lead magnet",
        "purpose": "Le but du lead magnet", 
        "format": "Le format (PDF, vidéo, checklist, etc.)"
      },
      "low_ticket": {
        "title": "Titre de l'offre",
        "price_range": "Fourchette de prix suggérée",
        "composition": "Ce que contient l'offre",
        "purpose": "Le but de l'offre",
        "format": "Le format"
      },
      "high_ticket": {
        "title": "Titre de l'offre",
        "price_range": "Fourchette de prix suggérée",
        "composition": "Ce que contient l'offre",
        "purpose": "Le but de l'offre",
        "format": "Le format"
      }
    }
  ]
}`;

    const userPrompt = `Voici le profil de l'utilisateur :

- Prénom : ${profileData.firstName || 'Non renseigné'}
- Pays : ${profileData.country || 'Non renseigné'}
- Niche : ${profileData.niche || 'Non renseigné'}
- Mission : ${profileData.missionStatement || 'Non renseigné'}
- Maturité business : ${profileData.maturity || 'Non renseigné'}
- Plus grand blocage : ${profileData.biggestBlocker || 'Non renseigné'}
- A des offres : ${profileData.hasOffers ? 'Oui' : 'Non'}
- Offres existantes : ${JSON.stringify(profileData.offers || [])}
- Audience sociale : ${profileData.socialAudience || 'Non renseigné'}
- Taille liste email : ${profileData.emailListSize || 'Non renseigné'}
- Heures par semaine : ${profileData.weeklyHours || 'Non renseigné'}
- Objectif 90 jours : ${profileData.mainGoal90Days || 'Non renseigné'}
- Objectifs principaux : ${JSON.stringify(profileData.mainGoals || [])}
- Proposition de valeur unique : ${profileData.uniqueValue || 'Non renseigné'}
- Force sous-exploitée : ${profileData.untappedStrength || 'Non renseigné'}
- Plus grand défi : ${profileData.biggestChallenge || 'Non renseigné'}
- Définition du succès : ${profileData.successDefinition || 'Non renseigné'}
- Retours clients : ${profileData.clientFeedback || 'Non renseigné'}
- Style de communication : ${profileData.communicationStyle || 'Non renseigné'}
- Tons préférés : ${JSON.stringify(profileData.preferredTones || [])}

Génère 3 pyramides d'offres distinctes et adaptées à ce profil.`;

    console.log("Generating pyramids for profile:", profileData.firstName);

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
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, réessayez dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits insuffisants." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("Raw AI response:", content);

    // Parse the JSON response
    let pyramids;
    try {
      // Remove potential markdown code blocks
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      pyramids = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI response as JSON");
    }

    return new Response(JSON.stringify(pyramids), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating pyramids:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Erreur lors de la génération" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
