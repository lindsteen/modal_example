// På GitHub Pages bygges siden som statiske filer under repo-navnet, fx /modal_example.
// PAGES_BASE_PATH sættes af workflowet i .github/workflows/pages.yml. Lokalt er den ikke sat.
const pagesBasePath = process.env.PAGES_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(pagesBasePath !== undefined && { output: 'export', basePath: pagesBasePath }),
};

export default nextConfig;
