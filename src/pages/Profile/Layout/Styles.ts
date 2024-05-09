import styled from 'styled-components';
import Pattern from '../../../assets/profile-pattern.png';
import {colors} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  position: relative;

  &::after {
    content: '';
    background-image: url(${Pattern});
    height: 125px;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
`;

export const OutletContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-top: 33px;
`;

export const CountButton = styled.span`
  background-color: ${colors.background};
  border-radius: 26px;
  padding: 2px 8px;
  border: 1px solid ${colors.palette.gray[300]};
  color: ${colors.gray};
  text-align: center;
`;
