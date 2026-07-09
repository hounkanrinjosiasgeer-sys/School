import { GoogleGenAI } from "@google/genai";

// Il est fortement recommandé d'utiliser une variable d'environnement pour la clé API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

// ============================================================
// PROMPT SYSTÈME BASÉ SUR LE FORMAT OFFICIEL MEMP BÉNIN
// (Extrait et analysé à partir de vraies fiches de préparation)
// ============================================================
const SYSTEM_PROMPT_MEMP = `Tu es un expert en pédagogie béninoise et tu maîtrises parfaitement le format officiel de fiche de préparation de cours du Ministère des Enseignements Maternel et Primaire (MEMP) du Bénin.

Quand on te demande de générer une fiche, tu dois TOUJOURS respecter EXACTEMENT la structure suivante, qui est le format officiel utilisé dans les écoles primaires du Bénin :

---
[NOM DE LA MATIÈRE]
THÈME : [Thème général de la séquence]
Titre : [Titre précis de la leçon]
Cours : [Niveau : CI, CP1, CP2, CE1, CE2, CM1, CM2]          Date de déroulement : ___________

I. ÉLÉMENTS DE PLANIFICATION

1- Durée : [Durée]
2- Contenus de formation
   - Compétences disciplinaires : [Compétences disciplinaires spécifiques à la matière]
   - Compétences transversales : [N° des compétences transversales concernées]
   - Compétences transdisciplinaires : [N° des compétences transdisciplinaires]
3- Connaissances et techniques : [Savoirs et savoir-faire spécifiques de la leçon]
4- Stratégies d'enseignement/apprentissage/évaluation : Travail individuel, travail en groupe, travail collectif et résolution de problème.
5- Matériel : [Liste du matériel didactique nécessaire]
6- Objectif(s) de la séquence : L'apprenant apprendra à :
   • [Objectif 1 formulé avec un verbe d'action observable]
   • [Objectif 2]
   • [Objectif N...]

II. DÉROULEMENT

| Stratégies | Description |
|---|---|
| **INTRODUCTION** | |
| **a- Mise en situation et émergence des acquis antérieurs** | |
| Je fais | [Action de l'enseignant pour créer la situation déclenchante, rappel des prérequis] |
| Nous faisons | [Activité collective enseignant + élèves] |
| Tu fais | [Réponse/action individuelle attendue de l'apprenant] |
| **b- Proposition de nouvelles acquisitions** | |
| Je fais | Aujourd'hui, nous allons apprendre à [formulation de l'objet d'apprentissage]. Dis ce que tu veux apprendre. |
| Nous faisons | Les apprenants reprennent la proposition collectivement. |
| Tu fais | Chaque apprenant reprend la proposition. Chaque apprenant dit ce qu'il pense de l'objet d'étude. |
| **RÉALISATION (Construction de nouveaux savoirs)** | |
| **a- Activité de départ** | [Situation-problème ou activité de démarrage concrète, en lien avec la vie réelle] |
| Je fais | [L'enseignant présente la situation-problème ou le matériel] |
| Nous faisons | [Les apprenants participent collectivement à l'exploration] |
| Tu fais | [L'apprenant résout individuellement ou répond] |
| **b- Phase concrète** | [Manipulation d'objets réels, observation directe] |
| Je fais | [L'enseignant guide la manipulation du matériel concret] |
| Nous faisons | [Activité concrète collective] |
| Tu fais | [Réponse individuelle après manipulation] |
| **c- Phase semi-abstraite** | [Représentation par dessin, schéma, image] |
| Je fais | [L'enseignant dessine au tableau ou montre une représentation] |
| Nous faisons | [Les apprenants et le maître font la même chose] |
| Tu fais | [Réponses individuelles] |
| **d- Phase abstraite** | [Travail avec les symboles, chiffres, lettres, règles] |
| Je fais | [L'enseignant travaille au niveau symbolique/abstrait] |
| Nous faisons | [Activité collective au niveau abstrait] |
| Tu fais | [Chaque apprenant répond individuellement] |
| **RETOUR ET PROJECTION** | |
| **a- Objectivation** | L'enseignant pose la question aux apprenants et ils répondent. |
| Tu fais | - Dis ce que tu as appris ? / - Dis comment tu l'as appris ? / - Dis avec qui tu l'as appris ? / - As-tu rencontré des difficultés ? / - Dis comment tu es arrivé à surmonter ces difficultés ? |
| Nous faisons | Réponses données par plusieurs apprenants après le questionnement. |
| **b- Évaluation** | Chaque apprenant fait ce que le maître demande de faire. |
| Tu fais | [Exercice d'évaluation formative individuel] |
| **c- Réinvestissement** | |
| Tu fais | Dis ce que tu feras de ce que tu as appris. |
---

RÈGLES IMPORTANTES :
- Rédige TOUJOURS en français professionnel et pédagogique
- Les verbes d'objectifs doivent être OBSERVABLES (identifier, nommer, classer, résoudre, écrire, lire, calculer, distinguer, reconnaître, etc.)
- Le matériel doit être RÉALISTE et disponible dans les écoles béninoises (ardoises, craies, bâtonnets, images, cahiers, etc.)
- La situation de départ doit être ANCRÉE dans la vie quotidienne béninoise
- Adapte le vocabulaire et les exemples au contexte culturel béninois (noms locaux, situations familières)
- Pour les MATHÉMATIQUES : inclure des phases concrète, semi-abstraite et abstraite
- Pour le FRANÇAIS : adapter la structure selon le type (lecture, graphisme, expression orale, grammaire)
- Pour les SCIENCES : mettre l'accent sur l'observation et l'expérimentation avec matériel local
`;

export const generateLessonPlan = async (params: {
  level: string;
  subject: string;
  topic: string;
  duration: string;
}) => {
  if (!API_KEY) {
    throw new Error("Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY.");
  }

  const userPrompt = `Génère une fiche de préparation de cours COMPLÈTE et DÉTAILLÉE selon le format officiel MEMP du Bénin.

Paramètres :
- Classe : ${params.level}
- Matière : ${params.subject}
- Thème/Titre du cours : ${params.topic}
- Durée : ${params.duration}

La fiche doit être entièrement rédigée, avec toutes les sections remplies. Ne laisse aucune section vide. Les activités doivent être concrètes, adaptées au niveau ${params.level} et au contexte béninois.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT_MEMP,
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Erreur lors de la génération avec Gemini:", error);
    throw error;
  }
};

export const generateExercises = async (sheetContent: string, difficulty: string = 'Moyen') => {
  if (!API_KEY) {
    throw new Error("Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY.");
  }

  const prompt = `Tu es un enseignant expert au Bénin. En te basant sur cette fiche de cours :

${sheetContent}

Génère une série de 4 à 6 exercices VARIÉS et ADAPTÉS au niveau de la classe, pour évaluer les apprentissages.
Niveau de difficulté souhaité : ${difficulty}.

Types d'exercices à inclure (choisis selon la matière) :
- Questions à choix multiples (QCM)
- Exercices de complétion (à trous)
- Questions ouvertes courtes
- Problèmes à résoudre (pour les mathématiques)
- Exercices d'observation ou de classement

Pour chaque exercice, fournis aussi le CORRIGÉ pour l'enseignant.
Formate avec des numéros clairs. Rédige en français, dans un langage accessible aux élèves béninois du primaire.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.6,
        maxOutputTokens: 2048,
      },
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Erreur lors de la génération d'exercices:", error);
    throw error;
  }
};
