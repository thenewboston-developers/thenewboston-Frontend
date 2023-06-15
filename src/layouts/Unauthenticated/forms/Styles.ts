import styled from 'styled-components';

import UButton from 'components/Button';
import {Input as UInput} from 'components/FormElements';

export const Button = styled(UButton)`
  width: 100%;
`;

export const Heading = styled.h2`
  color: #fff;
  margin-bottom: 12px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Panel = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px;
  width: 320px;
`;
