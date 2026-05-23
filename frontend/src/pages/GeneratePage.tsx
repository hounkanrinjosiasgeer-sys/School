import { useState, useEffect } from 'react';
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
  BarChart,
  ChevronLeft,
  Share2,
  Trash2
} from 'lucide-react';
import { generateLessonPlan, generateExercises } from '../services/gemini';
import { useSheets } from '../hooks/useSheets';
import { exportToPDF } from '../services/pdf';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function GeneratePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { saveSheet, getSheet, deleteSheet } = useSheets();
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
          difficulty: 'Moyen'
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
      alert("Erreur lors de la génération. Vérifiez votre clé API.");
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

  const handleDelete = () => {
    if (currentId && window.confirm("Supprimer cette fiche définitivement ?")) {
      deleteSheet(currentId);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <h2 className="font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
            {formData.topic || "Nouvelle Fiche"}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {currentId && (
            <button onClick={handleDelete} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="h-5 w-5" />
            </button>
          )}
          <Button size="sm" onClick={handleSave} disabled={!result} className="shadow-sm">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: Form */}
        <aside className="w-full lg:w-[400px] bg-white border-r border-slate-200 overflow-y-auto p-8 space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Configuration</h3>
            <p className="text-sm text-slate-500">Définissez les paramètres de votre cours.</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormGroup label="Classe" icon={<Users className="h-4 w-4" />}>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </FormGroup>
                <FormGroup label="Durée" icon={<Clock className="h-4 w-4" />}>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </FormGroup>
              </div>

              <FormGroup label="Matière" icon={<BookOpen className="h-4 w-4" />}>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormGroup>

              <FormGroup label="Thème du cours" icon={<FileText className="h-4 w-4" />}>
                <input 
                  type="text"
                  required
                  placeholder="Ex: La photosynthèse"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </FormGroup>

              <div className="pt-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block flex items-center">
                  <BarChart className="h-3 w-3 mr-2" /> Difficulté des exercices
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFormData({...formData, difficulty: d})}
                      className={`py-2.5 rounded-xl border text-sm font-bold transition-all ${
                        formData.difficulty === d 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 text-lg"
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
        </aside>

        {/* Main Content: Preview */}
        <main className="flex-1 overflow-y-auto p-4 md:p-12">
          {!result && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center text-blue-600">
                <Wand2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Studio de Création</h3>
                <p className="text-slate-500 leading-relaxed">
                  Configurez vos paramètres à gauche et laissez l'IA générer votre fiche pédagogique optimisée pour le Bénin.
                </p>
              </div>
            </div>
          ) : loading ? (
             <div className="h-full flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-blue-100 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
                </div>
                <p className="text-slate-900 font-black animate-pulse text-xl">L'IA rédige votre fiche...</p>
             </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2">
                   <span className="text-xs font-black text-slate-400 px-3 uppercase tracking-widest">Document prêt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => exportToPDF({
                    ...formData, id: currentId || 'temp', title: formData.topic, content: result, exercises: exercises,
                    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
                  })}>
                    <Download className="h-4 w-4 mr-2" /> PDF
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    const text = `Fiche: ${formData.topic}\n\n${result}\n\nExercices:\n${exercises}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }} className="text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                    <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleGenerateExercises} disabled={loadingExercises}>
                    {loadingExercises ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Dumbbell className="h-4 w-4 mr-2" />}
                    Exercices
                  </Button>
                </div>
              </div>

              {/* Document Editor Area */}
              <div className="space-y-6">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                   <div className="h-2 bg-blue-600 w-full"></div>
                   <div className="p-10 space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                        <div className="space-y-1">
                          <h1 className="text-3xl font-black text-slate-900">{formData.topic}</h1>
                          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">{formData.subject} • {formData.level}</p>
                        </div>
                        <div className="text-right text-slate-400 text-xs font-bold uppercase tracking-tighter">
                          Format Officiel MEMP
                        </div>
                      </div>
                      <textarea 
                        className="w-full h-[600px] py-4 bg-transparent font-sans text-slate-700 text-lg leading-relaxed focus:outline-none resize-none"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                      />
                   </div>
                </div>

                {exercises && (
                  <div className="bg-emerald-50/50 rounded-[2rem] border border-emerald-100 p-10 space-y-6 animate-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex items-center space-x-3 text-emerald-700">
                      <Dumbbell className="h-6 w-6" />
                      <h3 className="text-xl font-black">Exercices d'application</h3>
                    </div>
                    <textarea 
                      className="w-full h-[400px] bg-transparent font-sans text-slate-700 text-lg leading-relaxed focus:outline-none resize-none"
                      value={exercises}
                      onChange={(e) => setExercises(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FormGroup({ label, icon, children }: { label: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
        <span className="mr-2 opacity-50">{icon}</span> {label}
      </label>
      {children}
    </div>
  );
}
