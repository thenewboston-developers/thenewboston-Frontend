import {GenericVoidFunction, SFC} from 'types';

import * as S from './Styles';

export interface EmptyPageProps {
  actionText?: string;
  bottomText: string;
  graphic: string;
  onActionTextClick?: GenericVoidFunction;
  size?: number;
  topText: string;
}

const EmptyPage: SFC<EmptyPageProps> = ({
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
      <S.EmptyState
        actionText={actionText}
        bottomText={bottomText}
        graphic={graphic}
        onActionTextClick={onActionTextClick}
        size={size}
        topText={topText}
      />
    </S.Container>
  );
};

export default EmptyPage;
