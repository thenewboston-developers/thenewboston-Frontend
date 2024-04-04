import React from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import Loader from 'components/Loader';
import * as S from './Styles';

import {SFC} from 'types';

interface InfiniteScrollProps {
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: SFC<InfiniteScrollProps> = ({dataLength, next, hasMore, children}) => {
  return (
    <S.InfiniteScrollContainer>
      <InfiniteScrollComponent
        className="infinite-scroll-component"
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={
          <S.LoaderContainer>
            <Loader size={24} />
          </S.LoaderContainer>
        }
        height={window.innerHeight}
      >
        {children}
      </InfiniteScrollComponent>
    </S.InfiniteScrollContainer>
  );
};

export default InfiniteScroll;
