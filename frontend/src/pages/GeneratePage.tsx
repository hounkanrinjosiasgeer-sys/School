import React, { useState } from 'react';
import { Button } from '../components/Button';
import { 
  Wand2, 
  BookOpen, 
  Users, 
  Clock, 
  FileText,
  Sparkles,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { generateLessonPlan } from '../services/gemini';

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    level: 'CM1',
    subject: 'Mathématiques',
    topic: '',
    duration: '1h'
  });

  const levels = ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2'];
  const subjects = [
    'Mathématiques', 
    'Français / Lecture', 
    'Eveil (Histoire-Géo)', 
    'Sciences et Technologie', 
    'Education Civique', 
    'Arts Plastiques',
    'EPS'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const prompt = `Génère une fiche de préparation de cours détaillée pour une classe de ${formData.level} au Bénin.
    Matière: ${formData.subject}
    Thème du cours: ${formData.topic}
    Durée: ${formData.duration}
    
    La fiche doit respecter le format officiel MEMP (Ministère des Enseignements Maternel et Primaire) avec:
    1. Objectifs pédagogiques
    2. Matériel nécessaire
    3. Déroulement de la séance (Introduction, Développement, Synthèse/Conclusion)
    4. Evaluation des acquis.
    
    Rédige en français, avec un ton professionnel et pédagogique adapté au contexte béninois.`;

    try {
      const generatedText = await generateLessonPlan(prompt);
      setResult(generatedText);
    } catch (error) {
      alert("Erreur lors de la génération. Vérifiez votre clé API dans le fichier .env");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-12 w-full min-h-screen">
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
              <div className="flex items-center mb-6 text-blue-600">
                <Wand2 className="h-5 w-5 mr-2" />
                <h3 className="font-bold text-lg">Paramètres</h3>
              </div>

              <form onSubmit={handleGenerate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" /> Classe
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" /> Matière
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" /> Thème du cours
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: La photosynthèse"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" /> Durée
                  </label>
                  <input 
                    type="text"
                    placeholder="Ex: 45 min"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Générer la fiche
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-2">
            <div className="bg-white min-h-[600px] rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col">
              {!result && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Sparkles className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Prêt à créer ?</h3>
                  <p className="max-w-xs">
                    Remplissez le formulaire et laissez l'IA FichePro rédiger votre contenu pédagogique.
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                  <p className="text-gray-600 animate-pulse font-medium">L'IA prépare votre fiche de cours...</p>
                </div>
              )}

              {result && (
                <div className="prose prose-blue max-w-none">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-900 m-0">Aperçu de la fiche</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => window.print()}>Imprimer</Button>
                      <Button>Enregistrer</Button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed bg-blue-50 p-6 rounded-lg border border-blue-100">
                    {result}
                  </pre>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
