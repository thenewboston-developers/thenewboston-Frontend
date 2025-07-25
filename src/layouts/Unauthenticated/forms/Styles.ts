import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import UButton from 'components/Button';
import {Checkbox as UCheckbox, Input as UInput} from 'components/FormElements';
import {colors, fonts} from 'styles';

export const Button = styled(UButton)`
  width: 100%;
`;

export const Checkbox = styled(UCheckbox)`
  width: 100%;
`;

export const Heading = styled.h2`
  color: #fff;
  margin-bottom: 12px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Link = styled(ULink)`
  color: #fff;
  font-weight: ${fonts.weight.bold};
`;

export const Panel = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px;
  width: 320px;
`;

export const QuestionText = styled.div`
  color: #fff;
  font-size: 12px;
  margin-top: 16px;
`;

export const TermsLink = styled.a`
  color: ${colors.palette.blue[500]};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${colors.palette.blue[600]};
  }
`;
