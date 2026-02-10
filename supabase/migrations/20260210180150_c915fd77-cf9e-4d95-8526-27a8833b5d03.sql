
-- Quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  introduction TEXT,
  cta_text TEXT,
  cta_url TEXT,
  privacy_url TEXT,
  consent_text TEXT DEFAULT 'En renseignant ton email, tu acceptes notre politique de confidentialité.',
  virality_enabled BOOLEAN DEFAULT false,
  bonus_description TEXT,
  share_message TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz questions
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz result profiles (2-4 per quiz)
CREATE TABLE public.quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  insight TEXT,
  projection TEXT,
  cta_text TEXT,
  min_score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quiz leads (public insert, owner read)
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  result_id UUID REFERENCES public.quiz_results(id) ON DELETE SET NULL,
  has_shared BOOLEAN DEFAULT false,
  bonus_unlocked BOOLEAN DEFAULT false,
  consent_given BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Quizzes: owner CRUD
CREATE POLICY "Users can view their own quizzes" ON public.quizzes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own quizzes" ON public.quizzes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own quizzes" ON public.quizzes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own quizzes" ON public.quizzes FOR DELETE USING (auth.uid() = user_id);

-- Public can read active quizzes (for public quiz page)
CREATE POLICY "Public can view active quizzes" ON public.quizzes FOR SELECT USING (status = 'active');

-- Quiz questions: owner CRUD + public read via quiz
CREATE POLICY "Users can manage quiz questions" ON public.quiz_questions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_questions.quiz_id AND quizzes.user_id = auth.uid())
);
CREATE POLICY "Public can view questions of active quizzes" ON public.quiz_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_questions.quiz_id AND quizzes.status = 'active')
);

-- Quiz results: owner CRUD + public read via quiz
CREATE POLICY "Users can manage quiz results" ON public.quiz_results FOR ALL USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_results.quiz_id AND quizzes.user_id = auth.uid())
);
CREATE POLICY "Public can view results of active quizzes" ON public.quiz_results FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_results.quiz_id AND quizzes.status = 'active')
);

-- Quiz leads: public can insert, owner can read/delete
CREATE POLICY "Anyone can submit quiz leads" ON public.quiz_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Quiz owners can view their leads" ON public.quiz_leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_leads.quiz_id AND quizzes.user_id = auth.uid())
);
CREATE POLICY "Quiz owners can delete their leads" ON public.quiz_leads FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.quizzes WHERE quizzes.id = quiz_leads.quiz_id AND quizzes.user_id = auth.uid())
);

-- Triggers for updated_at
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for performance
CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);
CREATE INDEX idx_quiz_results_quiz_id ON public.quiz_results(quiz_id);
CREATE INDEX idx_quiz_leads_quiz_id ON public.quiz_leads(quiz_id);
CREATE INDEX idx_quiz_leads_email ON public.quiz_leads(email);
