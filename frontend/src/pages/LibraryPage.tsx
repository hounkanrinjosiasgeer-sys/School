import React, { useState } from 'react';
import { useSheets } from '../hooks/useSheets';
import { 
  BookOpen, 
  Users, 
  Search, 
  FileText, 
  Trash2, 
  Eye, 
  Download,
  Plus
} from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import { exportToPDF } from '../services/pdf';

export default function LibraryPage() {
  const { sheets, deleteSheet } = useSheets();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    level: '',
    subject: '',
    search: ''
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

  const filteredSheets = sheets.filter(sheet => {
    return (
      (filter.level === '' || sheet.level === filter.level) &&
      (filter.subject === '' || sheet.subject === filter.subject) &&
      (filter.search === '' || 
        sheet.topic.toLowerCase().includes(filter.search.toLowerCase()) ||
        sheet.subject.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Voulez-vous vraiment supprimer cette fiche ?")) {
      deleteSheet(id);
    }
  };

  const handleExport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const sheet = sheets.find(s => s.id === id);
    if (sheet) {
      exportToPDF(sheet);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ma Bibliothèque</h1>
          <p className="text-gray-500 mt-2">Retrouvez et gérez vos fiches de cours enregistrées.</p>
        </div>
        <Link to="/generate">
          <Button className="flex items-center">
            <Plus className="h-5 w-5 mr-2" /> Nouvelle Fiche
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Rechercher par thème..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
        </div>
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={filter.level}
          onChange={(e) => setFilter({...filter, level: e.target.value})}
        >
          <option value="">Toutes les classes</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={filter.subject}
          onChange={(e) => setFilter({...filter, subject: e.target.value})}
        >
          <option value="">Toutes les matières</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Sheets Grid */}
      {filteredSheets.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Aucune fiche trouvée</h3>
          <p className="text-gray-500">Commencez par générer votre première fiche de cours.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSheets.map(sheet => (
            <div 
              key={sheet.id}
              onClick={() => navigate(`/generate/${sheet.id}`)}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleExport(sheet.id, e)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600"
                    title="Exporter en PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(sheet.id, e)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600"
                    title="Supprimer"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{sheet.topic}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" /> {sheet.level}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-2" /> {sheet.subject}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t text-sm text-gray-400">
                <span>Mis à jour le {new Date(sheet.updatedAt).toLocaleDateString()}</span>
                <span className="flex items-center text-blue-600 font-medium">
                  Voir <Eye className="h-4 w-4 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
