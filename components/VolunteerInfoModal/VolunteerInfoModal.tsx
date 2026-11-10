import { useRef, useState } from 'react';
import { Heading } from '@/components/Heading/Heading';
import { Modal } from '@/components/Modal/Modal';
import { TabPanel, Tabs } from '@/components/Tabs/Tabs';
import { fullName, type PersonalInfo, type Volunteer, type VolunteerRole } from '@/lib/types';
import { CoursesTab } from './CoursesTab';
import { PersonalInfoTab } from './PersonalInfoTab';
import { VolunteerInfoTab } from './VolunteerInfoTab';

export type VolunteerInfoTabId = 'person' | 'frivillig' | 'kurser';

const TABS = [
  { id: 'frivillig', label: 'Frivilligoplysninger' },
  { id: 'person', label: 'Personoplysninger' },
  { id: 'kurser', label: 'Kurser' },
] as const satisfies ReadonlyArray<{ id: VolunteerInfoTabId; label: string }>;

const TITLE_ID = 'volunteer-info-title';
const TABS_ID = 'volunteer-info';

export interface VolunteerInfoModalProps {
  /** Modalen er åben, når der er valgt en frivillig. */
  volunteer: Volunteer | null;
  onClose: () => void;
  onSavePersonal: (volunteerId: string, personal: PersonalInfo) => void;
  onSaveRole: (volunteerId: string, role: VolunteerRole) => void;
  onSetLeave?: (volunteerId: string, roleId: string) => void;
  onChangeRole?: (volunteerId: string, roleId: string) => void;
  /** "Opret som frivillig" under Personoplysninger. */
  onCreateVolunteer?: (volunteerId: string) => void;
  /** Fanen, modalen åbner på. Standard: Frivilligoplysninger. */
  initialTab?: VolunteerInfoTabId;
}

/** Modalen "Oplysninger om frivillig" fra listen over frivillige i en aktivitet. */
export function VolunteerInfoModal({ volunteer, onClose, ...rest }: VolunteerInfoModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Modal open={volunteer !== null} onClose={onClose} labelledBy={TITLE_ID} contentRef={contentRef}>
      {volunteer && (
        // key: formularer og valgt fane starter forfra for hver frivillig
        <VolunteerInfoContent
          key={volunteer.id}
          volunteer={volunteer}
          onClose={onClose}
          onTabChange={() => contentRef.current?.scrollTo({ top: 0 })}
          {...rest}
        />
      )}
    </Modal>
  );
}

interface VolunteerInfoContentProps extends Omit<VolunteerInfoModalProps, 'volunteer'> {
  volunteer: Volunteer;
  onTabChange: () => void;
}

function VolunteerInfoContent({
  volunteer,
  onClose,
  onSavePersonal,
  onSaveRole,
  onSetLeave,
  onChangeRole,
  onCreateVolunteer,
  initialTab = 'frivillig',
  onTabChange,
}: VolunteerInfoContentProps) {
  // Et medlem, der endnu ikke er frivillig, har kun fanen Personoplysninger
  const memberOnly = volunteer.kind === 'member';
  const tabs = memberOnly ? TABS.filter((tab) => tab.id === 'person') : TABS;
  const hasTab = (id: VolunteerInfoTabId) => tabs.some((tab) => tab.id === id);
  const [activeTab, setActiveTab] = useState<VolunteerInfoTabId>(hasTab(initialTab) ? initialTab : 'person');

  const changeTab = (id: string) => {
    setActiveTab(id as VolunteerInfoTabId);
    onTabChange();
  };

  return (
    <>
      <Heading level={2} size="xl" id={TITLE_ID} className="volunteer-info__title">
        Oplysninger om {fullName(volunteer.personal)}
      </Heading>

      <Tabs items={tabs} activeId={activeTab} onChange={changeTab} idPrefix={TABS_ID} label="Oplysninger om personen" />

      <TabPanel id="person" activeId={activeTab} idPrefix={TABS_ID}>
        <PersonalInfoTab
          personal={volunteer.personal}
          memberOnly={memberOnly}
          onSave={(personal) => onSavePersonal(volunteer.id, personal)}
          onCreateVolunteer={onCreateVolunteer && (() => onCreateVolunteer(volunteer.id))}
        />
      </TabPanel>

      {hasTab('frivillig') && (
        <TabPanel id="frivillig" activeId={activeTab} idPrefix={TABS_ID}>
          <VolunteerInfoTab
            volunteer={volunteer}
            onSaveRole={(role) => onSaveRole(volunteer.id, role)}
            onSetLeave={onSetLeave && ((roleId) => onSetLeave(volunteer.id, roleId))}
            onChangeRole={onChangeRole && ((roleId) => onChangeRole(volunteer.id, roleId))}
          />
        </TabPanel>
      )}

      {hasTab('kurser') && (
        <TabPanel id="kurser" activeId={activeTab} idPrefix={TABS_ID}>
          <CoursesTab courses={volunteer.courses} onClose={onClose} />
        </TabPanel>
      )}
    </>
  );
}
