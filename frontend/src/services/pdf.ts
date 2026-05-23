import { jsPDF } from "jspdf";
import { Sheet } from "../types";

export const exportToPDF = (sheet: Sheet) => {
  const doc = new jsPDF();
  const margin = 20;
  let cursorY = margin;

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(sheet.title || sheet.topic, margin, cursorY);
  cursorY += 10;

  // Metadata
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Classe: ${sheet.level} | Matière: ${sheet.subject} | Durée: ${sheet.duration}`, margin, cursorY);
  cursorY += 15;

  // Content
  doc.setFontSize(12);
  const splitContent = doc.splitTextToSize(sheet.content, 170);
  
  splitContent.forEach((line: string) => {
    if (cursorY > 280) {
      doc.addPage();
      cursorY = margin;
    }
    doc.text(line, margin, cursorY);
    cursorY += 7;
  });

  if (sheet.exercises) {
    if (cursorY > 260) {
      doc.addPage();
      cursorY = margin;
    } else {
      cursorY += 10;
    }
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Exercices", margin, cursorY);
    cursorY += 10;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const splitExercises = doc.splitTextToSize(sheet.exercises, 170);
    splitExercises.forEach((line: string) => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += 7;
    });
  }

  doc.save(`${sheet.topic.replace(/\s+/g, '_')}_fiche.pdf`);
};
