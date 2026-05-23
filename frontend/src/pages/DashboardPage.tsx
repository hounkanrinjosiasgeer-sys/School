import React from 'react';
import { Button } from '../components/Button';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  ChevronRight, 
  BookOpen
} from 'lucide-react';
import { useSheets } from '../hooks/useSheets';
import { useNavigate, Link } from 'react-router-dom';

export default function DashboardPage() {
  const { sheets } = useSheets();
  const navigate = useNavigate();

  const recentSheets = sheets.slice(0, 3);
  const totalSheets = sheets.length;
  
  // Calculate unique levels
  const levels = Array.from(new Set(sheets.map(s => s.level))).join(' / ') || 'Aucun';

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bonjour, M. Kodjo 👋</h2>
              <p className="text-gray-600">Prêt à préparer vos cours pour demain ?</p>
            </div>
            <Link to="/generate">
              <Button className="flex items-center py-2.5">
                <PlusCircle className="mr-2 h-5 w-5" />
                Nouvelle fiche
              </Button>
            </Link>
          </div>

          {/* Stats / Quick Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{totalSheets}</span>
              </div>
              <p className="text-gray-600 font-medium">Fiches créées</p>
              <p className="text-xs text-gray-400 mt-1">Total enregistré</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{totalSheets * 2}h</span>
              </div>
              <p className="text-gray-600 font-medium">Temps gagné</p>
              <p className="text-xs text-gray-400 mt-1">Estimation IA (2h/fiche)</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900 truncate max-w-[150px]">{levels}</span>
              </div>
              <p className="text-gray-600 font-medium">Niveaux</p>
              <p className="text-xs text-gray-400 mt-1">Classes couvertes</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 font-title">Fiches récentes</h3>
              <Link to="/library" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentSheets.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  Aucune fiche récente. Commencez par en créer une !
                </div>
              ) : (
                recentSheets.map((sheet) => (
                  <div 
                    key={sheet.id} 
                    onClick={() => navigate(`/generate/${sheet.id}`)}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-gray-500 mr-4">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{sheet.topic}</h4>
                        <p className="text-sm text-gray-500">{sheet.subject} • {sheet.level} • {new Date(sheet.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
