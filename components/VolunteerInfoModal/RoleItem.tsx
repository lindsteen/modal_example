import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button/Button';
import { Heading } from '@/components/Heading/Heading';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { Text } from '@/components/Text/Text';
import { TextInput } from '@/components/TextInput/TextInput';
import type { VolunteerRole } from '@/lib/types';
import { FormActions } from './FormActions';

const YES_NO = [
  { value: 'ja', label: 'Ja' },
  { value: 'nej', label: 'Nej' },
] as const;

export interface RoleItemProps {
  role: VolunteerRole;
  onSave: (role: VolunteerRole) => void;
  onSetLeave?: (roleId: string) => void;
  onChangeRole?: (roleId: string) => void;
}

/** Én rolle med "Vis info" / "Skjul info". Indholdet er en formular for rollen. */
export function RoleItem({ role, onSave, onSetLeave, onChangeRole }: RoleItemProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(role);
  const panelId = `rolle-${role.id}`;
  const roleChangeExample =
    role.title === 'Aktivitetsleder' ? 'fra aktivitetsleder til frivillig' : 'fra frivillig til aktivitetsleder';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave(draft);
  };

  const handleCancel = () => {
    setDraft(role);
    setOpen(false);
  };

  return (
    <div className="role-item">
      <div className="role-item__header">
        <Text as="span">
          {role.title} i {role.activityName}
        </Text>
        <Button
          size="sm"
          bg={open ? 'primary' : 'black'}
          variant={open ? 'normal' : 'inverted'}
          icon="input-chevron-ned"
          className="role-item__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? 'Skjul info' : 'Vis info'}
        </Button>
      </div>

      <form id={panelId} className="role-item__panel" hidden={!open} onSubmit={handleSubmit} noValidate>
        <TextInput
          id={`${panelId}-start`}
          label="Startdato i aktiviteten"
          value={draft.startDate}
          onChange={(startDate) => setDraft((current) => ({ ...current, startDate }))}
          icon="input-calendar"
          autoComplete="off"
        />
        <TextInput
          id={`${panelId}-noter`}
          label="Noter om opgave"
          value={draft.taskNotes}
          onChange={(taskNotes) => setDraft((current) => ({ ...current, taskNotes }))}
          placeholder="F. eks. Chauffør, Møbler"
          autoComplete="off"
        />
        <RadioGroup
          name={`${panelId}-attest`}
          legend="Skal der indhentes børneattest på den frivillige?"
          value={draft.childCertificateRequired ? 'ja' : 'nej'}
          options={YES_NO}
          onChange={(value) => setDraft((current) => ({ ...current, childCertificateRequired: value === 'ja' }))}
        />

        <Heading level={4} size="sm" className="volunteer-info__subheading">
          Orlov
        </Heading>
        <Text size="sm" className="role-item__text">
          Skal den frivillige på orlov?
        </Text>
        <Button size="sm" bg="black" variant="inverted" onClick={() => onSetLeave?.(role.id)}>
          Ja, sæt orlov
        </Button>

        <Heading level={4} size="sm" className="volunteer-info__subheading">
          Skift rolle for den frivillige
        </Heading>
        <Text size="sm" className="role-item__text">
          Skift den frivilliges rolle i aktiviteten, fx {roleChangeExample}.
        </Text>
        <Button size="sm" bg="black" variant="inverted" onClick={() => onChangeRole?.(role.id)}>
          Skift rolle
        </Button>

        <FormActions onCancel={handleCancel} />
      </form>
    </div>
  );
}
