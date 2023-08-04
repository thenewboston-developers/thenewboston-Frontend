import {Form as UForm} from 'formik';
import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';
import ULine from 'components/Line';
import {colors, fonts} from 'styles';

export const Container = styled.div``;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DetailRowContainer = styled.div`
  margin-bottom: 24px;
`;

export const Form = styled(UForm)`
  width: 260px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Label = styled.div`
  font-weight: ${fonts.weight.bold};
`;

export const Line = styled(ULine)`
  margin: 4px 0;
`;

// TODO: Standardize
export const Panel = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  margin-top: 16px;
  padding: 16px;
`;

export const Value = styled.div``;
