// Indgang til preview.html: samme side og komponenter som i Next.js, uden server.
import { createRoot } from 'react-dom/client';
import ComponentPage from '@/pages/index';

createRoot(document.getElementById('__next')!).render(<ComponentPage />);
