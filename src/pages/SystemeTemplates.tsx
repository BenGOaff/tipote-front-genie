import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShoppingCart, Layout } from "lucide-react";
import { systemeTemplates } from "@/data/systemeTemplates";

export type { SystemeTemplate } from "@/data/systemeTemplates";

export default function SystemeTemplates() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTemplates = activeTab === "all" 
    ? systemeTemplates 
    : systemeTemplates.filter(t => t.type === activeTab);

  const captureCount = systemeTemplates.filter(t => t.type === "capture").length;
  const salesCount = systemeTemplates.filter(t => t.type === "sales").length;
  const blogCount = systemeTemplates.filter(t => t.type === "blog").length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold mb-2">
                Templates Systeme.io
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Lance ton tunnel de vente rapidement grâce à ces templates personnalisables. 
                Un clic suffit pour importer le template dans ton compte Systeme.io.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Layout className="w-4 h-4" />
                  <span className="hidden sm:inline">Tous</span>
                  <span className="text-xs text-muted-foreground">({systemeTemplates.length})</span>
                </TabsTrigger>
                <TabsTrigger value="capture" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Capture</span>
                  <span className="text-xs text-muted-foreground">({captureCount})</span>
                </TabsTrigger>
                <TabsTrigger value="sales" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Vente</span>
                  <span className="text-xs text-muted-foreground">({salesCount})</span>
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Blog</span>
                  <span className="text-xs text-muted-foreground">({blogCount})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
