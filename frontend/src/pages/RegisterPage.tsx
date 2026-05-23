import { useState } from 'react';
import { Button } from '../components/Button';
import { Phone, Lock, User, School, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    school: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      navigate('/dashboard');
    } else {
      alert('Veuillez entrer un code à 4 chiffres.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white relative z-10">
          <div className="text-center space-y-4">
            <div className="mx-auto h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
              <Phone className="h-10 w-10 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Vérification</h2>
              <p className="text-slate-500 font-medium">Code envoyé au <span className="text-blue-600 font-bold">{formData.phone}</span></p>
            </div>
          </div>
          
          <form className="mt-10 space-y-8" onSubmit={handleVerifyOtp}>
            <div className="space-y-4">
              <label htmlFor="otp" className="text-xs font-black text-slate-400 uppercase tracking-widest block text-center">
                Code à 4 chiffres
              </label>
              <div className="flex justify-center">
                <input
                  id="otp"
                  maxLength={4}
                  required
                  className="w-48 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-5 focus:ring-4 focus:ring-blue-100 outline-none text-center text-4xl font-black tracking-[0.5em] text-blue-600 transition-all"
                  placeholder="0000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button type="submit" size="lg" className="w-full h-16 shadow-xl shadow-blue-100">
                Confirmer
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </Button>
              
              <button 
                type="button"
                onClick={() => setStep('register')}
                className="w-full text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Modifier le numéro
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <span className="text-2xl font-black">F</span>
            </div>
          </Link>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Créer un compte
            </h2>
            <p className="text-slate-500 font-medium italic">
              "L'éducation est l'arme la plus puissante."
            </p>
          </div>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormGroup label="Nom complet" icon={<User className="h-3 w-3" />}>
              <input
                name="fullName"
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                placeholder="M. Koffi Mensah"
                value={formData.fullName}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup label="Téléphone" icon={<Phone className="h-3 w-3" />}>
              <input
                name="phone"
                type="tel"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                placeholder="+229 00 00 00 00"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup label="Établissement" icon={<School className="h-3 w-3" />}>
              <input
                name="school"
                type="text"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                placeholder="EPP Akpakpa Centre"
                value={formData.school}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup label="Mot de passe" icon={<Lock className="h-3 w-3" />}>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full h-16 shadow-xl shadow-blue-100 group">
              Commencer l'aventure
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-slate-600">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FormGroup({ label, icon, children }: { label: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
        <span className="mr-2">{icon}</span> {label}
      </label>
      {children}
    </div>
  );
}
