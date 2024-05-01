import {ReactNode} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

import Loader from 'components/Loader';
import {SFC} from 'types';
import * as S from './Styles';

interface InfiniteScrollProps {
  children: ReactNode;
  dataLength: number;
  hasMore: boolean;
  next: () => void;
}

const InfiniteScroll: SFC<InfiniteScrollProps> = ({children, dataLength, hasMore, next}) => {
  const infiniteScrollComponentHeight = window.innerHeight - 105;

  return (
    <S.InfiniteScrollContainer>
      <InfiniteScrollComponent
        className="infinite-scroll-component"
        dataLength={dataLength}
        hasMore={hasMore}
        height={infiniteScrollComponentHeight}
        loader={
          <S.LoaderContainer>
            <Loader size={24} />
          </S.LoaderContainer>
        }
        next={next}
      >
        {children}
      </InfiniteScrollComponent>
    </S.InfiniteScrollContainer>
  );
};

export default InfiniteScroll;
