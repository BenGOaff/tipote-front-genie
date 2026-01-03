import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Content {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  type: string;
  platform: string | null;
  status: string;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentInput {
  title: string;
  content?: string;
  type: string;
  platform?: string;
  status?: string;
  scheduled_at?: string;
}

export function useContents() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchContents = async () => {
    if (!user) {
      setContents([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos contenus",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [user]);

  const createContent = async (input: ContentInput): Promise<Content | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('contents')
        .insert({
          user_id: user.id,
          title: input.title,
          content: input.content || null,
          type: input.type,
          platform: input.platform || null,
          status: input.status || 'draft',
          scheduled_at: input.scheduled_at || null,
        })
        .select()
        .single();

      if (error) throw error;
      
      setContents(prev => [data, ...prev]);
      toast({
        title: "Contenu créé",
        description: "Votre contenu a été enregistré avec succès",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le contenu",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateContent = async (id: string, input: Partial<ContentInput>): Promise<Content | null> => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setContents(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Contenu mis à jour",
        description: "Les modifications ont été enregistrées",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le contenu",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteContent = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContents(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Contenu supprimé",
        description: "Le contenu a été supprimé",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le contenu",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    contents,
    loading,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContents,
  };
}
