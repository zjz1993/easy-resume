import { jsPDF } from 'jspdf';
import type { Resume, Education, Experience, Skill } from '../types/resume';
import { validateResume, getValidationErrors } from './validation';
import { MARGIN, LINE_HEIGHT, applyHeaderStyle, applySubheaderStyle, applyNormalStyle } from './pdfStyles';
import { addFonts } from './fonts';

interface PDFContext {
  doc: jsPDF;
  yPos: number;
}

const addPersonalInfo = (ctx: PDFContext, personalInfo: Resume['personalInfo']) => {
  const { doc, yPos: startY } = ctx;
  let yPos = startY;

  applyHeaderStyle(doc);
  doc.text(personalInfo.fullName, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  applyNormalStyle(doc);
  yPos += LINE_HEIGHT;
  
  const contactInfo = `${personalInfo.email} | ${personalInfo.phone}`;
  doc.text(contactInfo, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += LINE_HEIGHT;
  doc.text(personalInfo.location, doc.internal.pageSize.width / 2, yPos, { align: 'center' });
  
  yPos += LINE_HEIGHT * 2;
  const summaryLines = doc.splitTextToSize(personalInfo.summary, doc.internal.pageSize.width - MARGIN * 2);
  doc.text(summaryLines, MARGIN, yPos);
  
  return yPos + LINE_HEIGHT * (summaryLines.length + 1);
};

const addEducation = (ctx: PDFContext, education: Education[]) => {
  if (education.length === 0) return ctx.yPos;
  
  const { doc, yPos: startY } = ctx;
  let yPos = startY;

  applySubheaderStyle(doc);
  doc.text("教育经历", MARGIN, yPos);
  applyNormalStyle(doc);
  yPos += LINE_HEIGHT;

  education.forEach(edu => {
    doc.setFont("NotoSansSC", "bold");
    doc.text(edu.school, MARGIN, yPos);
    doc.setFont("NotoSansSC", "normal");
    doc.text(`${edu.startDate} - ${edu.endDate}`, doc.internal.pageSize.width - MARGIN, yPos, { align: 'right' });
    yPos += LINE_HEIGHT;
    doc.text(`${edu.degree} ${edu.field}`, MARGIN, yPos);
    yPos += LINE_HEIGHT * 1.5;
  });

  return yPos;
};

const addExperience = (ctx: PDFContext, experience: Experience[]) => {
  if (experience.length === 0) return ctx.yPos;
  
  const { doc, yPos: startY } = ctx;
  let yPos = startY;

  applySubheaderStyle(doc);
  doc.text("工作经验", MARGIN, yPos);
  applyNormalStyle(doc);
  yPos += LINE_HEIGHT;

  experience.forEach(exp => {
    doc.setFont("NotoSansSC", "bold");
    doc.text(exp.position, MARGIN, yPos);
    doc.setFont("NotoSansSC", "normal");
    doc.text(`${exp.startDate} - ${exp.endDate}`, doc.internal.pageSize.width - MARGIN, yPos, { align: 'right' });
    yPos += LINE_HEIGHT;
    doc.text(exp.company, MARGIN, yPos);
    yPos += LINE_HEIGHT;
    const descLines = doc.splitTextToSize(exp.description, doc.internal.pageSize.width - MARGIN * 2);
    doc.text(descLines, MARGIN, yPos);
    yPos += LINE_HEIGHT * (descLines.length + 1);
  });

  return yPos;
};

const addSkills = (ctx: PDFContext, skills: Skill[]) => {
  if (skills.length === 0) return ctx.yPos;
  
  const { doc, yPos: startY } = ctx;
  let yPos = startY;

  applySubheaderStyle(doc);
  doc.text("技能", MARGIN, yPos);
  applyNormalStyle(doc);
  yPos += LINE_HEIGHT;

  const skillLevels = ['入门', '熟练', '精通', '专家', '大师'];
  skills.forEach(skill => {
    doc.text(`${skill.name} - ${skillLevels[skill.level - 1]}`, MARGIN, yPos);
    yPos += LINE_HEIGHT;
  });

  return yPos;
};

export const generatePDF = (resume: Resume) => {
  if (!validateResume(resume)) {
    const errors = getValidationErrors(resume);
    throw new Error(`Invalid resume data: ${errors.join(', ')}`);
  }

  const doc = new jsPDF();
  addFonts(doc);
  
  let ctx: PDFContext = { doc, yPos: 20 };

  ctx.yPos = addPersonalInfo(ctx, resume.personalInfo);
  ctx.yPos += LINE_HEIGHT;
  ctx.yPos = addEducation(ctx, resume.education);
  ctx.yPos += LINE_HEIGHT;
  ctx.yPos = addExperience(ctx, resume.experience);
  ctx.yPos += LINE_HEIGHT;
  ctx.yPos = addSkills(ctx, resume.skills);

  doc.save('resume.pdf');
};