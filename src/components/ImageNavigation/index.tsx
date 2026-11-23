import {MouseEvent, useEffect} from 'react';
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

import Icon from 'components/Icon';
import {SFC} from 'types';

import * as S from './Styles';

export interface ImageNavigationProps {
  count: number;
  index: number;
  onIndexChange(index: number): void;
}

/**
 * Previous and next controls for a viewer that shows one image of several at a time. The parent needs to be positioned,
 * the controls are placed along its edges.
 */
const ImageNavigation: SFC<ImageNavigationProps> = ({count, index, onIndexChange}) => {
  const hasNext = index < count - 1;
  const hasPrevious = index > 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // The arrow keys move the cursor while the visitor is typing, for example a comment next to the image
      if ((event.target as HTMLElement).closest?.('input, select, textarea, [contenteditable="true"]')) return;

      if (event.key === 'ArrowLeft' && hasPrevious) onIndexChange(index - 1);
      if (event.key === 'ArrowRight' && hasNext) onIndexChange(index + 1);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasNext, hasPrevious, index, onIndexChange]);

  // The viewers close when their backdrop is clicked, which a click on a control must not do
  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onIndexChange(index + 1);
  };

  const handlePreviousClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onIndexChange(index - 1);
  };

  if (count < 2) return null;

  return (
    <>
      {hasPrevious && (
        <S.PreviousButton aria-label="Previous image" onClick={handlePreviousClick} type="button">
          <Icon icon={mdiChevronLeft} size={28} />
        </S.PreviousButton>
      )}
      {hasNext && (
        <S.NextButton aria-label="Next image" onClick={handleNextClick} type="button">
          <Icon icon={mdiChevronRight} size={28} />
        </S.NextButton>
      )}
      <S.Counter aria-live="polite">
        {index + 1} / {count}
      </S.Counter>
    </>
  );
};

export default ImageNavigation;
