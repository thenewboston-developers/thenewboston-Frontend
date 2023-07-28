import styled from 'styled-components';

import UAddressCard from 'components/AddressCard';
import {colors} from 'styles';

export const AddressCard = styled(UAddressCard)`
  padding: 8px 12px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const DetailsRow = styled.div`
  display: flex;
  gap: 24px;
`;

export const MainArea = styled.div`
  padding: 16px 24px;
`;

export const OrderProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 100px auto;
  margin-top: 24px;
`;

export const Participants = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  gap: 16px;
`;
