import React from 'react';
import { 
  User, 
  Mail, 
  School, 
  CreditCard, 
  ShieldCheck,
  Calendar,
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react';
import { Button } from '../components/Button';

export default function ProfilePage() {
  const user = {
    name: "M. KOUASSI Jean",
    email: "jean.kouassi@exemple.bj",
    school: "EPP Akpakpa Centre, Cotonou",
    joinedAt: "Janvier 2024",
    subscriptionStatus: "premium" // 'free' or 'premium'
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-blue-600 h-24 flex items-end justify-center pb-0">
               <div className="bg-white p-1 rounded-full translate-y-1/2 shadow-lg">
                  <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center text-blue-600">
                    <User className="h-10 w-10" />
                  </div>
               </div>
            </div>
            <div className="pt-14 pb-8 px-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm flex items-center justify-center mt-1">
                <Mail className="h-3 w-3 mr-1" /> {user.email}
              </p>
              
              <div className="mt-6 flex justify-center">
                {user.subscriptionStatus === 'premium' ? (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500" /> ABONNÉ PREMIUM
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    COMPTE GRATUIT
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center">
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </Button>
        </div>

        {/* Right Column - Details & Subscription */}
        <div className="md:col-span-2 space-y-6">
          {/* Professional Info */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" /> Informations Professionnelles
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center text-gray-600">
                  <School className="h-5 w-5 mr-3 text-gray-400" /> École
                </div>
                <div className="font-medium text-gray-900">{user.school}</div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" /> Membre depuis
                </div>
                <div className="font-medium text-gray-900">{user.joinedAt}</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 text-xs">Modifier mes infos</Button>
          </div>

          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <CreditCard className="h-40 w-40 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold opacity-90">Statut de l'abonnement</h3>
                  <p className="text-2xl font-black mt-1">Premium Illimité</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-400" /> Génération illimitée de fiches
                </div>
                <div className="flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-400" /> Module d'exercices IA
                </div>
                <div className="flex items-center text-sm">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-400" /> Export PDF haute qualité
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                <div>
                  <p className="text-xs opacity-70">Prochain renouvellement</p>
                  <p className="font-bold">15 Mars 2024</p>
                </div>
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 border-none shadow-lg">
                  Gérer via Mobile Money
                </Button>
              </div>
            </div>
          </div>

          {/* Help/Settings links */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-gray-100">
                <span className="font-medium text-gray-700">Paramètres du compte</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
             </button>
             <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left border-b border-gray-100">
                <span className="font-medium text-gray-700">Aide & Support technique</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
             </button>
             <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left">
                <span className="font-medium text-gray-700">Conditions Générales d'Utilisation</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
