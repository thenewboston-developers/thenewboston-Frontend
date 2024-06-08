import styled from 'styled-components';
import 'styles/fonts.css';
import {breakpoints, colors, fonts} from 'styles';

export const CardsContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 12px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
    padding: 0;
    margin: 0;
  }
`;
export const Code = styled.div`
  background-color: ${colors.white};
  border-radius: 10px;
  font-size: 12px;
  margin-left: 10px;
  padding: 0 10px;
`;

export const CodeContainer = styled.div`
  background-color: ${colors.whiteHover};
  border-radius: 10px;
  flex: 1;
  padding: 5px 5px;
  margin-left: 15px;
  min-width: 100px;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  @media (max-width: ${breakpoints.mobile}) {
    margin: 0;
    padding: 0;
    width: 5vw;
  }
`;

export const CodeValueWrapper = styled.div`
  margin-bottom: 4px;
`;

export const ContentDetail = styled.div`
  margin-left: 25px;
`;

export const ContentTitle = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-left: 20px;
`;

export const CodeTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  padding: 13px;
`;

export const Detail = styled.div`
  font-size: 12px;
  margin-left: 10px;
  padding: 5px 15px;
`;

export const Img = styled.img`
  height: 40px;
  width: 40px;
`;

export const LearnMoreCardContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 5px 8px 0px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 70vw;
    margin: 0;
  }
`;

export const Line = styled.div`
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 5px,
    ${colors.lightBlue} 5px,
    ${colors.lightBlue} 10px
  );
  height: 88%;
  left: 13px;
  position: absolute;
  top: 30px;
  width: 2px;
  z-index: 0;
`;

export const LearnMoreContainer = styled.div`
  padding: 24px 30px;
  margin: 0;
  font-family: OpenSans;
  overflow-y: auto;
  @media (max-width: ${breakpoints.mobile}) {
    margin: 0;
    padding: 1vw;
  }
`;

export const ListContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ListItem = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const ListLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  padding-top: 5px;
  width: 100%;
`;

export const RoleNumber = styled.div`
  align-items: center;
  background-color: ${colors.lightBlue};
  border-radius: 50%;
  color: white;
  display: flex;
  height: 30px;
  justify-content: center;
  position: relative;
  width: 30px;
  z-index: 0;
`;

export const Span = styled.span`
  color: 'red',
  fontWeight: 'bold',
`;

export const SystemArchContainer = styled(LearnMoreCardContainer)`
  flex-direction: row;
  grid-column: 1 / -1;
  gap: 1vw;
  flex-wrap: wrap;
`;

export const SystemArchLeft = styled(LearnMoreCardContainer)`
  border: none;
`;
