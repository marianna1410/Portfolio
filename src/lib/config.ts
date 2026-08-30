// Single source of truth for URLs used across the site.

// Resume PDF lives in /public/ — served from the deploy root.
// Filename has spaces, so the URL keeps them percent-encoded (%20); the
// browser shows the real name (with spaces) when opening/downloading.
// To swap the file: replace it in public/ and update this constant to match.
export const RESUME_URL = '/CV_Marianna%20Delihioz_UXUI%20Designer.pdf';

export const CONTACT = {
  email: 'mariannadelihioz@gmail.com',
  telegram: 'https://t.me/MariannaDeli',
  linkedin: 'https://www.linkedin.com/in/marianna-delihioz-81b88a200/',
  dribbble: 'https://dribbble.com/Delihioz', // redesign brief §6.6 / §9.4
} as const;

export const PROTOTYPES = {
  lucida: {
    problem1: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-9621',
    problem2: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-9621&viewport=363%2C-124%2C0.29&t=KLY12ndoUXySXLhL-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=854%3A9552&page-id=854%3A8918',
    problem3: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-10076',
  },
  vaia: {
    shared: 'https://www.figma.com/proto/rxvFgtIyrkPhymWiRgWKhC/Vaia_Case-Study?node-id=829-5426',
  },
} as const;
