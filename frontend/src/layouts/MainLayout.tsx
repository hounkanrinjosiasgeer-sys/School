import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusCircle,
  Sparkles
} from 'lucide-react';

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { to: '/library', icon: BookOpen, label: 'Ma Bibliothèque' },
    { to: '/profile', icon: Settings, label: 'Mon Profil' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans selection:bg-blue-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <span className="text-sm font-bold">F</span>
          </div>
          <span className="font-black text-slate-900 tracking-tight">FichePro</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-0 z-40 md:relative md:z-auto
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        w-72 bg-white border-r border-slate-200 flex flex-col shadow-2xl shadow-slate-200/50 md:shadow-none
      `}>
        <div className="p-8 hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <span className="text-xl font-bold">F</span>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">FichePro</span>
          </div>
        </div>

        <div className="px-6 mb-6">
          <NavLink to="/generate" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-blue-100 transition-all active:scale-95 group">
              <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-bold">Créer une fiche</span>
            </div>
          </NavLink>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Menu Principal</span>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon className={`mr-3 h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative overflow-hidden group">
            <Sparkles className="absolute -right-2 -top-2 h-12 w-12 text-blue-100 group-hover:rotate-12 transition-transform" />
            <p className="text-xs font-bold text-slate-900 mb-1">Passer au Premium</p>
            <p className="text-[10px] text-slate-500 mb-3">Accès illimité à l'IA</p>
            <button className="text-[10px] font-black text-blue-600 underline">En savoir plus</button>
          </div>
          
          <button className="flex items-center w-full px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold group">
            <LogOut className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
