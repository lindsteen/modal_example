import Head from 'next/head';
import { ShowcaseRoot } from '@/showcase/ShowcaseRoot';

// Komponentvisning med topmenuen "Preview" og "Code". Selve modalen ligger i components/.

export default function ComponentPage() {
  return (
    <>
      <Head>
        <title>Oplysninger om frivillig – komponent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ShowcaseRoot />
    </>
  );
}
