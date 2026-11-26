import {ChangeEvent, useRef, useState} from 'react';
import {ImageUp} from 'lucide-react';

import * as S from '../Styles';

export const EMBLEM_SIZE = 512;

export interface PickedEmblem {
  file: File;
  preview: string;
}

// The same rule as currency logos: a picture of exactly 512 by 512 pixels. Resolves to an address for the preview.
export const readEmblem = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const address = URL.createObjectURL(file);
    const picture = new Image();
    picture.onerror = () => {
      URL.revokeObjectURL(address);
      reject(new Error('That file is not a picture we can read. Choose a PNG, JPG, WebP or GIF.'));
    };
    picture.onload = () => {
      if (picture.naturalWidth === EMBLEM_SIZE && picture.naturalHeight === EMBLEM_SIZE) {
        resolve(address);
        return;
      }
      URL.revokeObjectURL(address);
      reject(
        new Error(
          `The emblem must be exactly ${EMBLEM_SIZE} by ${EMBLEM_SIZE} pixels. This picture is ${picture.naturalWidth} by ${picture.naturalHeight}.`,
        ),
      );
    };
    picture.src = address;
  });

const EmblemPicker = ({
  disabled,
  onPick,
  text,
}: {
  disabled?: boolean;
  onPick: (picked: PickedEmblem) => void;
  text: string;
}) => {
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Cleared so the same file can be chosen again after it has been corrected
    event.target.value = '';
    if (!file) return;
    try {
      const preview = await readEmblem(file);
      setError('');
      onPick({file, preview});
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'That picture could not be read.');
    }
  };

  return (
    <S.EmblemPicker>
      <S.Button $secondary $size="small" disabled={disabled} onClick={() => input.current?.click()} type="button">
        <ImageUp size={14} /> {text}
      </S.Button>
      <input
        accept="image/png,image/jpeg,image/webp,image/gif"
        aria-label="Emblem image"
        disabled={disabled}
        hidden
        onChange={handleChange}
        ref={input}
        type="file"
      />
      {error && <S.Error role="alert">{error}</S.Error>}
    </S.EmblemPicker>
  );
};

export default EmblemPicker;
