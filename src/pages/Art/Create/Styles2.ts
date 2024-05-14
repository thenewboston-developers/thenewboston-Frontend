import styled from 'styled-components';

import _Button from 'components/Button';
import {Form as _Form} from 'formik';
import {breakpoints, colors, fonts} from 'styles';

export const Button = styled(_Button)<{$color?: string}>`
  background: ${(props) => props.$color || ''};
  color: ${(props) => (props.$color === 'transparent' ? colors.black : colors.white)};
  width: 100%;

  &:hover {
    background: ${(props) => (props.$color === 'transparent' ? 'unset' : colors.palette.red['500'])};
  }
`;

export const ImageCarouselContainer = styled.div`
  padding: 24px 16px;
  width: 100%;

  @media (min-width: ${breakpoints.mobile}) {
    width: 60%;
  }
`;

export const VectorIcon = styled.img`
  width: 40px;
  position: relative;
  height: 40px;
  z-index: 0;
`;
export const VectorIcon1 = styled.img`
  width: 0px;
  position: absolute;
  margin: 0 !important;
  height: 6.25%;
  top: 33.25%;
  bottom: 60.5%;
  left: 62.5%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 1;
`;
export const VectorIcon2 = styled.img`
  width: 75%;
  position: absolute;
  margin: 0 !important;
  height: 75%;
  top: 12.5%;
  right: 12.5%;
  bottom: 12.5%;
  left: 12.5%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 2;
`;
export const VectorIcon3 = styled.img`
  width: 54.25%;
  position: absolute;
  margin: 0 !important;
  height: 23.5%;
  top: 43%;
  right: 33.25%;
  bottom: 33.5%;
  left: 12.5%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 3;
`;
export const VectorIcon4 = styled.img`
  width: 29.25%;
  position: absolute;
  margin: 0 !important;
  height: 15.25%;
  top: 51.5%;
  right: 12.5%;
  bottom: 33.25%;
  left: 58.25%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  z-index: 4;
`;
export const Frame = styled.div`
  width: 40px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
export const Icon = styled.div`
  width: 80px;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;
export const Describe = styled.div`
  width: 297px;
  position: relative;
  line-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`;
export const Desicon = styled.div`
  height: 144px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Cardheader = styled.b`
  position: relative;
  line-height: 20px;
  text-transform: uppercase;
`;
export const Textarea = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  color: #000;
  opacity: 0.4;
`;
export const Card = styled.div`
  align-self: stretch;
  height: 113px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  textarea {
    background: ${colors.white};
    border: none;
    box-shadow: none;
    height: 50vh;
    outline: none;
    overflow: auto;
    padding: 0;
    resize: none;

    &::placeholder {
      font-size: 16px;
      font-weight: ${fonts.weight.semiBold};
      line-height: 26px;
    }
  }

  textarea {
    background: ${colors.white};
    border: none;
    box-shadow: none;
    height: 50vh;
    outline: none;
    overflow: auto;
    padding: 0;
    resize: none;

    &::placeholder {
      font-size: 16px;
      font-weight: ${fonts.weight.semiBold};
      line-height: 26px;
    }
  }
`;
export const Divider = styled.div`
  align-self: stretch;
  position: relative;
  border-top: 1px solid #f1f1f1;
  box-sizing: border-box;
  height: 1px;
`;
export const Div = styled.div`
  position: relative;
  letter-spacing: -0.01em;
  font-weight: 600;
  text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;
`;
export const Wrapper = styled.div`
  width: 45px;
  border-radius: 100px;
  background-color: #000;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
  box-sizing: border-box;
  color: #fff;
`;
export const GenerateArt = styled.div`
  position: relative;
  letter-spacing: -0.01em;
  font-weight: 600;
`;
export const FrameDiv = styled.div`
  width: 45px;
  border-radius: 100px;
  border: 1.5px solid #ededed;
  box-sizing: border-box;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Radiogroup = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  text-align: center;
  font-size: 14px;
  color: #000;

  input[type='radio'] {
    display: none;
  }

  span {
    align-items: center;
    border-radius: 50%;
    border: 1.5px solid #ededed;
    cursor: pointer;
    display: flex;
    height: 34px;
    justify-content: center;
    line-height: 20px;
    text-align: center;
    width: 34px;
  }

  input[type='radio']:checked + span {
    background-color: black;
    color: white;
  }
`;
export const Card1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
`;
export const Card2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
  @media screen and (max-width: 960px) {
    flex: unset;
    align-self: stretch;
  }
`;
export const Available = styled.div`
  position: relative;
  line-height: 26px;
`;
export const Tnb = styled.div`
  position: relative;
  font-size: 16px;
  line-height: 26px;
  text-align: right;
`;
export const Carddiv = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
export const Divider1 = styled.div`
  width: 100%;
  position: relative;
  border-top: 1px solid #e9e9e9;
  box-sizing: border-box;
  height: 1px;
`;
export const Available1 = styled.b`
  position: relative;
  line-height: 26px;
`;
export const Tnb1 = styled.b`
  position: relative;
  font-size: 16px;
  line-height: 26px;
  text-align: right;
`;
export const Btn = styled.div`
  flex: 1;
  border-radius: 100px;
  background-color: #dc0d16;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
`;
export const Btn1 = styled.div`
  width: 130px;
  border-radius: 100px;
  border: 1.5px solid #000;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 49px;
  opacity: 0.3;
  color: #000;
`;
export const Cardbtns = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
`;
export const Card3 = styled.div`
  min-width: 320px;
  border-radius: 16px;
  background-color: #f4f5f6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 13px;
  font-size: 14px;
  color: #000;
  @media screen and (max-width: 960px) {
    margin-top: 40px;
  }
  @media screen and (max-width: 420px) {
    align-self: stretch;
    width: auto;
    height: auto;
    min-width: 200px;
  }
`;
export const Form = styled(_Form)`
  align-self: stretch;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  text-align: left;
  font-size: 12px;
  color: #747474;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
  @media screen and (max-width: 420px) {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
`;
export const ContainerRoot = styled.div`
  width: 100%;
  background-color: #f4f5f6;
  max-width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 25px;
  box-sizing: border-box;
  gap: 180px;
  text-align: center;
  font-size: 16px;
  font-family: 'Open Sans';
  @media screen and (max-width: 960px) {
    gap: 20px;
  }
  @media screen and (max-width: 420px) {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
`;
