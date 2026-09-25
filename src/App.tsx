import { useState } from 'react';
import CeremonialWelcome from './components/CeremonialWelcome';
import MainInvitation from './components/MainInvitation';
import { useAudio } from './hooks/useAudio';
import AudioToggle from './components/AudioToggle';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { isPlaying, toggleMusic, playIntroAndMusic } = useAudio();

  return (
    <>
      <div className="texture-overlay" />
      <AudioToggle isPlaying={isPlaying} onToggle={toggleMusic} />
      {!hasEntered && (
        <CeremonialWelcome 
          onEnter={() => setHasEntered(true)} 
          onPlayAudio={playIntroAndMusic}
        />
      )}
      {hasEntered && <MainInvitation isPlaying={isPlaying} />}
    </>
  );
}
