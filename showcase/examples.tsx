// Eksempler til komponentvisningen: ét preview pr. komponent med de filer, der hører til.
// Kun til visningen – komponenterne selv ligger i components/.
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/Button/Button';
import { Field } from '@/components/Field/Field';
import { Heading } from '@/components/Heading/Heading';
import { Icon } from '@/components/Icon/Icon';
import { InfoList } from '@/components/InfoList/InfoList';
import { Modal } from '@/components/Modal/Modal';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { Select } from '@/components/Select/Select';
import { TabPanel, Tabs } from '@/components/Tabs/Tabs';
import { Text } from '@/components/Text/Text';
import { TextInput } from '@/components/TextInput/TextInput';
import { CoursesTab } from '@/components/VolunteerInfoModal/CoursesTab';
import { FormActions } from '@/components/VolunteerInfoModal/FormActions';
import { PersonalInfoTab } from '@/components/VolunteerInfoModal/PersonalInfoTab';
import { RoleItem } from '@/components/VolunteerInfoModal/RoleItem';
import { VolunteerInfoModal } from '@/components/VolunteerInfoModal/VolunteerInfoModal';
import { VolunteerInfoTab } from '@/components/VolunteerInfoModal/VolunteerInfoTab';
import { mockVolunteer } from '@/lib/mockData';
import type { Gender, Volunteer } from '@/lib/types';

export type ExampleGroup = 'Modal' | 'Dele af modalen' | 'Basiskomponenter';

export interface Variant {
  label?: string;
  render: () => ReactNode;
}

export interface Example {
  id: string;
  name: string;
  group: ExampleGroup;
  description: string;
  /** Filerne, der vises i Code-vinduet. Den første er komponentens egen fil. */
  files: string[];
  /** Højde i pixel på preview-vinduet i Code-visningen. */
  height: number;
  /** Modaler fylder hele rammen i stedet for at stå på et hvidt kort. */
  fullFrame?: boolean;
  variants: Variant[];
}

export const EXAMPLE_GROUPS: ExampleGroup[] = ['Modal', 'Dele af modalen', 'Basiskomponenter'];

const noop = () => {};

function VolunteerInfoModalExample() {
  const [volunteer, setVolunteer] = useState<Volunteer>(mockVolunteer);
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <div className="frame-reopen">
          <Button onClick={() => setOpen(true)}>Åbn modalen igen</Button>
        </div>
      )}
      <VolunteerInfoModal
        volunteer={open ? volunteer : null}
        onClose={() => setOpen(false)}
        onSavePersonal={(_, personal) => setVolunteer((current) => ({ ...current, personal }))}
        onSaveRole={(_, role) =>
          setVolunteer((current) => ({
            ...current,
            roles: current.roles.map((existing) => (existing.id === role.id ? role : existing)),
          }))
        }
      />
    </>
  );
}

function ModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <div className="frame-reopen">
          <Button onClick={() => setOpen(true)}>Åbn modalen igen</Button>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="eksempel-modal-titel">
        <Heading level={2} size="xl" id="eksempel-modal-titel" className="volunteer-info__title">
          Overskrift i modalen
        </Heading>
        <Text>Modalen er forankret i toppen. Indholdet scroller inde i modalen, hvis det er højere end skærmen.</Text>
        <div className="button-row volunteer-info__actions">
          <Button size="sm" onClick={() => setOpen(false)}>
            Luk
          </Button>
        </div>
      </Modal>
    </>
  );
}

function TabsExample() {
  const [active, setActive] = useState('a');
  const items = [
    { id: 'a', label: 'Første fane' },
    { id: 'b', label: 'Anden fane' },
    { id: 'c', label: 'Tredje fane' },
  ];

  return (
    <>
      <Tabs items={items} activeId={active} onChange={setActive} idPrefix="eksempel" label="Eksempel på faner" />
      {items.map((item) => (
        <TabPanel key={item.id} id={item.id} activeId={active} idPrefix="eksempel">
          <Text>Indhold i fanen "{item.label}". Brug piletasterne for at skifte fane.</Text>
        </TabPanel>
      ))}
    </>
  );
}

function TextInputExample(props: {
  label: string;
  initial?: string;
  icon?: 'input-calendar';
  placeholder?: string;
  error?: string;
  help?: string;
  readOnly?: boolean;
  required?: boolean;
  id: string;
}) {
  const [value, setValue] = useState(props.initial ?? '');
  return (
    <TextInput
      id={props.id}
      label={props.label}
      value={value}
      onChange={setValue}
      icon={props.icon}
      placeholder={props.placeholder}
      error={props.error}
      help={props.help}
      readOnly={props.readOnly}
      required={props.required}
    />
  );
}

function SelectExample() {
  const [value, setValue] = useState<Gender>('Ukendt');
  return (
    <Select
      id="eksempel-koen"
      label="Køn"
      value={value}
      onChange={setValue}
      options={[
        { value: 'Ukendt', label: 'Ukendt' },
        { value: 'Kvinde', label: 'Kvinde' },
        { value: 'Mand', label: 'Mand' },
      ]}
    />
  );
}

function RadioGroupExample() {
  const [value, setValue] = useState<'ja' | 'nej'>('nej');
  return (
    <RadioGroup
      name="eksempel-attest"
      legend="Skal der indhentes børneattest på den frivillige?"
      value={value}
      onChange={setValue}
      options={[
        { value: 'ja', label: 'Ja' },
        { value: 'nej', label: 'Nej' },
      ]}
    />
  );
}

const exampleCourses = [
  { id: 'k1', name: 'Førstehjælp – grundkursus', completedDate: '14. marts 2024' },
  { id: 'k2', name: 'Introduktion til Røde Kors', completedDate: '9. april 2016' },
];

export const examples: Example[] = [
  {
    id: 'VolunteerInfoModal',
    name: 'VolunteerInfoModal',
    group: 'Modal',
    description: 'Modalen "Oplysninger om frivillig" med fanerne Personoplysninger, Frivilligoplysninger og Kurser.',
    files: [
      'components/VolunteerInfoModal/VolunteerInfoModal.tsx',
      'lib/types.ts',
      'lib/mockData.ts',
      'styles/components/_volunteer-info.scss',
      'styles/globals.scss',
      'styles/_tokens.scss',
    ],
    height: 680,
    fullFrame: true,
    variants: [{ render: () => <VolunteerInfoModalExample /> }],
  },
  {
    id: 'PersonalInfoTab',
    name: 'PersonalInfoTab',
    group: 'Dele af modalen',
    description:
      'Fanen "Personoplysninger" med kontaktoplysninger og boksen "Frivilligoplysninger" med "Opret som frivillig". "Annullér" sætter felterne tilbage til de gemte værdier. E-mailadressen skal udfyldes.',
    files: ['components/VolunteerInfoModal/PersonalInfoTab.tsx'],
    height: 900,
    variants: [{ render: () => <PersonalInfoTab personal={mockVolunteer.personal} onSave={noop} onCreateVolunteer={noop} /> }],
  },
  {
    id: 'VolunteerInfoTab',
    name: 'VolunteerInfoTab',
    group: 'Dele af modalen',
    description: 'Fanen "Frivilligoplysninger": den frivilliges roller og generelle oplysninger.',
    files: ['components/VolunteerInfoModal/VolunteerInfoTab.tsx'],
    height: 520,
    variants: [{ render: () => <VolunteerInfoTab volunteer={mockVolunteer} onSaveRole={noop} /> }],
  },
  {
    id: 'RoleItem',
    name: 'RoleItem',
    group: 'Dele af modalen',
    description: 'Én rolle med "Vis info" / "Skjul info". Indholdet er en formular for rollen.',
    files: ['components/VolunteerInfoModal/RoleItem.tsx', 'styles/components/_volunteer-info.scss'],
    height: 420,
    variants: [{ render: () => <RoleItem role={mockVolunteer.roles[0]} onSave={noop} /> }],
  },
  {
    id: 'CoursesTab',
    name: 'CoursesTab',
    group: 'Dele af modalen',
    description: 'Fanen "Kurser", med og uden gennemførte kurser.',
    files: ['components/VolunteerInfoModal/CoursesTab.tsx'],
    height: 520,
    variants: [
      { label: 'Ingen kurser', render: () => <CoursesTab courses={[]} onClose={noop} /> },
      { label: 'Med kurser', render: () => <CoursesTab courses={exampleCourses} onClose={noop} /> },
    ],
  },
  {
    id: 'FormActions',
    name: 'FormActions',
    group: 'Dele af modalen',
    description: '"Annullér" og "Gem oplysninger" nederst til højre i en formular.',
    files: ['components/VolunteerInfoModal/FormActions.tsx', 'styles/components/_button.scss'],
    height: 180,
    variants: [{ render: () => <FormActions onCancel={noop} /> }],
  },
  {
    id: 'Modal',
    name: 'Modal',
    group: 'Basiskomponenter',
    description: 'Modal forankret i toppen. Fokus holdes i modalen, og Escape eller klik udenfor lukker den.',
    files: ['components/Modal/Modal.tsx', 'styles/components/_modal.scss'],
    height: 420,
    fullFrame: true,
    variants: [{ render: () => <ModalExample /> }],
  },
  {
    id: 'Tabs',
    name: 'Tabs',
    group: 'Basiskomponenter',
    description: 'Faner med TabPanel. Piletasterne flytter mellem fanerne.',
    files: ['components/Tabs/Tabs.tsx', 'styles/components/_tabs.scss'],
    height: 240,
    variants: [{ render: () => <TabsExample /> }],
  },
  {
    id: 'Button',
    name: 'Button',
    group: 'Basiskomponenter',
    description: 'Knap med MRK\'s variant-klasser, fx `button text-md bg-primary size-md pill button-normal`.',
    files: ['components/Button/Button.tsx', 'styles/components/_button.scss'],
    height: 560,
    variants: [
      { label: 'Primær', render: () => <Button>Gem oplysninger</Button> },
      { label: 'Sekundær', render: () => <Button variant="inverted">Annullér</Button> },
      { label: 'Tertiær', render: () => <Button bg="black" variant="inverted">Skift rolle</Button> },
      {
        label: 'Små knapper med ikon',
        render: () => (
          <div className="button-row frame-row">
            <Button size="sm" bg="black" variant="inverted" icon="input-chevron-ned">
              Vis info
            </Button>
            <Button size="sm" icon="input-chevron-ned">
              Skjul info
            </Button>
          </div>
        ),
      },
      { label: 'Deaktiveret', render: () => <Button disabled>Gem oplysninger</Button> },
    ],
  },
  {
    id: 'TextInput',
    name: 'TextInput',
    group: 'Basiskomponenter',
    description: 'Tekstfelt med synlig label, evt. ikon, hjælpetekst og fejlbesked.',
    files: ['components/TextInput/TextInput.tsx', 'styles/components/_form.scss'],
    height: 760,
    variants: [
      { label: 'Standard', render: () => <TextInputExample id="eks-fornavn" label="Fornavn" initial="Cynthia" /> },
      {
        label: 'Påkrævet med hjælpetekst',
        render: () => (
          <TextInputExample
            id="eks-email"
            label="Din e-mailadresse"
            help="Denne e-mail bruger vi til at skrive mails til dig fra mit.rodekors.dk."
            placeholder="Din e-mailadresse"
            required
          />
        ),
      },
      { label: 'Med ikon', render: () => <TextInputExample id="eks-dato" label="Fødselsdato" initial="09.02.1951" icon="input-calendar" /> },
      { label: 'Med pladsholder', render: () => <TextInputExample id="eks-noter" label="Noter om opgave" placeholder="F. eks. Chauffør, Møbler" /> },
      {
        label: 'Med fejl',
        render: () => <TextInputExample id="eks-postnr" label="Postnummer" initial="83" error="Skriv et postnummer med 4 cifre." />,
      },
      { label: 'Skrivebeskyttet', render: () => <TextInputExample id="eks-by" label="By" initial="Tilst" readOnly /> },
    ],
  },
  {
    id: 'Select',
    name: 'Select',
    group: 'Basiskomponenter',
    description: 'Rulleliste med synlig label og pil.',
    files: ['components/Select/Select.tsx', 'styles/components/_form.scss'],
    height: 200,
    variants: [{ render: () => <SelectExample /> }],
  },
  {
    id: 'RadioGroup',
    name: 'RadioGroup',
    group: 'Basiskomponenter',
    description: 'Radioknapper i en fieldset med legend.',
    files: ['components/RadioGroup/RadioGroup.tsx', 'styles/components/_form.scss'],
    height: 220,
    variants: [{ render: () => <RadioGroupExample /> }],
  },
  {
    id: 'Field',
    name: 'Field',
    group: 'Basiskomponenter',
    description: 'Fælles ramme for formularfelter: label, hjælpetekst og fejlbesked. Bruges af TextInput og Select.',
    files: ['components/Field/Field.tsx', 'styles/components/_form.scss'],
    height: 220,
    variants: [
      {
        render: () => (
          <Field id="eks-felt" label="Label" help="Hjælpetekst under labelen.">
            <div className="text-input">
              <input id="eks-felt" className="text-input__field text-md" aria-describedby="eks-felt-help" />
            </div>
          </Field>
        ),
      },
    ],
  },
  {
    id: 'InfoList',
    name: 'InfoList',
    group: 'Basiskomponenter',
    description:
      'Sandfarvet boks med skrivebeskyttede oplysninger og/eller andet indhold, evt. med overskrift. Tomme værdier vises som "-".',
    files: ['components/InfoList/InfoList.tsx', 'styles/components/_info-list.scss'],
    height: 760,
    variants: [
      {
        label: 'Med overskrift, tekst og knap',
        render: () => (
          <InfoList title="Frivilligoplysninger">
            <Text>Denne person er bare medlem af afdelingen. Hvis de gerne vil være frivillige, kan du oprette dem herunder.</Text>
            <Button>Opret som frivillig</Button>
          </InfoList>
        ),
      },
      {
        label: 'Med overskrift og rækker',
        render: () => (
          <InfoList
            title="Frivilligoplysninger"
            items={[
              { term: 'Startdato som frivillig:', value: '13. december 2004' },
              { term: 'RKID:', value: '1000123' },
              { term: 'ID-kort udstedelsesdato:', value: null },
            ]}
          />
        ),
      },
      {
        label: 'Uden overskrift',
        render: () => (
          <InfoList
            items={[
              { term: 'Startdato i Røde Kors:', value: '13. december 2004' },
              { term: 'Anciennitet:', value: '21 år' },
              { term: 'Godkendt Røde Kors-aftalen:', value: null },
            ]}
          />
        ),
      },
    ],
  },
  {
    id: 'Heading',
    name: 'Heading',
    group: 'Basiskomponenter',
    description: 'Overskrift med `heading text-<størrelse>`. Niveau og størrelse vælges hver for sig.',
    files: ['components/Heading/Heading.tsx', 'styles/_typography.scss'],
    height: 340,
    variants: [
      { label: 'h2, xl (modalens titel)', render: () => <Heading level={2} size="xl">Oplysninger om Cynthia Chavez</Heading> },
      { label: 'h3, md (afsnit i modalen)', render: () => <Heading level={3} size="md">Den frivilliges roller</Heading> },
      { label: 'h4, sm (underoverskrift)', render: () => <Heading level={4} size="sm">Orlov</Heading> },
    ],
  },
  {
    id: 'Text',
    name: 'Text',
    group: 'Basiskomponenter',
    description: 'Brødtekst med `text text-<størrelse> style-<stil>`.',
    files: ['components/Text/Text.tsx', 'styles/_typography.scss'],
    height: 300,
    variants: [
      { label: 'md, normal', render: () => <Text>Den frivillige har endnu ikke gennemført kurser i Mit Røde Kors.</Text> },
      { label: 'sm, normal', render: () => <Text size="sm">Skal den frivillige på orlov?</Text> },
      { label: 'md, bold', render: () => <Text textStyle="bold">Cynthia Chavez</Text> },
    ],
  },
  {
    id: 'Icon',
    name: 'Icon',
    group: 'Basiskomponenter',
    description: 'Ikoner fra Røde Kors\' ikonbibliotek som inline SVG. Stregerne følger tekstfarven.',
    files: ['components/Icon/Icon.tsx', 'components/Icon/icons.tsx', 'styles/components/_icon.scss'],
    height: 260,
    variants: [
      {
        label: 'button-close, input-chevron-ned, input-calendar',
        render: () => (
          <div className="frame-row">
            <Icon name="button-close" size="large" />
            <Icon name="input-chevron-ned" size="large" />
            <Icon name="input-calendar" size="large" />
          </div>
        ),
      },
      {
        label: 'Størrelser: xsmall, small, medium, large',
        render: () => (
          <div className="frame-row">
            <Icon name="input-calendar" size="xsmall" />
            <Icon name="input-calendar" size="small" />
            <Icon name="input-calendar" size="medium" />
            <Icon name="input-calendar" size="large" />
          </div>
        ),
      },
      {
        label: 'Farve: primary',
        render: () => <Icon name="input-calendar" size="large" color="primary" />,
      },
    ],
  },
];

export const findExample = (id: string) => examples.find((example) => example.id === id);
