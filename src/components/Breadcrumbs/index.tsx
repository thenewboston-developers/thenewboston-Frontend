import {SFC} from 'types';

import * as S from './Styles';

export interface BadgeProps {
  paths: {
    label: string;
    url?: string;
  }[];
}

const Breadcrumbs: SFC<BadgeProps> = ({paths}) => {
  return (
    <S.BreadcrumbNav aria-label="breadcrumb">
      <S.BreadcrumbList>
        {paths.map((path, index) => (
          <S.BreadcrumbItem key={index}>
            {path.url && index < paths.length - 1 ? (
              <S.StyledLink to={path.url}>{path.label}</S.StyledLink>
            ) : (
              <span>{path.label}</span>
            )}
          </S.BreadcrumbItem>
        ))}
      </S.BreadcrumbList>
    </S.BreadcrumbNav>
  );
};

export default Breadcrumbs;
