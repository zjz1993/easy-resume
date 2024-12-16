import type { Resume } from '../types/resume';

export const validateResume = (resume: Resume): boolean => {
  if (!resume || typeof resume !== 'object') return false;
  if (!resume.personalInfo) return false;
  
  const { personalInfo } = resume;
  const requiredFields = ['fullName', 'email', 'phone', 'location', 'summary'];
  
  return requiredFields.every(field => 
    typeof personalInfo[field as keyof typeof personalInfo] === 'string' &&
    personalInfo[field as keyof typeof personalInfo].trim() !== ''
  );
};

export const getValidationErrors = (resume: Resume): string[] => {
  const errors: string[] = [];
  
  if (!resume || typeof resume !== 'object') {
    errors.push('Resume data is missing or invalid');
    return errors;
  }

  if (!resume.personalInfo) {
    errors.push('Personal information is missing');
    return errors;
  }

  const { personalInfo } = resume;
  const requiredFields = ['fullName', 'email', 'phone', 'location', 'summary'];
  
  requiredFields.forEach(field => {
    const value = personalInfo[field as keyof typeof personalInfo];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  });

  return errors;
};