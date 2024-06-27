import {Form as UForm} from 'formik';
import styled from 'styled-components';
import {Textarea as UTextarea, Input as UInput, Select as USelect} from 'components/FormElements';
import UModal from 'components/Modal';
import {breakpoints, colors, fonts} from 'styles';

const IMAGE_SIZE = '28px';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 500px;
  @media (max-width: ${breakpoints.mini}) {
    min-width: 100%;
  }
`;
export const Input = styled(UInput)`
  border-radius: 14px;
`;
export const Select = styled(USelect)`
  border-radius: 14px;
`;
export const PriceAmount = styled(UInput)`
  border-radius: 14px;
`;
export const Form = styled(UForm)`
  @media (max-width: ${breakpoints.desktop}) {
    max-height: 350px;
    overflow-y: auto;
  }
`;
export const Bumper = styled.div`
  margin-bottom: 24px;
`;
export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;
export const ImageInput = styled.div`
  align-items: center;
  border-radius: 14px;
  border: 1px dashed ${colors.palette.gray[500]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100px;
`;
export const Text = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const TextArea = styled(UTextarea)`
  border-radius: 14px;
  max-height: 200px;
  overflow-y: auto;
`;
export const Img = styled.img`
  height: ${IMAGE_SIZE};
  margin-bottom: 10px;
  width: ${IMAGE_SIZE};
`;
export const Box = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

export const CurrencyInput = styled.div`
  width: 100%;
`;
export const PriceInput = styled.div`
  width: 100%;
`;
export const Span = styled.span`
  font-weight: ${fonts.weight.semiBold};
`;
export const Div = styled.div``;
