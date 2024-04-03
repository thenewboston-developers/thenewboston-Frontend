import React from 'react';
import _InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'components/Loader';

import {SFC} from 'types';

interface InfiniteScrollProps {
  dataLength: number;
  next: () => void;
  hasMore: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: SFC<InfiniteScrollProps> = ({dataLength, next, hasMore, children}) => {
  return (
    <_InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={<Loader size={24} />}
      height={window.innerHeight}
    >
      {children}
    </_InfiniteScroll>
  );
};

export default InfiniteScroll;
