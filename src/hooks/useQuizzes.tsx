import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface QuizQuestion {
  id?: string;
  quiz_id?: string;
  question_text: string;
  options: { text: string; result_index: number }[];
  sort_order: number;
}

export interface QuizResult {
  id?: string;
  quiz_id?: string;
  title: string;
  description: string | null;
  insight: string | null;
  projection: string | null;
  cta_text: string | null;
  min_score: number;
  max_score: number;
  sort_order: number;
}

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  introduction: string | null;
  cta_text: string | null;
  cta_url: string | null;
  privacy_url: string | null;
  consent_text: string | null;
  virality_enabled: boolean;
  bonus_description: string | null;
  share_message: string | null;
  status: string;
  views_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  questions?: QuizQuestion[];
  results?: QuizResult[];
}

export interface QuizLead {
  id: string;
  quiz_id: string;
  email: string;
  result_id: string | null;
  has_shared: boolean;
  bonus_unlocked: boolean;
  consent_given: boolean;
  created_at: string;
  result_title?: string;
}

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchQuizzes = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching quizzes:", error);
    } else {
      setQuizzes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [user]);

  const createQuiz = async (
    quizData: Partial<Quiz>,
    questions: QuizQuestion[],
    results: QuizResult[]
  ): Promise<string | null> => {
    if (!user) return null;

    const { data: quiz, error } = await supabase
      .from("quizzes")
      .insert({ ...quizData, user_id: user.id } as any)
      .select()
      .single();

    if (error || !quiz) {
      toast({ title: "Erreur", description: "Impossible de créer le quiz.", variant: "destructive" });
      return null;
    }

    // Insert questions
    if (questions.length > 0) {
      const { error: qError } = await supabase.from("quiz_questions").insert(
        questions.map((q, i) => ({
          quiz_id: quiz.id,
          question_text: q.question_text,
          options: q.options,
          sort_order: i,
        }))
      );
      if (qError) console.error("Error inserting questions:", qError);
    }

    // Insert results
    if (results.length > 0) {
      const { error: rError } = await supabase.from("quiz_results").insert(
        results.map((r, i) => ({
          quiz_id: quiz.id,
          title: r.title,
          description: r.description,
          insight: r.insight,
          projection: r.projection,
          cta_text: r.cta_text,
          min_score: r.min_score,
          max_score: r.max_score,
          sort_order: i,
        }))
      );
      if (rError) console.error("Error inserting results:", rError);
    }

    toast({ title: "Quiz créé !", description: "Ton quiz est prêt." });
    await fetchQuizzes();
    return quiz.id;
  };

  const updateQuiz = async (quizId: string, updates: Partial<Quiz>) => {
    const { error } = await supabase
      .from("quizzes")
      .update(updates as any)
      .eq("id", quizId);

    if (error) {
      toast({ title: "Erreur", description: "Impossible de modifier le quiz.", variant: "destructive" });
    } else {
      await fetchQuizzes();
    }
  };

  const deleteQuiz = async (quizId: string) => {
    const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
    if (error) {
      toast({ title: "Erreur", description: "Impossible de supprimer le quiz.", variant: "destructive" });
    } else {
      await fetchQuizzes();
    }
  };

  const fetchQuizWithDetails = async (quizId: string): Promise<Quiz | null> => {
    const [quizRes, questionsRes, resultsRes] = await Promise.all([
      supabase.from("quizzes").select("*").eq("id", quizId).maybeSingle(),
      supabase.from("quiz_questions").select("*").eq("quiz_id", quizId).order("sort_order"),
      supabase.from("quiz_results").select("*").eq("quiz_id", quizId).order("sort_order"),
    ]);

    if (!quizRes.data) return null;
    return {
      ...quizRes.data,
      questions: (questionsRes.data || []).map(q => ({
        ...q,
        options: q.options as unknown as { text: string; result_index: number }[],
      })),
      results: resultsRes.data || [],
    } as Quiz;
  };

  const fetchLeads = async (quizId: string): Promise<QuizLead[]> => {
    const { data: leads } = await supabase
      .from("quiz_leads")
      .select("*")
      .eq("quiz_id", quizId)
      .order("created_at", { ascending: false });

    if (!leads) return [];

    // Get result titles
    const { data: results } = await supabase
      .from("quiz_results")
      .select("id, title")
      .eq("quiz_id", quizId);

    const resultMap = new Map((results || []).map(r => [r.id, r.title]));

    return leads.map(l => ({
      ...l,
      result_title: l.result_id ? resultMap.get(l.result_id) || "Inconnu" : undefined,
    }));
  };

  const exportLeadsCSV = (leads: QuizLead[], quizTitle: string) => {
    const header = "email,quiz,résultat,date,bonus débloqué";
    const rows = leads.map(l =>
      `${l.email},"${quizTitle}","${l.result_title || ""}",${new Date(l.created_at).toLocaleDateString("fr-FR")},${l.bonus_unlocked ? "oui" : "non"}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${quizTitle.replace(/\s+/g, "-").toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    quizzes,
    loading,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    fetchQuizWithDetails,
    fetchLeads,
    exportLeadsCSV,
    refetch: fetchQuizzes,
  };
}
