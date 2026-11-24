import styled from 'styled-components';

import UButton from 'components/Button';
import {Modal as UModal, Overlay as UOverlay} from 'components/Modal/Styles';

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 28px;
`;
export const CloseButton = styled.button`
  align-items: center;
  background: #f3f4f7;
  border: 0;
  border-radius: 50%;
  color: #546077;
  cursor: pointer;
  display: flex;
  height: 34px;
  justify-content: center;
  position: absolute;
  right: 18px;
  top: 18px;
  width: 34px;

  &:focus-visible {
    outline: 2px solid #806223;
    outline-offset: 3px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;
export const Description = styled.p`
  color: #596579;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`;
export const Dialog = styled(UModal)`
  border: 1px solid #e6e8ee;
  box-shadow: 0 24px 100px #101a3b33;
  box-sizing: border-box;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  padding: 32px;
  width: min(480px, calc(100vw - 32px));

  @media (max-width: 400px) {
    padding: 26px 22px;
  }
`;
export const Emblem = styled.span`
  align-items: center;
  background: #fff5d8;
  border: 1px solid #f2dfac;
  border-radius: 16px;
  color: #9c6d15;
  display: flex;
  height: 54px;
  justify-content: center;
  margin-bottom: 20px;
  width: 54px;
`;
export const Error = styled.p`
  background: #fff2f0;
  border-radius: 10px;
  color: #a03030;
  font-size: 13px;
  line-height: 1.6;
  margin: 16px 0 0;
  padding: 12px;
`;
export const Eyebrow = styled.p`
  color: #8a6a2d;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin: 0 0 10px;
`;
export const Field = styled.label`
  color: #3c465b;
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin: 24px 0 8px;
`;
export const Form = styled.form`
  margin: 0;
`;
export const GuestActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const Heading = styled.h2`
  color: #19243a;
  font-size: 27px;
  letter-spacing: -0.035em;
  line-height: 1.2;
  margin: 0 0 14px;

  &:focus {
    outline: none;
  }
`;
export const Input = styled.input`
  background: #f9fafc;
  border: 1px solid #d8dde7;
  border-radius: 12px;
  box-sizing: border-box;
  color: #19243a;
  font: inherit;
  font-size: 24px;
  font-weight: 600;
  min-width: 0;
  padding: 16px 72px 16px 18px;
  width: 100%;

  &:focus {
    border-color: #ac8339;
    outline: 3px solid #f4e7c9;
  }
`;
export const InputUnit = styled.span`
  color: #6c7483;
  font-size: 14px;
  font-weight: 600;
  pointer-events: none;
  position: absolute;
  right: 32px;
  top: 23px;
`;
export const InputWrapper = styled.div`
  position: relative;
`;
export const Note = styled.p`
  color: #6c7483;
  font-size: 12px;
  line-height: 1.6;
  margin: 10px 0 0;
`;
export const Overlay = styled(UOverlay)`
  backdrop-filter: blur(4px);
`;
export const PrimaryButton = styled(UButton)`
  background: #23324f;
  color: #ffffff;

  &:enabled:hover {
    background: #34496f;
  }

  &:disabled {
    background: #eceef2;
    color: #878d99;
  }
`;
