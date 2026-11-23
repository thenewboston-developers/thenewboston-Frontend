import {mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import * as S from './Styles';

interface SoundToggleProps {
  onToggle: () => void;
  soundEnabled: boolean;
}

const SoundToggle = ({onToggle, soundEnabled}: SoundToggleProps) => (
  <S.Button
    $secondary
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

export default SoundToggle;
