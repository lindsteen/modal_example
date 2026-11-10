# Oplysninger om frivillig – React

Modalen fra `../oplysninger-om-frivillig-modal.html` som React-komponenter efter `Docs/Frontend specifikationer.md`: Next.js 15.5.28 (Pages Router), TypeScript og global SCSS med variant-klasser. Selve modalen ligger i `components/`, `lib/` og `styles/`. `showcase/` er kun siden, der viser den.

## Kør

- https://lindsteen.github.io/modal_example/ – siden på GitHub Pages ([repo](https://github.com/lindsteen/modal_example)). Den bygges og udgives automatisk ved hvert push til `main`.
- `preview.html` – åbn direkte i en browser. Alt er indbygget.
- `npm install` og derefter `npm run dev` – Next.js på http://localhost:3000.
- `npm run preview` – bygger `preview.html` igen efter ændringer.

Siden har topmenuen Preview - normal, Preview - kun medlem og Code. Preview - normal viser modalen for en frivillig, og Preview - kun medlem viser den for et medlem, der endnu ikke er frivillig. Code viser preview og kode for begge udgaver og hver underkomponent. Adressen husker valget, fx `#code/RoleItem`.

## Opbygning

- `components/VolunteerInfoModal/` – modalen: `PersonalInfoTab`, `VolunteerInfoTab` med `RoleItem` og `CoursesTab`.
- MRK's basiskomponenter: `Button`, `Text`, `Heading`, `Icon`, `TextInput`, `Tabs`. Nye: `Modal`, `Select`, `RadioGroup`, `InfoList`, `Field`.
- `styles/` – global SCSS: tokens, typografi og én partial pr. komponent.
- `lib/` – datamodel (`types.ts`) og en opdigtet frivillig og et opdigtet medlem (`mockData.ts`).
- `showcase/` – siden med Preview og Code: eksempler pr. komponent (`examples.tsx`) og kildekoden (`kilder.generated.ts`, som `byg-kilder.mjs` laver før dev, build og preview). Koden farvelægges med highlight.js.

## Antagelser

- TypeScript og SCSS-opdelingen er ikke aflæst fra MRK.
- Knaptyper: primær `bg-primary button-normal`, sekundær `bg-primary button-inverted`, tertiær `bg-black button-inverted`. Tekst- og ikonstørrelser er prototypens.
- Feltnavnene i datamodellen er udledt af prototypen og skal afstemmes med API'et (fx GetPerson).
- Knapperne kalder callbacks (`onSavePersonal`, `onSaveRole`, `onSetLeave`, `onChangeRole`). I demoen gemmes kun i hukommelsen, og orlov og skift rolle gør intet, som i prototypen.
- Felterne med samtykke er skrivebeskyttede, fordi kun den frivillige selv kan give samtykke.
- Om personen er frivillig eller kun medlem, styres af feltet `kind` i datamodellen.

## Forskelle fra prototypen

- Modalen passer i skærmen på mobil.
- Fanerne i modalen kan bruges med piletasterne, og fokus holdes i modalen.
- Der er ingen grå linje over "Annullér" og "Gem oplysninger" i rollerne.
- Modalen er 864 px (54rem) bred som i MRK (prototypen: 710 px).
- Modalen står 4,5rem fra toppen (prototypen: 80 px).
- Personoplysninger har kontaktfelterne fra MRK, og e-mailadressen skal udfyldes.
- For et medlem har modalen kun fanen Personoplysninger og en boks med "Opret som frivillig".
