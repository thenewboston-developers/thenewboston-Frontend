import {ReactNode, forwardRef} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import Loader from 'components/Loader';
import * as S from './Styles';

interface InfiniteScrollProps {
  children: ReactNode;
  dataLength: number;
  hasMore: boolean;
  heightMargin?: number;
  loader?: ReactNode;
  next: () => void;
}

const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  ({children, dataLength, hasMore, next, heightMargin = 105, loader = null}, ref) => {
    const infiniteScrollComponentHeight = window.innerHeight - heightMargin;

    return (
      <S.InfiniteScrollContainer ref={ref}>
        <InfiniteScrollComponent
          className="infinite-scroll-component"
          dataLength={dataLength}
          hasMore={hasMore}
          height={infiniteScrollComponentHeight}
          loader={<S.LoaderContainer>{loader ? loader : <Loader size={24} />}</S.LoaderContainer>}
          next={next}
        >
          {children}
        </InfiniteScrollComponent>
      </S.InfiniteScrollContainer>
    );
  },
);

export default InfiniteScroll;
