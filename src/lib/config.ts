// Single source of truth for URLs used across the site.
// When the resume is ready, swap RESUME_URL here — it propagates to Hero, Footer, and dropdown.

export const RESUME_URL = 'https://dribbble.com/shots'; // TODO: replace before final deploy (interactions.md 5.2)

export const CONTACT = {
  email: 'mariannadelihioz@gmail.com',
  telegram: 'https://t.me/MariannaDeli',
  linkedin: 'https://www.linkedin.com/in/marianna-delihioz-81b88a200/',
} as const;

export const PROTOTYPES = {
  lucida: {
    problem1: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-9621',
    problem2: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-9017',
    problem3: 'https://www.figma.com/proto/A1JJoDAqgctnLSh9KiUjeQ/Lucida_Case-Study?node-id=854-10076',
  },
  vaia: {
    shared: 'https://www.figma.com/proto/rxvFgtIyrkPhymWiRgWKhC/Vaia_Case-Study?node-id=829-5426',
  },
} as const;
