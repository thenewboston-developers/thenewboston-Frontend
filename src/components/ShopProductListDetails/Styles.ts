import styled, {css} from 'styled-components';

import UPriceMini from 'components/PriceMini';
import {colors, fonts, listItemDescription, listItemName} from 'styles';
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
  color: ${colors.gray};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
`;

export const Name = styled.div<{onClick?: GenericVoidFunction}>`
  ${listItemName};
  ${({onClick}) => !!onClick && isClickableMixin}
  color:${colors.black};
  margin-top: 10px;
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 10px;
`;

export const Date = styled.div`
  color: ${colors.black};
  font-weight: ${fonts.weight.regular};
  margin: 20px 0px 10px 0px;
`;
