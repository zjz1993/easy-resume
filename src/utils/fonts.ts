import { jsPDF } from 'jspdf';

// Add custom font to jsPDF
export const addFonts = (doc: jsPDF) => {
  doc.addFileToVFS('NotoSansSC-Regular.ttf', notoSansRegular());
  doc.addFileToVFS('NotoSansSC-Bold.ttf', notoSansBold());
  doc.addFont('NotoSansSC-Regular.ttf', 'NotoSansSC', 'normal');
  doc.addFont('NotoSansSC-Bold.ttf', 'NotoSansSC', 'bold');
};

// Base64 encoded font data (truncated for brevity)
function notoSansRegular() {
  return `AAEAAAASAQAABAAgR0RFRgBKAAgAAAHMAAAAKEdQT1MF...`;
}

function notoSansBold() {
  return `AAEAAAASAQAABAAgR0RFRgBKAAgAAAHMAAAAKEdQT1MF...`;
}