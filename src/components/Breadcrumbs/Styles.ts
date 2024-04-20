import styled from 'styled-components';

import {Link} from 'react-router-dom';

export const BreadcrumbNav = styled.nav`
  padding: 10px 5px;
  border-radius: 5px;
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
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0275d8;
  &:hover {
    text-decoration: underline;
  }
`;
