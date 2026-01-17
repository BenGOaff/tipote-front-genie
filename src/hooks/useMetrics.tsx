import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export interface MetricsData {
  id?: string;
  user_id?: string;
  month: string;
  visitors: number;
  new_subscribers: number;
  email_open_rate: number;
  email_click_rate: number;
  sales_page_views: number;
  sales_count: number;
  revenue: number;
  capture_rate?: number;
  conversion_rate?: number;
  avg_basket?: number;
  subscriber_value?: number;
  ai_analysis?: string;
}

export const useMetrics = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<MetricsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fetchMetrics = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("month", { ascending: false })
        .limit(12);

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger tes métriques",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveMetrics = async (metricsData: Omit<MetricsData, "id" | "user_id" | "capture_rate" | "conversion_rate" | "avg_basket" | "subscriber_value">) => {
    if (!user) return null;

    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from("metrics")
        .select("id")
        .eq("user_id", user.id)
        .eq("month", metricsData.month)
        .maybeSingle();

      let result;
      if (existing) {
        const { data, error } = await supabase
          .from("metrics")
          .update({
            visitors: metricsData.visitors,
            new_subscribers: metricsData.new_subscribers,
            email_open_rate: metricsData.email_open_rate,
            email_click_rate: metricsData.email_click_rate,
            sales_page_views: metricsData.sales_page_views,
            sales_count: metricsData.sales_count,
            revenue: metricsData.revenue,
          })
          .eq("id", existing.id)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from("metrics")
          .insert({
            user_id: user.id,
            month: metricsData.month,
            visitors: metricsData.visitors,
            new_subscribers: metricsData.new_subscribers,
            email_open_rate: metricsData.email_open_rate,
            email_click_rate: metricsData.email_click_rate,
            sales_page_views: metricsData.sales_page_views,
            sales_count: metricsData.sales_count,
            revenue: metricsData.revenue,
          })
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      await fetchMetrics();
      toast({
        title: "Métriques enregistrées !",
        description: "Tes données ont été sauvegardées.",
      });
      
      return result;
    } catch (error) {
      console.error("Error saving metrics:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder tes métriques",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const analyzeMetrics = async (metricsData: MetricsData, previousMetrics?: MetricsData) => {
    if (!user) return null;

    setIsAnalyzing(true);
    try {
      // Fetch user profile for context
      const { data: profile } = await supabase
        .from("profiles")
        .select("niche, business_type, financial_goal, main_goals")
        .eq("user_id", user.id)
        .maybeSingle();

      const response = await supabase.functions.invoke("analyze-metrics", {
        body: {
          metrics: {
            ...metricsData,
            profile,
            previousMetrics,
          },
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Erreur d'analyse");
      }

      const analysis = response.data?.analysis;

      // Save analysis to the metrics record
      if (metricsData.id && analysis) {
        await supabase
          .from("metrics")
          .update({ ai_analysis: analysis })
          .eq("id", metricsData.id);
        
        await fetchMetrics();
      }

      return analysis;
    } catch (error) {
      console.error("Error analyzing metrics:", error);
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : "Impossible d'analyser tes métriques",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [user]);

  const latestMetrics = metrics[0] || null;
  const previousMetrics = metrics[1] || null;

  return {
    metrics,
    latestMetrics,
    previousMetrics,
    isLoading,
    isSaving,
    isAnalyzing,
    saveMetrics,
    analyzeMetrics,
    refetch: fetchMetrics,
  };
};
