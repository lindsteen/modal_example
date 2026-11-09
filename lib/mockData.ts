import type { Volunteer } from './types';

// Opdigtet frivillig til demoen, med de samme oplysninger som i prototypen.

export const mockVolunteer: Volunteer = {
  id: 'cynthia-chavez',
  personal: {
    firstName: 'Cynthia',
    lastName: 'Chavez',
    birthDate: '09.02.1951',
    gender: 'Ukendt',
    address: 'Solhøjen 22',
    postalCode: '8381',
    city: 'Tilst',
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
