import { useState } from 'react';
import { Button } from '../components/Button';
import { Phone, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { phone, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <span className="text-2xl font-black">F</span>
            </div>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Bon retour !
            </h2>
            <p className="text-slate-500 font-medium">
              Heureux de vous revoir sur FichePro.
            </p>
          </div>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                <Phone className="h-3 w-3 mr-2" /> Numéro de téléphone
              </label>
              <input
                id="phone"
                type="tel"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                placeholder="+229 00 00 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <Lock className="h-3 w-3 mr-2" /> Mot de passe
                </label>
                <a href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-tighter hover:underline">
                  Oublié ?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700 transition-all placeholder:text-slate-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full h-16 shadow-xl shadow-blue-100 group">
            Se connecter
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-10 text-center relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold">Nouveau ici ?</span>
          </div>
          <p className="mt-6 text-sm font-bold text-slate-600">
            <Link to="/register" className="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Créer un compte gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
