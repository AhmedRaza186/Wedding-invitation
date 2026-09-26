import { useState } from 'react';
import CeremonialWelcome from './components/CeremonialWelcome';
import MainInvitation from './components/MainInvitation';
import GoldParticles from './components/GoldParticles';
import { useAudio } from './hooks/useAudio';
import AudioToggle from './components/AudioToggle';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, toggleMusic, playIntroChime, startMusic } = useAudio();

  return (
    <>
      <div className="texture-overlay" />
      <GoldParticles />
      <AudioToggle isPlaying={isPlaying} onToggle={toggleMusic} />
      {!hasEntered && (
        <CeremonialWelcome
          onEnter={() => setHasEntered(true)}
          onPlayAudio={() => {
            playIntroChime();
            startMusic();
          }}
          onSkip={startMusic}
        />
      )}
      {hasEntered && <MainInvitation />}
    </>
  );
}
