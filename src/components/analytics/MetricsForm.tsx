import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, Sparkles } from "lucide-react";
import { format, startOfMonth, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import type { MetricsData } from "@/hooks/useMetrics";

interface MetricsFormProps {
  initialData?: MetricsData | null;
  onSave: (data: Omit<MetricsData, "id" | "user_id" | "capture_rate" | "conversion_rate" | "avg_basket" | "subscriber_value">) => Promise<MetricsData | null>;
  onAnalyze: (data: MetricsData, previous?: MetricsData) => Promise<string | null>;
  previousMetrics?: MetricsData | null;
  isSaving: boolean;
  isAnalyzing: boolean;
}

const getAvailableMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const date = startOfMonth(subMonths(now, i));
    months.push({
      value: format(date, "yyyy-MM-dd"),
      label: format(date, "MMMM yyyy", { locale: fr }),
    });
  }
  return months;
};

export const MetricsForm = ({ 
  initialData, 
  onSave, 
  onAnalyze,
  previousMetrics,
  isSaving, 
  isAnalyzing 
}: MetricsFormProps) => {
  const availableMonths = getAvailableMonths();
  
  const [formData, setFormData] = useState({
    month: initialData?.month || availableMonths[0].value,
    visitors: initialData?.visitors?.toString() || "",
    new_subscribers: initialData?.new_subscribers?.toString() || "",
    email_open_rate: initialData?.email_open_rate?.toString() || "",
    email_click_rate: initialData?.email_click_rate?.toString() || "",
    sales_page_views: initialData?.sales_page_views?.toString() || "",
    sales_count: initialData?.sales_count?.toString() || "",
    revenue: initialData?.revenue?.toString() || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        month: initialData.month,
        visitors: initialData.visitors?.toString() || "",
        new_subscribers: initialData.new_subscribers?.toString() || "",
        email_open_rate: initialData.email_open_rate?.toString() || "",
        email_click_rate: initialData.email_click_rate?.toString() || "",
        sales_page_views: initialData.sales_page_views?.toString() || "",
        sales_count: initialData.sales_count?.toString() || "",
        revenue: initialData.revenue?.toString() || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (analyze: boolean = false) => {
    const metricsToSave = {
      month: formData.month,
      visitors: parseInt(formData.visitors) || 0,
      new_subscribers: parseInt(formData.new_subscribers) || 0,
      email_open_rate: parseFloat(formData.email_open_rate) || 0,
      email_click_rate: parseFloat(formData.email_click_rate) || 0,
      sales_page_views: parseInt(formData.sales_page_views) || 0,
      sales_count: parseInt(formData.sales_count) || 0,
      revenue: parseFloat(formData.revenue) || 0,
    };

    const savedMetrics = await onSave(metricsToSave);
    
    if (analyze && savedMetrics) {
      await onAnalyze(savedMetrics, previousMetrics || undefined);
    }
  };

  // Calculate derived metrics in real-time
  const visitors = parseInt(formData.visitors) || 0;
  const newSubs = parseInt(formData.new_subscribers) || 0;
  const salesViews = parseInt(formData.sales_page_views) || 0;
  const sales = parseInt(formData.sales_count) || 0;
  const revenue = parseFloat(formData.revenue) || 0;

  const captureRate = visitors > 0 ? ((newSubs / visitors) * 100).toFixed(2) : "0";
  const conversionRate = salesViews > 0 ? ((sales / salesViews) * 100).toFixed(2) : "0";
  const avgBasket = sales > 0 ? (revenue / sales).toFixed(2) : "0";
  const subscriberValue = newSubs > 0 ? (revenue / newSubs).toFixed(2) : "0";

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-6">📊 Saisis tes données du mois</h3>
      
      <div className="space-y-6">
        {/* Month selector */}
        <div className="space-y-2">
          <Label>Mois concerné</Label>
          <Select value={formData.month} onValueChange={(value) => setFormData({ ...formData, month: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Input metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="visitors">🚀 Visiteurs</Label>
            <Input
              id="visitors"
              type="number"
              placeholder="854"
              value={formData.visitors}
              onChange={(e) => setFormData({ ...formData, visitors: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new_subscribers">📧 Nouveaux inscrits</Label>
            <Input
              id="new_subscribers"
              type="number"
              placeholder="10"
              value={formData.new_subscribers}
              onChange={(e) => setFormData({ ...formData, new_subscribers: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email_open_rate">📬 Taux d'ouverture (%)</Label>
            <Input
              id="email_open_rate"
              type="number"
              step="0.1"
              placeholder="25"
              value={formData.email_open_rate}
              onChange={(e) => setFormData({ ...formData, email_open_rate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email_click_rate">🖱️ Taux de clic (%)</Label>
            <Input
              id="email_click_rate"
              type="number"
              step="0.1"
              placeholder="22"
              value={formData.email_click_rate}
              onChange={(e) => setFormData({ ...formData, email_click_rate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales_page_views">👀 Vues page de vente</Label>
            <Input
              id="sales_page_views"
              type="number"
              placeholder="256"
              value={formData.sales_page_views}
              onChange={(e) => setFormData({ ...formData, sales_page_views: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales_count">💰 Nombre de ventes</Label>
            <Input
              id="sales_count"
              type="number"
              placeholder="21"
              value={formData.sales_count}
              onChange={(e) => setFormData({ ...formData, sales_count: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="revenue">💵 Chiffre d'affaires (€)</Label>
            <Input
              id="revenue"
              type="number"
              step="0.01"
              placeholder="1265"
              value={formData.revenue}
              onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
            />
          </div>
        </div>

        {/* Calculated metrics */}
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground mb-3">📈 Taux calculés automatiquement</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Taux de capture</p>
              <p className="text-lg font-bold">{captureRate}%</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Taux de conversion</p>
              <p className="text-lg font-bold">{conversionRate}%</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Panier moyen</p>
              <p className="text-lg font-bold">{avgBasket}€</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Valeur/inscrit</p>
              <p className="text-lg font-bold">{subscriberValue}€</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={() => handleSubmit(false)} 
            disabled={isSaving || isAnalyzing}
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer
          </Button>
          <Button 
            onClick={() => handleSubmit(true)} 
            disabled={isSaving || isAnalyzing}
            className="gradient-primary"
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Enregistrer & Analyser
          </Button>
        </div>
      </div>
    </Card>
  );
};
