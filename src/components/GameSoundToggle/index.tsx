import {mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import * as S from './Styles';

interface GameSoundToggleProps {
  onToggle: () => void;
  soundEnabled: boolean;
}

const GameSoundToggle = ({onToggle, soundEnabled}: GameSoundToggleProps) => (
  <S.Button
    aria-label="Game sound"
    aria-pressed={soundEnabled}
    onClick={onToggle}
    title={soundEnabled ? 'Turn game sound off' : 'Turn game sound on'}
    type="button"
  >
    <Icon aria-hidden path={soundEnabled ? mdiVolumeHigh : mdiVolumeOff} size="18px" />
    Sound {soundEnabled ? 'on' : 'off'}
  </S.Button>
);

export default GameSoundToggle;
