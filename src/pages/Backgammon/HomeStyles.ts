import styled, {css} from 'styled-components';

import * as UserSearch from 'components/UserSearchInput/Styles';

import URules from './Rules';
import * as Base from './Styles';

export {Actions, Container, Error, FieldGrid, List, Navigation, PlayerName, TextLink} from './Styles';

const inlay = css`
  background:
    linear-gradient(135deg, #9c5e41 25%, transparent 25%) -12px 0 / 24px 16px repeat-x,
    linear-gradient(225deg, #294e3c 25%, transparent 25%) -12px 0 / 24px 16px repeat-x,
    #eddfc3;
`;

const surface = css`
  background: #fbf6ea;
  border: 1px solid #bba17a;
  box-shadow:
    0 3px 0 #64452f,
    0 8px 20px #3f2a1710;
`;

export const Badge = styled(Base.Badge)`
  background: #ebe1cc;
  border: 1px solid #d9c6a3;
  color: #5f4e34;
  font-size: 11px;
  font-weight: 600;
`;

export const Button = styled(Base.Button)`
  background: ${({$secondary}) => ($secondary ? '#f2e6ce' : '#244c3c')};
  border: 1px solid ${({$secondary}) => ($secondary ? '#c8ac7c' : '#17392d')};
  border-radius: 6px;
  box-shadow: 0 2px 0 #17392d;
  min-height: 46px;
`;

export const Detail = styled(Base.Detail)`
  color: #70624f;
`;

export const Empty = styled.div`
  align-items: center;
  background: #f2ead8;
  border: 1px dashed #cbbb98;
  border-radius: 8px;
  display: flex;
  gap: 20px;
  padding: 22px;

  > svg {
    flex-shrink: 0;
  }

  strong {
    color: #3b4b36;
    display: block;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
  }
`;

export const Eyebrow = styled(Base.Eyebrow)`
  color: #78603b;
  font-size: 10px;
  letter-spacing: 0.16em;
  margin-bottom: 8px;
`;

export const Field = styled(Base.Field)`
  color: #5f513b;
  line-height: 1.5;
`;

export const Form = styled(Base.Form)`
  flex: 1;

  > ${Base.Actions}:last-child {
    margin-top: auto;
    padding-top: 4px;
  }
`;

export const GuestActions = styled(Base.GuestActions)`
  button {
    background: #f1e5cb;
    border: 1px solid #c6ad80;
    border-radius: 6px;
    color: #254634;
    min-height: 46px;

    &:last-child {
      background: #244c3c;
      border-color: #17392d;
      color: #ffffff;
    }

    &:focus-visible {
      outline: 3px solid #b58a39;
      outline-offset: 3px;
    }
  }
`;

export const Input = styled(Base.Input)`
  background: #fffcf5;
  border-color: #cbbb99;
  border-radius: 6px;
  color: #3f4936;
`;

export const LobbyRules = styled(URules)`
  ${surface};
  border-radius: 12px;
  color: #70624f;

  summary {
    color: #254634;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 21px;
    font-weight: 400;

    &:focus-visible {
      outline: 3px solid #b58a39;
      outline-offset: 6px;
    }
  }

  li::marker {
    color: #8b6032;
    font-weight: 700;
  }
`;

export const MatchLink = styled(Base.MatchLink)`
  background: #fffcf5;
  border-color: #ded0b3;
  border-left: 4px solid #42715b;
  border-radius: 8px;
  color: #2c4535;

  &:hover {
    background: #f2ead8;
    border-color: #a38a5b;
  }
`;

export const Panel = styled(Base.Panel)`
  ${surface};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0;
`;

export const PanelBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 26px;

  ${UserSearch.Input} {
    background: #fffcf5;
    border-color: #cbbb99;
    border-radius: 6px;
    color: #3f4936;
    min-height: 44px;
  }

  ${UserSearch.Label} {
    color: #5f513b;
  }

  ${UserSearch.Dropdown} {
    background: #fffcf5;
    border-color: #cbbb99;
  }

  @media (max-width: 600px) {
    padding: 22px 18px;
  }
`;

export const PanelGrid = styled(Base.PanelGrid)`
  align-items: stretch;
`;

export const PanelHeader = styled.div`
  align-items: center;
  background: linear-gradient(110deg, #173e33, #294b3a);
  border-radius: 12px 12px 0 0;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 24px 26px 30px;
  position: relative;

  &::after {
    ${inlay};
    bottom: 0;
    content: '';
    height: 8px;
    left: 0;
    position: absolute;
    right: 0;
  }

  ${Eyebrow} {
    color: #dfc48f;
  }

  > svg {
    flex-shrink: 0;
    opacity: 0.95;
    width: 96px;
  }

  @media (max-width: 600px) {
    padding: 20px 18px 26px;

    > svg {
      width: 64px;
    }
  }
`;

export const PanelTitle = styled.h2`
  color: #fff0d5;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(23px, 2.3vw, 29px);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin: 0;
`;

export const Section = styled(Base.Section)`
  ${surface};
  border-radius: 14px;
  padding: 26px;

  @media (max-width: 600px) {
    padding: 22px 18px;
  }
`;

export const SectionHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #dfd0b0;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 18px;
`;

export const Select = styled(Base.Select)`
  background: #fffcf5;
  border-color: #cbbb99;
  border-radius: 6px;
  color: #3f4936;
`;

export const Small = styled(Base.Small)`
  color: #70624f;
`;

export const Status = styled(Base.Status)`
  background: #fbf6ea;
  border-color: #d9c6a3;
  border-radius: 10px;
`;

export const TitleSmall = styled(Base.TitleSmall)`
  color: #254634;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 27px;
  font-weight: 400;
  margin: 0;
`;
