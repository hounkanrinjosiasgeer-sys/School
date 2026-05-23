import React from 'react';
import { Button } from '../components/Button';
import { Sparkles, CheckCircle, Smartphone, Zap, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🎓</span>
          <span className="text-xl font-bold text-gray-900">FichePro Bénin</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium">Connexion</a>
          <a href="/register">
            <Button>Essayer gratuitement</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Préparez vos cours en <span className="text-blue-600">30 secondes</span>, pas en 2 heures.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              L'assistant intelligent qui aide les enseignants béninois à générer des fiches de préparation conformes au format officiel du MEMP.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 py-4 text-lg flex items-center justify-center">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="text-sm text-gray-500">Sans engagement • 1 mois gratuit</p>
            </div>
          </div>
        </div>
        {/* Background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Pourquoi choisir FichePro ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vitesse Éclair</h3>
              <p className="text-gray-600">Générez une fiche complète (objectifs, déroulement, évaluation) en moins de 30 secondes grâce à l'IA.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">100% Conforme</h3>
              <p className="text-gray-600">Toutes les fiches respectent strictement le format officiel exigé par l'inspection du MEMP au Bénin.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Optimisé Mobile</h3>
              <p className="text-gray-600">Conçu pour fonctionner parfaitement sur smartphone, même avec une connexion 3G limitée.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-8 italic">
            "FichePro a changé ma vie d'enseignant. Je passe mes soirées avec ma famille au lieu de rédiger des fiches."
          </h2>
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
              M
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">M. Moussa</p>
              <p className="text-gray-500 text-sm">Instituteur à Porto-Novo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center text-white mb-6">
            <span className="text-2xl mr-2">🎓</span>
            <span className="text-xl font-bold">FichePro Bénin</span>
          </div>
          <p className="mb-4">© 2026 FichePro Bénin. Tous droits réservés.</p>
          <p className="text-sm">Une solution EdTech pour l'avenir de l'éducation au Bénin.</p>
        </div>
      </footer>
    </div>
  );
}
