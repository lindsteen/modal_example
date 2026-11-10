// Datamodel for en frivillig i en aktivitet.
// Antagelse: felterne er udledt af prototypen. De rigtige navne kommer fra MRK's API mod Dynamics 365 (fx GetPerson).

export type Gender = 'Ukendt' | 'Kvinde' | 'Mand';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  /** Vises som dd.mm.åååå, som i prototypen. */
  birthDate: string;
  gender: Gender;
  address: string;
  postalCode: string;
  city: string;
  mobile: string;
  otherPhone: string;
  /** Telefonnummer, som den frivillige selv har givet samtykke til at vise. Kan ikke rettes af andre. */
  consentPhone: string;
  email: string;
  loginEmail: string;
  /** E-mailadresse, som den frivillige selv har givet samtykke til at vise. Kan ikke rettes af andre. */
  consentEmail: string;
}

export interface VolunteerRole {
  id: string;
  /** Fx "Aktivitetsleder" eller "Frivillig". */
  title: string;
  /** Fx "Nørklere, Aarhus." */
  activityName: string;
  startDate: string;
  taskNotes: string;
  childCertificateRequired: boolean;
}

export interface GeneralVolunteerInfo {
  redCrossStartDate: string;
  seniority: string;
  agreementApproved: string | null;
  childCertificateDate: string | null;
  idCardIssuedDate: string | null;
}

export interface Course {
  id: string;
  name: string;
  completedDate: string;
}

export interface Volunteer {
  id: string;
  personal: PersonalInfo;
  roles: VolunteerRole[];
  general: GeneralVolunteerInfo;
  courses: Course[];
}

export const fullName = (p: PersonalInfo) => `${p.firstName} ${p.lastName}`;
