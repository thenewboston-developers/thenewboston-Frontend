import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface EmptyStateProps {
  actionText?: string;
  bottomText: string;
  graphic: string;
  onActionTextClick?: GenericVoidFunction;
  size?: number;
  topText: string;
}

const EmptyState: SFC<EmptyStateProps> = ({
  actionText,
  bottomText,
  className,
  graphic,
  onActionTextClick,
  size,
  topText,
}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="Empty state" src={graphic} $size={size ? `${size}px` : ''} />
      <S.H3>{topText}</S.H3>
      <S.HelperText>
        <S.SpanGray>{bottomText}</S.SpanGray>
        {actionText && onActionTextClick && (
          <>
            {' '}
            <S.SpanBlue onClick={onActionTextClick}>{actionText}</S.SpanBlue>
          </>
        )}
      </S.HelperText>
    </S.Container>
  );
};

export default EmptyState;
