import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const BreadcrumbNav = styled.nav`
  padding: 0 5px 20px 5px;
`;

export const BreadcrumbList = styled.ol`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const BreadcrumbItem = styled.li`
  &:not(:last-child) {
    margin-right: 8px;

    &:after {
      color: ${colors.gray};
      content: '>';
      margin-left: 8px;
    }
  }
`;

export const StyledLink = styled(Link)`
  color: ${colors.gray};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledSpan = styled.span`
  color: ${colors.black};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;
