import styled from 'styled-components';

import {Link} from 'react-router-dom';
import {colors, fonts} from 'styles';

export const BreadcrumbNav = styled.nav`
  padding: 0 5px 20px 5px;
`;

export const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

export const BreadcrumbItem = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
    &:after {
      content: '>';
      margin-left: 8px;
      color: ${colors.gray};
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.gray};
  font-weight: ${fonts.weight.semiBold};
  font-size: 12px;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledSpan = styled.span`
  color: ${colors.black};
  font-weight: ${fonts.weight.semiBold};
  font-size: 12px;
`;
