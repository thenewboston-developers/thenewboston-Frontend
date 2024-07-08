import styled from 'styled-components';
import {colors} from 'styles';
import ULine from 'components/Line';

export const Container = styled.div``;

export const ContributorCardContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 20px;
`;

export const LogoContainer = styled.div``;

export const Line = styled(ULine)`
  margin: 15px 0px;
`;

export const NameContainer = styled.div`
  margin-top: 7px;
`;
