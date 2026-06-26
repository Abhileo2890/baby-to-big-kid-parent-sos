import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ageGroups } from './data/ageGroups';
import { categories } from './data/categories';
import type { AgeGroupId, ChallengeCategoryId, ParentingChallenge } from './data/types';
import { filterChallengesByCategory, findChallengeById, getChallengesForAge, restoreSelectedAgeGroup, saveSelectedAgeGroup, searchChallenges } from './utils/guidance';
import './styles.css';

type Screen = 'landing' | 'age' | 'challenges' | 'result';

const sectionLabels = {
  why: 'Why This May Be Happening',
  tryNow: 'What You Can Try Right Now',
  avoid: 'What to Avoid',
  words: 'Words You Can Use',
  pediatrician: 'When to Contact Your Pediatrician',
};

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [selectedAge, setSelectedAge] = useState<AgeGroupId | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ChallengeCategoryId | 'all'>('all');

  useEffect(() => {
    const restored = restoreSelectedAgeGroup();
    if (restored) setSelectedAge(restored);
  }, []);

  const visibleChallenges = useMemo(() => {
    if (!selectedAge) return [];
    return searchChallenges(filterChallengesByCategory(getChallengesForAge(selectedAge), category), query);
  }, [category, query, selectedAge]);

  const selectedChallenge = selectedChallengeId ? findChallengeById(selectedChallengeId) : undefined;
  const selectedGuidance = selectedChallenge?.guidance.find((item) => item.ageGroupId === selectedAge);

  const chooseAge = (ageGroupId: AgeGroupId) => {
    setSelectedAge(ageGroupId);
    saveSelectedAgeGroup(ageGroupId);
    setSelectedChallengeId(null);
    setScreen('challenges');
  };

  const startOver = () => {
    setScreen('landing');
    setSelectedChallengeId(null);
    setQuery('');
    setCategory('all');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand-button" onClick={startOver} aria-label="Return to the Parent SOS landing page">
          <span>Baby to Big Kid</span><strong>Parent SOS</strong>
        </button>
      </header>
      <main>
        {screen === 'landing' && <Landing onStart={() => setScreen(selectedAge ? 'challenges' : 'age')} />}
        {screen === 'age' && <AgeSelection selectedAge={selectedAge} onChoose={chooseAge} onBack={() => setScreen('landing')} />}
        {screen === 'challenges' && selectedAge && (
          <ChallengeSelection ageGroupId={selectedAge} challenges={visibleChallenges} query={query} category={category} onQuery={setQuery} onCategory={setCategory} onChoose={(id) => { setSelectedChallengeId(id); setScreen('result'); }} onBack={() => setScreen('age')} />
        )}
        {screen === 'result' && selectedAge && selectedChallenge && selectedGuidance && (
          <Result challenge={selectedChallenge} ageGroupId={selectedAge} guidance={selectedGuidance} onBack={() => setScreen('challenges')} onAnother={() => setScreen('challenges')} onAge={() => setScreen('age')} onStartOver={startOver} />
        )}
      </main>
      <footer className="footer"><p>Baby to Big Kid provides general educational information and is not a substitute for professional medical advice, diagnosis, or treatment. Contact a qualified healthcare professional if you have concerns about your child’s health, safety, behavior, or development.</p></footer>
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return <section className="hero"><p className="eyebrow">Baby to Big Kid</p><h1>Practical Help for Everyday Baby and Toddler Challenges</h1><p>Select your child’s age and what you’re dealing with to find clear, age-appropriate guidance you can try today.</p><button className="primary" onClick={onStart}>Get Started</button></section>;
}

function AgeSelection({ selectedAge, onChoose, onBack }: { selectedAge: AgeGroupId | null; onChoose: (id: AgeGroupId) => void; onBack: () => void }) {
  return <section className="panel"><button className="text-button" onClick={onBack}>← Back</button><h1>Select your child’s age</h1><p className="section-copy">Choose the age range that fits best today. You can change it later.</p><div className="card-grid">{ageGroups.map((age) => <button key={age.id} className="choice-card" aria-pressed={selectedAge === age.id} onClick={() => onChoose(age.id)}><span>{age.shortLabel}</span><strong>{age.label}</strong><p>{age.description}</p></button>)}</div></section>;
}

function ChallengeSelection(props: { ageGroupId: AgeGroupId; challenges: ParentingChallenge[]; query: string; category: ChallengeCategoryId | 'all'; onQuery: (value: string) => void; onCategory: (value: ChallengeCategoryId | 'all') => void; onChoose: (id: string) => void; onBack: () => void }) {
  const ageLabel = ageGroups.find((age) => age.id === props.ageGroupId)?.label;
  return <section className="panel"><button className="text-button" onClick={props.onBack}>← Change Age Group</button><h1>What is happening?</h1><p className="section-copy">Showing guidance for {ageLabel}. Search or filter to find the closest match.</p><label className="search-label" htmlFor="challenge-search">Search parenting challenges</label><input id="challenge-search" className="search" value={props.query} onChange={(event: { target: { value: string } }) => props.onQuery(event.target.value)} placeholder="Search sleep, diaper, meltdowns..." /><div className="filters" aria-label="Challenge categories"><button className="chip" aria-pressed={props.category === 'all'} onClick={() => props.onCategory('all')}>All</button>{categories.map((cat) => <button key={cat.id} className="chip" aria-pressed={props.category === cat.id} onClick={() => props.onCategory(cat.id)}>{cat.label}</button>)}</div>{props.challenges.length ? <div className="challenge-list">{props.challenges.map((challenge) => <button key={challenge.id} className="challenge-card" onClick={() => props.onChoose(challenge.id)}><strong>{challenge.title}</strong><span>{categories.find((cat) => cat.id === challenge.categoryId)?.label}</span><p>{challenge.summary}</p></button>)}</div> : <div className="empty-state"><h2>No close matches yet</h2><p>Try a shorter search, choose All categories, or pick the challenge that feels most similar.</p></div>}</section>;
}

function Result({ challenge, ageGroupId, guidance, onBack, onAnother, onAge, onStartOver }: { challenge: ParentingChallenge; ageGroupId: AgeGroupId; guidance: NonNullable<ParentingChallenge['guidance'][number]>; onBack: () => void; onAnother: () => void; onAge: () => void; onStartOver: () => void }) {
  const ageLabel = ageGroups.find((age) => age.id === ageGroupId)?.label;
  return <article className="panel result"><button className="text-button" onClick={onBack}>← Back to challenges</button><p className="eyebrow">{ageLabel}</p><h1>{challenge.title}</h1><p className="section-copy">This is general educational guidance, not medical advice. Use what fits your child and your family.</p>{(Object.keys(sectionLabels) as Array<keyof typeof sectionLabels>).map((key) => <section className="guidance-section" key={key}><h2>{sectionLabels[key]}</h2><ul>{guidance.sections[key].map((item) => <li key={item}>{item}</li>)}</ul></section>)}<section className="video-card"><h2>Watch the Related Video</h2><strong>{guidance.relatedVideo.title}</strong><p>{guidance.relatedVideo.description}</p>{guidance.relatedVideo.youtubeUrl ? <a href={guidance.relatedVideo.youtubeUrl}>Open YouTube video</a> : <span className="coming-soon">Video link coming soon</span>}</section><div className="actions"><button className="primary" onClick={onAnother}>Choose Another Challenge</button><button className="secondary" onClick={onAge}>Change Age Group</button><button className="secondary" onClick={onStartOver}>Start Over</button></div></article>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
