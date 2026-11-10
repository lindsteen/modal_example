import type { Volunteer } from './types';

// Opdigtede personer til demoen.

/** Frivillig med de samme oplysninger som i prototypen. */
export const mockVolunteer: Volunteer = {
  id: 'cynthia-chavez',
  kind: 'volunteer',
  personal: {
    firstName: 'Cynthia',
    lastName: 'Chavez',
    birthDate: '09.02.1951',
    gender: 'Ukendt',
    address: 'Solhøjen 22',
    postalCode: '8381',
    city: 'Tilst',
    mobile: '23 45 67 89',
    otherPhone: '',
    consentPhone: '',
    email: 'cynthia.chavez@eksempel.dk',
    loginEmail: 'cynthia.chavez@eksempel.dk',
    consentEmail: '',
  },
  roles: [
    {
      id: 'cynthia-1',
      title: 'Aktivitetsleder',
      activityName: 'Nørklere, Aarhus.',
      startDate: '05.03.2019',
      taskNotes: '',
      childCertificateRequired: false,
    },
    {
      id: 'cynthia-2',
      title: 'Frivillig',
      activityName: 'Nørklere, Aarhus.',
      startDate: '11.10.2021',
      taskNotes: '',
      childCertificateRequired: false,
    },
  ],
  general: {
    redCrossStartDate: '13. december 2004',
    seniority: '21 år',
    agreementApproved: null,
    childCertificateDate: null,
    idCardIssuedDate: null,
  },
  courses: [],
};

/** Medlem af afdelingen, som endnu ikke er frivillig. */
export const mockMember: Volunteer = {
  id: 'birthe-holm',
  kind: 'member',
  personal: {
    firstName: 'Birthe',
    lastName: 'Holm',
    birthDate: '27.05.1968',
    gender: 'Kvinde',
    address: 'Vestergade 31',
    postalCode: '5000',
    city: 'Odense C',
    mobile: '34 56 78 90',
    otherPhone: '',
    consentPhone: '',
    email: 'birthe.holm@eksempel.dk',
    loginEmail: '',
    consentEmail: '',
  },
  roles: [],
  general: {
    redCrossStartDate: '',
    seniority: '',
    agreementApproved: null,
    childCertificateDate: null,
    idCardIssuedDate: null,
  },
  courses: [],
};
