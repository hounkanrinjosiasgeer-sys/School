import { Button } from '../components/Button';
import { 
  Plus, 
  FileText, 
  Clock, 
  ChevronRight, 
  BookOpen,
  Sparkles,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useSheets } from '../hooks/useSheets';
import { useNavigate, Link } from 'react-router-dom';

export default function DashboardPage() {
  const { sheets } = useSheets();
  const navigate = useNavigate();

  const recentSheets = sheets.slice(0, 4);
  const totalSheets = sheets.length;
  
  // Calculate unique levels
  const levels = Array.from(new Set(sheets.map(s => s.level))).slice(0, 2).join(' & ') || '---';

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto w-full space-y-10">
      {/* Welcome Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Tableau de bord intelligent
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Bonjour, M. Kodjo 👋</h2>
          <p className="text-slate-500 font-medium">Vous avez déjà économisé environ <span className="text-blue-600 font-bold">{totalSheets * 2} heures</span> cette semaine.</p>
        </div>
        <Link to="/generate">
          <Button size="lg" className="h-14 px-8 shadow-lg shadow-blue-200">
            <Plus className="mr-2 h-5 w-5" />
            Nouvelle Fiche
          </Button>
        </Link>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<FileText className="h-6 w-6" />}
          label="Fiches créées"
          value={totalSheets.toString()}
          trend="+12% ce mois"
          color="blue"
        />
        <StatCard 
          icon={<Clock className="h-6 w-6" />}
          label="Temps gagné"
          value={`${totalSheets * 2}h`}
          trend="Estimation IA"
          color="emerald"
        />
        <StatCard 
          icon={<BookOpen className="h-6 w-6" />}
          label="Classes"
          value={levels}
          trend="Niveaux actifs"
          color="amber"
        />
        <StatCard 
          icon={<TrendingUp className="h-6 w-6" />}
          label="Productivité"
          value="Pro"
          trend="Statut du compte"
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-blue-600" />
              Activités Récentes
            </h3>
            <Link to="/library" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Voir toute la bibliothèque
            </Link>
          </div>
          
          <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {recentSheets.length === 0 ? (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                    <FileText className="h-8 w-8" />
                  </div>
                  <p className="text-slate-400 font-medium">Aucune fiche créée pour le moment.</p>
                  <Link to="/generate">
                    <Button variant="outline" size="sm">Créer ma première fiche</Button>
                  </Link>
                </div>
              ) : (
                recentSheets.map((sheet) => (
                  <div 
                    key={sheet.id} 
                    onClick={() => navigate(`/generate/${sheet.id}`)}
                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-5">
                      <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform border border-blue-100">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sheet.topic}</h4>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">{sheet.subject}</span>
                          <span className="text-xs text-slate-400 font-medium">• {sheet.level} • {new Date(sheet.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Ouvrir l'éditeur</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips / Sidebar Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900">Astuces Pro</h3>
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100">
            <Sparkles className="absolute top-[-10px] right-[-10px] h-24 w-24 text-white/10" />
            <h4 className="text-lg font-bold mb-4 relative z-10">Optimisez vos fiches</h4>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6 relative z-10">
              Plus vous donnez de détails sur le thème du cours, plus l'IA sera précise dans les activités proposées.
            </p>
            <Button variant="glass" size="sm" className="w-full">
              En savoir plus
            </Button>
          </div>
          
          <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 space-y-4">
            <h4 className="font-bold text-slate-900">Support MEMP</h4>
            <p className="text-sm text-slate-500">Nos modèles sont mis à jour selon les dernières directives de l'inspection 2024-2025.</p>
            <div className="pt-2">
              <div className="flex items-center text-xs font-bold text-emerald-600">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                Service Opérationnel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: { icon: any, label: string, value: string, trend: string, color: string }) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100"
  };

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-2xl border ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
          {trend}
        </div>
      </div>
    </div>
  );
}
