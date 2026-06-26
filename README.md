# Baby to Big Kid — Parent SOS

## Product overview

Baby to Big Kid — Parent SOS is a mobile-first React web application that helps parents and caregivers in the United States find calm, practical, age-appropriate educational guidance for common baby and toddler behavior and routine challenges.

The app is static and loading-free after the bundle is served. It does not use a backend, database, user accounts, payments, external AI APIs, or paid services.

## Current features

- Welcoming landing page with the Parent SOS product flow
- Age group selection for:
  - 6–12 Months
  - 12–24 Months
  - 2–3 Years
  - 3–4 Years
- Challenge selection screen with search and category filtering
- Structured guidance result pages with:
  - Why This May Be Happening
  - What You Can Try Right Now
  - What to Avoid
  - Words You Can Use
  - When to Contact Your Pediatrician
  - Watch the Related Video
- Related Baby to Big Kid YouTube video card for every result
- Local storage for the selected age group
- Back navigation, Choose Another Challenge, Change Age Group, and Start Over actions
- Responsive, mobile-first CSS designed for 320px, 375px, 390px, and 430px widths
- Keyboard-accessible controls, semantic HTML, visible focus states, and comfortable touch targets
- Friendly empty-search state
- Footer disclaimer that distinguishes educational information from medical advice

## Technology stack

- React
- TypeScript
- Vite
- CSS
- Vitest

## Local installation

```bash
npm install
```

## Development command

```bash
npm run dev
```

## Test command

```bash
npm test
```

## Production build command

```bash
npm run build
```

## TypeScript check command

```bash
npm run typecheck
```

## Project structure

```text
src/
  data/
    ageGroups.ts      Age group content
    categories.ts     Challenge category content
    challenges.ts     Parenting challenge guidance content
    types.ts          Shared TypeScript data types
  test/
    setup.ts          Vitest matcher setup
  utils/
    guidance.ts       Filtering, search, lookup, and localStorage helpers
    guidance.test.ts  Unit tests for the data helpers
  main.tsx            React application and screens
  styles.css          Mobile-first application styling
```

## How to add a new parenting challenge

1. Open `src/data/challenges.ts`.
2. Add a new object to the exported `challenges` array.
3. Give it a stable `id`, a user-facing `title`, a `categoryId`, a short `summary`, supported `ageGroupIds`, and one `guidance` entry for each supported age group.
4. Keep all guidance calm, practical, and written in natural US English at about a Grade 6–8 reading level.
5. Avoid diagnoses, guarantees, medical claims, invented statistics, or language that says a behavior is definitely normal.
6. Run `npm test`, `npm run typecheck`, and `npm run build`.

## How to add YouTube video URLs

1. Open `src/data/challenges.ts`.
2. Find the related video for the challenge guidance.
3. Replace the empty `youtubeUrl: ''` value with the final Baby to Big Kid YouTube URL.
4. Keep the title and description aligned with the linked video.
5. Run the tests and production build.

Only the final Baby to Big Kid YouTube URLs should use temporary empty strings.

## Current limitations

- The app includes the first six parenting challenges only.
- YouTube video URLs are intentionally blank until final Baby to Big Kid links are available.
- The app stores only the selected age group in localStorage.
- Guidance is educational and general. It is not personalized medical, behavioral, or developmental advice.
- There is no backend, analytics, authentication, or content management system.

## Educational and medical disclaimer

Baby to Big Kid provides general educational information and is not a substitute for professional medical advice, diagnosis, or treatment. Contact a qualified healthcare professional if you have concerns about your child’s health, safety, behavior, or development.
