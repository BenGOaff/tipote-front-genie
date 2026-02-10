import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Share2, ChevronRight, Loader2 } from "lucide-react";

interface QuizOption {
  text: string;
  result_index: number;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  options: QuizOption[];
  sort_order: number;
}

interface QuizResultProfile {
  id: string;
  title: string;
  description: string | null;
  insight: string | null;
  projection: string | null;
  cta_text: string | null;
}

interface QuizData {
  id: string;
  title: string;
  introduction: string | null;
  cta_text: string | null;
  cta_url: string | null;
  privacy_url: string | null;
  consent_text: string | null;
  virality_enabled: boolean;
  bonus_description: string | null;
  share_message: string | null;
  views_count: number;
}

type Step = "intro" | "questions" | "email" | "result" | "share";

const PublicQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [resultProfiles, setResultProfiles] = useState<QuizResultProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResultProfile | null>(null);
  const [hasShared, setHasShared] = useState(false);

  useEffect(() => {
    if (!quizId) return;
    loadQuiz();
    incrementViews();
  }, [quizId]);

  const loadQuiz = async () => {
    const [quizRes, qRes, rRes] = await Promise.all([
      supabase.from("quizzes").select("*").eq("id", quizId!).eq("status", "active").maybeSingle(),
      supabase.from("quiz_questions").select("*").eq("quiz_id", quizId!).order("sort_order"),
      supabase.from("quiz_results").select("*").eq("quiz_id", quizId!).order("sort_order"),
    ]);

    if (!quizRes.data) {
      setError("Quiz introuvable ou inactif.");
      setLoading(false);
      return;
    }

    setQuiz(quizRes.data as QuizData);
    setQuestions((qRes.data || []).map(q => ({
      ...q,
      options: q.options as unknown as QuizOption[],
    })));
    setResultProfiles(rRes.data || []);
    setLoading(false);
  };

  const incrementViews = async () => {
    if (!quizId) return;
    // Simple view count increment - non-blocking
    try {
      await supabase.from("quizzes").update({ views_count: (quiz?.views_count || 0) + 1 } as any).eq("id", quizId);
    } catch {}
  };

  const handleAnswer = (optionIndex: number) => {
    const option = questions[currentQ].options[optionIndex];
    const newAnswers = [...answers, option.result_index];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("email");
    }
  };

  const computeResult = (): QuizResultProfile => {
    // Count which result_index appears most
    const counts: Record<number, number> = {};
    answers.forEach(idx => { counts[idx] = (counts[idx] || 0) + 1; });
    let maxIdx = 0;
    let maxCount = 0;
    Object.entries(counts).forEach(([idx, count]) => {
      if (count > maxCount) { maxCount = count; maxIdx = parseInt(idx); }
    });
    return resultProfiles[maxIdx] || resultProfiles[0];
  };

  const handleEmailSubmit = async () => {
    if (!email.trim() || !consent) return;
    setSubmitting(true);

    const resultProfile = computeResult();
    setResult(resultProfile);

    // Save lead
    await supabase.from("quiz_leads").insert({
      quiz_id: quizId!,
      email: email.trim(),
      result_id: resultProfile.id,
      consent_given: true,
    });

    setSubmitting(false);
    setStep("result");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: quiz?.title, url });
        setHasShared(true);
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setHasShared(true);
    }

    // Mark as shared
    await supabase
      .from("quiz_leads")
      .update({ has_shared: true, bonus_unlocked: true })
      .eq("quiz_id", quizId!)
      .eq("email", email);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Quiz introuvable</h2>
          <p className="text-muted-foreground">{error || "Ce quiz n'existe pas ou n'est plus disponible."}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">Propulsé par Tipote</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* INTRO */}
          {step === "intro" && (
            <Card className="p-8 text-center space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold">{quiz.title}</h1>
              {quiz.introduction && (
                <p className="text-muted-foreground text-lg">{quiz.introduction}</p>
              )}
              <Button size="lg" onClick={() => setStep("questions")} className="gradient-primary text-primary-foreground">
                Commencer le quiz <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <p className="text-xs text-muted-foreground">{questions.length} questions • 2 min</p>
            </Card>
          )}

          {/* QUESTIONS */}
          {step === "questions" && questions[currentQ] && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {currentQ + 1}/{questions.length}</span>
                  <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
                </div>
                <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
              </div>

              <Card className="p-6 space-y-6">
                <h2 className="text-xl font-bold">{questions[currentQ].question_text}</h2>
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary flex items-center justify-center text-sm font-medium">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-base">{opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* EMAIL CAPTURE */}
          {step === "email" && (
            <Card className="p-8 space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Ton résultat est prêt ! 🎉</h2>
                <p className="text-muted-foreground">Entre ton email pour découvrir ton profil</p>
              </div>
              <div className="space-y-4 max-w-sm mx-auto">
                <Input
                  type="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center"
                />
                <div className="flex items-start gap-2 text-left">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer">
                    {quiz.consent_text || "En renseignant ton email, tu acceptes notre politique de confidentialité."}
                  </label>
                </div>
                <Button
                  onClick={handleEmailSubmit}
                  disabled={!email.trim() || !consent || submitting}
                  className="w-full gradient-primary text-primary-foreground"
                  size="lg"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Voir mon résultat
                </Button>
              </div>
              {quiz.privacy_url && (
                <a href={quiz.privacy_url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline">
                  Politique de confidentialité
                </a>
              )}
            </Card>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <div className="space-y-6">
              <Card className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-primary font-medium">Ton profil</p>
                  <h2 className="text-3xl font-bold">{result.title}</h2>
                </div>
                {result.description && <p className="text-muted-foreground text-lg">{result.description}</p>}
                {result.insight && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-1">💡 Insight</p>
                    <p>{result.insight}</p>
                  </div>
                )}
                {result.projection && (
                  <div className="p-4 rounded-lg bg-accent/50 border border-accent">
                    <p className="text-sm font-medium text-primary mb-1">🚀 Et si tu passais à l'action...</p>
                    <p>{result.projection}</p>
                  </div>
                )}
                {quiz.cta_text && quiz.cta_url && (
                  <a href={quiz.cta_url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full gradient-primary text-primary-foreground">
                      {result.cta_text || quiz.cta_text}
                    </Button>
                  </a>
                )}
              </Card>

              {/* Virality / Share */}
              {quiz.virality_enabled && !hasShared && (
                <Card className="p-6 space-y-4 border-primary/30 bg-primary/5">
                  <h3 className="font-bold text-lg">{quiz.share_message || "Partage ce quiz et débloque ton bonus 🎁"}</h3>
                  {quiz.bonus_description && <p className="text-sm text-muted-foreground">{quiz.bonus_description}</p>}
                  <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" /> Partager pour débloquer
                  </Button>
                </Card>
              )}

              {hasShared && quiz.bonus_description && (
                <Card className="p-6 border-primary/30 bg-accent/50 text-center">
                  <p className="text-primary font-bold mb-2">✅ Bonus débloqué !</p>
                  <p className="text-sm text-muted-foreground">{quiz.bonus_description}</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">
          Ce quiz est propulsé par <span className="font-medium">Tipote</span>
          {quiz.privacy_url && (
            <> · <a href={quiz.privacy_url} target="_blank" rel="noopener noreferrer" className="underline">Politique de confidentialité</a></>
          )}
        </p>
      </footer>
    </div>
  );
};

export default PublicQuiz;
