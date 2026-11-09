import { Heading } from '@/components/Heading/Heading';
import { InfoList } from '@/components/InfoList/InfoList';
import { Text } from '@/components/Text/Text';
import type { Volunteer, VolunteerRole } from '@/lib/types';
import { RoleItem } from './RoleItem';

export interface VolunteerInfoTabProps {
  volunteer: Volunteer;
  onSaveRole: (role: VolunteerRole) => void;
  onSetLeave?: (roleId: string) => void;
  onChangeRole?: (roleId: string) => void;
}

/** Fanen "Frivilligoplysninger": den frivilliges roller og generelle oplysninger. */
export function VolunteerInfoTab({ volunteer, onSaveRole, onSetLeave, onChangeRole }: VolunteerInfoTabProps) {
  const { roles, general } = volunteer;

  return (
    <>
      <Heading level={3} size="md" className="volunteer-info__section-title">
        Den frivilliges roller
      </Heading>
      {roles.length === 0 ? (
        <Text>Den frivillige har ingen roller i aktiviteten.</Text>
      ) : (
        <div className="role-list">
          {roles.map((role) => (
            <RoleItem key={role.id} role={role} onSave={onSaveRole} onSetLeave={onSetLeave} onChangeRole={onChangeRole} />
          ))}
        </div>
      )}

      <Heading level={3} size="md" className="volunteer-info__section-title">
        Generelle frivilligoplysninger
      </Heading>
      <InfoList
        items={[
          { term: 'Startdato i Røde Kors:', value: general.redCrossStartDate },
          { term: 'Anciennitet:', value: general.seniority },
          { term: 'Godkendt Røde Kors-aftalen:', value: general.agreementApproved },
          { term: 'Børneattest indhentningsdato:', value: general.childCertificateDate },
          { term: 'ID-kort udstedelsesdato:', value: general.idCardIssuedDate },
        ]}
      />
    </>
  );
}
