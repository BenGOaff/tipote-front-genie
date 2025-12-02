import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Calendar, LineChart, Sparkles, Target, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 fixed w-full top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold gradient-primary bg-clip-text text-transparent">
              Tipote™
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
              Comment ça marche
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">
              Tarifs
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Connexion</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/dashboard">Commencer</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 gradient-hero opacity-10 z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Propulsé par l'Intelligence Artificielle</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Votre stratégie business,{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                automatisée et optimisée
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              Analysez votre business, planifiez votre stratégie et générez du contenu engageant 
              automatiquement. Tout en un seul endroit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
              <Button variant="hero" size="lg" className="text-lg px-8" asChild>
                <Link to="/dashboard">
                  Démarrer gratuitement <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Voir la démo
              </Button>
            </div>
            
            <div className="mt-12 animate-in fade-in zoom-in duration-700 delay-700">
              <img
                src={dashboardPreview}
                alt="Aperçu du dashboard Tipote"
                className="rounded-2xl shadow-2xl border border-border/50 w-full max-w-4xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour transformer votre stratégie business en résultats concrets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Analyse Intelligente",
                description: "L'IA analyse votre business et crée un plan stratégique personnalisé en quelques minutes",
                gradient: "gradient-primary",
              },
              {
                icon: Target,
                title: "Planification Stratégique",
                description: "Pyramide d'offres, priorités et plan 30/90 jours adaptés à vos objectifs",
                gradient: "gradient-secondary",
              },
              {
                icon: Sparkles,
                title: "Génération de Contenu IA",
                description: "Posts, emails, articles de blog générés automatiquement et prêts à publier",
                gradient: "gradient-primary",
              },
              {
                icon: Calendar,
                title: "Calendrier Éditorial",
                description: "Organisez tout votre contenu dans un calendrier centralisé et intuitif",
                gradient: "gradient-secondary",
              },
              {
                icon: Zap,
                title: "Automatisation Complète",
                description: "Plus de temps perdu en planification manuelle - tout est automatisé",
                gradient: "gradient-primary",
              },
              {
                icon: LineChart,
                title: "Suivi des Performances",
                description: "Trackez vos résultats et réajustez votre stratégie en temps réel",
                gradient: "gradient-secondary",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En 4 étapes simples, transformez votre business avec l'IA
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Onboarding Intelligent",
                description: "Répondez à quelques questions sur votre business, vos objectifs et votre audience",
              },
              {
                step: "02",
                title: "Analyse & Stratégie",
                description: "L'IA analyse vos réponses et génère un plan stratégique personnalisé",
              },
              {
                step: "03",
                title: "Génération de Contenu",
                description: "Créez automatiquement des posts, emails et articles alignés avec votre stratégie",
              },
              {
                step: "04",
                title: "Publication & Suivi",
                description: "Organisez, publiez et trackez vos résultats pour optimiser en continu",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-3xl font-display font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Pourquoi Tipote™ ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Gain de temps massif sur la planification",
                "Stratégie cohérente et professionnelle",
                "Contenu de qualité généré en minutes",
                "Calendrier éditorial centralisé",
                "Suivi des performances en temps réel",
                "Pas de connexion API complexe",
                "Interface intuitive et moderne",
                "Support multilingue (FR/EN)",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto p-12 text-center gradient-hero shadow-2xl border-border/50">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Prêt à transformer votre business ?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Rejoignez des centaines d'entrepreneurs qui ont déjà automatisé leur stratégie de contenu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg px-10" asChild>
                <Link to="/dashboard">
                  Commencer gratuitement <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">Tipote™</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                CGU
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Tipote™. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
