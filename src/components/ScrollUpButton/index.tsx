import React, {useCallback, useEffect, useState} from 'react';
import {mdiArrowUp} from '@mdi/js';
import Icon from '@mdi/react';

import {SFC} from 'types';

import * as S from './Styles';

interface ScrollToTopButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const ScrollToTopButton: SFC<ScrollToTopButtonProps> = ({targetRef}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [target, setTarget] = useState<Element | null>(null);

  const toggleVisibility = useCallback(() => {
    if (target && target.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [target]);

  const scrollToTop = () => {
    target?.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  useEffect(() => {
    setTarget(targetRef?.current?.children[0]?.children[0] || null);
  }, [targetRef]);

  useEffect(() => {
    if (!target) {
      return;
    }

    target.addEventListener('scroll', toggleVisibility);

    return () => {
      target.removeEventListener('scroll', toggleVisibility);
    };
  }, [targetRef, target, toggleVisibility]);

  return (
    <>
      {isVisible && (
        <S.Button onClick={scrollToTop} aria-label="Scroll to top">
          <Icon path={mdiArrowUp} size={1} />
        </S.Button>
      )}
    </>
  );
};

export default ScrollToTopButton;
