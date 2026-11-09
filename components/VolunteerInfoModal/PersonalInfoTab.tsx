import { useState, type FormEvent } from 'react';
import { Heading } from '@/components/Heading/Heading';
import { Select } from '@/components/Select/Select';
import { TextInput } from '@/components/TextInput/TextInput';
import type { Gender, PersonalInfo } from '@/lib/types';
import { FormActions } from './FormActions';

const GENDERS = [
  { value: 'Ukendt', label: 'Ukendt' },
  { value: 'Kvinde', label: 'Kvinde' },
  { value: 'Mand', label: 'Mand' },
] as const satisfies ReadonlyArray<{ value: Gender; label: string }>;

export interface PersonalInfoTabProps {
  personal: PersonalInfo;
  onSave: (personal: PersonalInfo) => void;
}

/** Fanen "Personoplysninger". "Annullér" sætter felterne tilbage til de gemte værdier. */
export function PersonalInfoTab({ personal, onSave }: PersonalInfoTabProps) {
  const [draft, setDraft] = useState(personal);

  const update = <K extends keyof PersonalInfo>(key: K) => (value: PersonalInfo[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(draft);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Heading level={3} size="md" className="volunteer-info__section-title">
        Personoplysninger
      </Heading>
      <TextInput id="person-fornavn" label="Fornavn" value={draft.firstName} onChange={update('firstName')} autoComplete="off" />
      <TextInput id="person-efternavn" label="Efternavn" value={draft.lastName} onChange={update('lastName')} autoComplete="off" />
      <TextInput id="person-foedselsdato" label="Fødselsdato" value={draft.birthDate} onChange={update('birthDate')} icon="input-calendar" autoComplete="off" />
      <Select id="person-koen" label="Køn" value={draft.gender} options={GENDERS} onChange={update('gender')} />
      <TextInput id="person-adresse" label="Adresse" value={draft.address} onChange={update('address')} autoComplete="off" />
      <TextInput id="person-postnummer" label="Postnummer" value={draft.postalCode} onChange={update('postalCode')} inputMode="numeric" autoComplete="off" />
      <TextInput id="person-by" label="By" value={draft.city} onChange={update('city')} autoComplete="off" />
      <FormActions onCancel={() => setDraft(personal)} />
    </form>
  );
}
