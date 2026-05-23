import { Button } from '../components/Button';
import { Sparkles, Smartphone, Zap, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="text-xl font-bold">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              FichePro Bénin
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Fonctionnalités</a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Témoignages</a>
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Connexion</Link>
            <Link to="/register">
              <Button size="sm">Essayer Gratuitement</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-400/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2" />
              L'IA au service des enseignants béninois
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Préparez vos cours en <span className="relative">
                <span className="relative z-10 text-blue-600">30 secondes</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-100 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>, pas en 2 heures.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Générez des fiches de préparation certifiées conformes au format <span className="font-bold text-slate-900">MEMP</span> grâce à notre intelligence artificielle spécialisée.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 h-16 shadow-xl shadow-blue-200">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">+500 enseignants</p>
                  <p className="text-xs text-slate-500 text-nowrap">nous font déjà confiance</p>
                </div>
              </div>
            </div>
          </div>

          {/* App Preview Mockup */}
          <div className="mt-24 relative max-w-5xl mx-auto animate-float">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl rounded-[3rem] -z-10 opacity-50"></div>
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden aspect-[16/9] flex">
              <div className="w-64 bg-slate-50 border-r border-slate-100 p-6 hidden md:block">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
              <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-8 w-48 bg-slate-100 rounded-lg"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 w-8 bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-32 w-full bg-blue-50 rounded-2xl border border-blue-100"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-slate-50 rounded-2xl"></div>
                    <div className="h-24 bg-slate-50 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl font-black text-blue-600 mb-2">98%</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-600 mb-2">30s</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Temps moyen</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-600 mb-2">+10k</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Fiches générées</p>
          </div>
          <div>
            <p className="text-4xl font-black text-blue-600 mb-2">0€</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Frais cachés</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-base font-bold text-blue-600 uppercase tracking-widest mb-4">Fonctionnalités</h2>
            <p className="text-4xl font-black text-slate-900">Conçu pour l'excellence pédagogique</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-7 w-7" />}
              title="Vitesse Inégalée"
              description="Saisissez votre thème, nous faisons le reste. Une fiche complète en un clin d'œil."
              color="blue"
            />
            <FeatureCard 
              icon={<Shield className="h-7 w-7" />}
              title="Conformité Totale"
              description="Respect strict du format MEMP Bénin. Validez vos inspections sans stress."
              color="emerald"
            />
            <FeatureCard 
              icon={<Smartphone className="h-7 w-7" />}
              title="Partout, tout le temps"
              description="Fonctionne sur votre téléphone, même avec une faible connexion internet."
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
              Rejoignez la révolution de l'enseignement au Bénin.
            </h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
              Ne laissez plus la paperasse ralentir votre passion. Concentrez-vous sur l'essentiel : vos élèves.
            </p>
            <Link to="/register">
              <Button variant="glass" size="lg" className="px-12 h-16 text-lg">
                Créer ma première fiche maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-white mb-6">
              <span className="text-2xl font-bold">🎓 FichePro Bénin</span>
            </div>
            <p className="max-w-sm mb-8">
              La plateforme intelligente qui libère du temps pour les enseignants du primaire et du secondaire au Bénin.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Produit</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Légal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-900 text-center text-xs">
          <p>© 2026 FichePro Bénin. Propulsé par l'innovation EdTech.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-transform group-hover:scale-110 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
