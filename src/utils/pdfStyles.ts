import type { jsPDF } from 'jspdf';

export const MARGIN = 20;
export const LINE_HEIGHT = 7;

export const applyHeaderStyle = (doc: jsPDF) => {
  doc.setFont("NotoSansSC", "bold");
  doc.setFontSize(20);
};

export const applySubheaderStyle = (doc: jsPDF) => {
  doc.setFont("NotoSansSC", "bold");
  doc.setFontSize(14);
};

export const applyNormalStyle = (doc: jsPDF) => {
  doc.setFont("NotoSansSC", "normal");
  doc.setFontSize(11);
};