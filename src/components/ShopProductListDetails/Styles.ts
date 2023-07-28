import styled, {css} from 'styled-components';

import UPriceMini from 'components/PriceMini';
import {listItemDescription, listItemName} from 'styles';
import {GenericVoidFunction} from 'types';

const isClickableMixin = css`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  padding: 0 8px;
`;

export const Description = styled.div`
  ${listItemDescription};
`;

export const Name = styled.div<{onClick?: GenericVoidFunction}>`
  ${listItemName};
  ${({onClick}) => !!onClick && isClickableMixin}
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 10px;
`;
