import React from 'react';
import ReactLoadingSkeleton from 'react-loading-skeleton';

interface SkeletonProps {
  borderRadius?: string | number;
  circle?: boolean;
  className?: string;
  count?: number;
  direction?: 'ltr' | 'rtl';
  enableAnimation?: boolean;
  height?: string | number;
  width?: string | number;
}

const defaultProps: SkeletonProps = {};

const Skeleton: React.FC<SkeletonProps> = (props = defaultProps) => {
  return (
    <div className={props.className}>
      <ReactLoadingSkeleton
        borderRadius={props.borderRadius}
        circle={props.circle}
        count={props.count}
        direction={props.direction}
        enableAnimation={props.enableAnimation}
        height={props.height}
        width={props.width}
      />
    </div>
  );
};

export default Skeleton;
