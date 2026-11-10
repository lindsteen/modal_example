import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button/Button';
import { Heading } from '@/components/Heading/Heading';
import { InfoList } from '@/components/InfoList/InfoList';
import { Select } from '@/components/Select/Select';
import { Text } from '@/components/Text/Text';
import { TextInput } from '@/components/TextInput/TextInput';
import type { Gender, PersonalInfo } from '@/lib/types';
import { FormActions } from './FormActions';

const GENDERS = [
  { value: 'Ukendt', label: 'Ukendt' },
  { value: 'Kvinde', label: 'Kvinde' },
  { value: 'Mand', label: 'Mand' },
] as const satisfies ReadonlyArray<{ value: Gender; label: string }>;

const EMAIL_ID = 'person-email';

function emailError(email: string) {
  const value = email.trim();
  if (!value) return 'Skriv en e-mailadresse.';
  if (!/^\S+@\S+\.\S+$/.test(value)) return 'Skriv en gyldig e-mailadresse, fx navn@eksempel.dk.';
  return undefined;
}

export interface PersonalInfoTabProps {
  personal: PersonalInfo;
  onSave: (personal: PersonalInfo) => void;
  /** Personen er kun medlem: viser boksen Frivilligoplysninger med "Opret som frivillig". */
  memberOnly?: boolean;
  /** "Opret som frivillig" i boksen Frivilligoplysninger. */
  onCreateVolunteer?: () => void;
}

/**
 * Fanen "Personoplysninger". "Annullér" sætter felterne tilbage til de gemte værdier.
 * Felterne med samtykke er skrivebeskyttede: kun den frivillige selv kan give samtykke.
 */
export function PersonalInfoTab({ personal, onSave, memberOnly = false, onCreateVolunteer }: PersonalInfoTabProps) {
  const [draft, setDraft] = useState(personal);
  const [showErrors, setShowErrors] = useState(false);
  const error = emailError(draft.email);

  const update = <K extends keyof PersonalInfo>(key: K) => (value: PersonalInfo[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (error) {
      setShowErrors(true);
      document.getElementById(EMAIL_ID)?.focus();
      return;
    }
    onSave(draft);
  };

  const handleCancel = () => {
    setDraft(personal);
    setShowErrors(false);
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
      <TextInput
        id="person-mobil"
        label="Mobiltelefonnummer"
        type="tel"
        value={draft.mobile}
        onChange={update('mobile')}
        placeholder="Mobiltelefonnummer"
        autoComplete="off"
      />
      <TextInput
        id="person-andet-telefon"
        label="Andet telefonnummer"
        type="tel"
        value={draft.otherPhone}
        onChange={update('otherPhone')}
        placeholder="Telefonnummer"
        autoComplete="off"
      />
      <TextInput
        id="person-telefon-samtykke"
        label="Telefonnummer med samtykke"
        help="Angiver du et telefonnummer i dette felt, giver du samtykke til at det må vises på Mit Røde Kors og på rodekors.dk."
        type="tel"
        value={draft.consentPhone}
        onChange={update('consentPhone')}
        placeholder="Telefonnummer med samtykke"
        readOnly
      />
      <TextInput
        id={EMAIL_ID}
        label="Din e-mailadresse"
        help="Denne e-mail bruger vi til at skrive mails til dig fra mit.rodekors.dk."
        type="email"
        value={draft.email}
        onChange={update('email')}
        placeholder="Din e-mailadresse"
        error={showErrors ? error : undefined}
        required
        autoComplete="off"
      />
      <TextInput
        id="person-login-email"
        label="Login e-mailadresse"
        help="Denne e-mail bruger du til at logge på mit.rodekors.dk."
        type="email"
        value={draft.loginEmail}
        onChange={update('loginEmail')}
        placeholder="Login e-mailadresse"
        autoComplete="off"
      />
      <TextInput
        id="person-email-samtykke"
        label="E-mailadresse med samtykke"
        help="Angiver du en e-mail i dette felt, giver du samtykke til at den må vises på Mit Røde Kors og rodekors.dk."
        type="email"
        value={draft.consentEmail}
        onChange={update('consentEmail')}
        placeholder="E-mailadresse med samtykke"
        readOnly
      />

      {memberOnly && (
        <InfoList title="Frivilligoplysninger" className="volunteer-info__summary">
          <Text>Denne person er et medlem. Hvis de også gerne vil være frivillige, kan du oprette dem herunder.</Text>
          <Button onClick={onCreateVolunteer}>Opret som frivillig</Button>
        </InfoList>
      )}

      <FormActions onCancel={handleCancel} />
    </form>
  );
}
