import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { 
  Wand2, 
  BookOpen, 
  Users, 
  Clock, 
  FileText,
  Sparkles,
  Loader2,
  Save,
  Download,
  Dumbbell,
  MessageCircle,
  BarChart
} from 'lucide-react';
import { generateLessonPlan, generateExercises } from '../services/gemini';
import { useSheets } from '../hooks/useSheets';
import { exportToPDF } from '../services/pdf';
import { useParams, useNavigate } from 'react-router-dom';

export default function GeneratePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveSheet, getSheet } = useSheets();
  const [loading, setLoading] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [result, setResult] = useState('');
  const [exercises, setExercises] = useState('');
  const [currentId, setCurrentId] = useState<string | undefined>(id);
  const [formData, setFormData] = useState({
    level: 'CM1',
    subject: 'Mathématiques',
    topic: '',
    duration: '1h',
    difficulty: 'Moyen'
  });

  useEffect(() => {
    if (id) {
      const sheet = getSheet(id);
      if (sheet) {
        setFormData({
          level: sheet.level,
          subject: sheet.subject,
          topic: sheet.topic,
          duration: sheet.duration,
          difficulty: 'Moyen' // Default if not saved
        });
        setResult(sheet.content);
        setExercises(sheet.exercises || '');
        setCurrentId(id);
      }
    }
  }, [id, getSheet]);

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
  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setExercises('');
    setCurrentId(undefined);
    
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

  const handleGenerateExercises = async () => {
    if (!result) return;
    setLoadingExercises(true);
    try {
      const generatedExercises = await generateExercises(result, formData.difficulty);
      setExercises(generatedExercises);
    } catch (error) {
      alert("Erreur lors de la génération des exercices.");
      console.error(error);
    } finally {
      setLoadingExercises(false);
    }
  };

  const handleSave = () => {
    const sheetId = saveSheet({
      ...formData,
      title: formData.topic,
      content: result,
      exercises: exercises,
      id: currentId
    });
    setCurrentId(sheetId);
    alert("Fiche enregistrée avec succès !");
  };

  const handleExportPDF = () => {
    exportToPDF({
      ...formData,
      id: currentId || 'temp',
      title: formData.topic,
      content: result,
      exercises: exercises,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const handleShareWhatsApp = () => {
    const text = `Fiche de cours: ${formData.topic}\nClasse: ${formData.level}\nMatière: ${formData.subject}\n\n${result}\n\nExercices:\n${exercises}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-gray-400" /> Difficulté des exercices
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {difficulties.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setFormData({...formData, difficulty: d})}
                        className={`py-2 px-1 text-xs rounded-lg border transition-all ${
                          formData.difficulty === d 
                            ? 'bg-blue-600 border-blue-600 text-white font-bold' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
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
                      {currentId ? "Régénérer la fiche" : "Générer la fiche"}
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
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-900 m-0">
                      {currentId ? "Édition de la fiche" : "Aperçu de la fiche"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleExportPDF} className="flex items-center">
                        <Download className="h-4 w-4 mr-2" /> PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShareWhatsApp} className="flex items-center text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50">
                        <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleGenerateExercises} disabled={loadingExercises} className="flex items-center">
                        {loadingExercises ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Dumbbell className="h-4 w-4 mr-2" />}
                        Exercices
                      </Button>
                      <Button size="sm" onClick={handleSave} className="flex items-center">
                        <Save className="h-4 w-4 mr-2" /> Enregistrer
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contenu de la fiche</label>
                    <textarea 
                      className="w-full h-[500px] p-6 rounded-lg border border-blue-100 bg-blue-50 font-sans text-gray-800 text-lg leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                    />
                  </div>

                  {exercises && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Dumbbell className="h-4 w-4 mr-2 text-blue-600" /> Exercices suggérés ({formData.difficulty})
                      </label>
                      <textarea 
                        className="w-full h-[300px] p-6 rounded-lg border border-green-100 bg-green-50 font-sans text-gray-800 text-lg leading-relaxed focus:ring-2 focus:ring-green-500 outline-none resize-none"
                        value={exercises}
                        onChange={(e) => setExercises(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
