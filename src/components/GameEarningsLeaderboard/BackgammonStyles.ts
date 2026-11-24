import styled from 'styled-components';

import * as Pagination from 'components/Pagination/Styles';
import * as UserLabel from 'components/UserLabel/Styles';

import * as S from './Styles';

export const Card = styled(S.Card)`
  background: #fbf5e7;
  border: 1px solid #8b6c43;
  border-radius: 16px;
  box-shadow:
    0 5px 0 #64452f,
    0 12px 28px #3f2d1b12;

  ${S.Header} {
    background: radial-gradient(ellipse at 90% 0, #2c5545, transparent 65%), #173e33;
    border-bottom: 1px solid #bd9659;
    padding-bottom: 42px;
    position: relative;

    &::after {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='16' viewBox='0 0 96 16'%3E%3Cpath d='M0 16 24 0 48 16Z' fill='%23c5a774' fill-opacity='.4'/%3E%3Cpath d='m48 16 24-16 24 16Z' fill='%23e8dcc1' fill-opacity='.16'/%3E%3C/svg%3E")
        repeat-x bottom left;
      bottom: 0;
      content: '';
      height: 16px;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
    }
  }

  ${S.Heading} {
    color: #fff2d9;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(28px, 3vw, 34px);
    font-weight: 400;
    letter-spacing: -0.035em;
  }

  ${S.Eyebrow} {
    color: #dfc48f;
    font-size: 10px;
    letter-spacing: 0.16em;
    line-height: 1.6;
  }

  ${S.Description} {
    color: #6c604f;
  }

  ${S.Header} ${S.Description} {
    color: #cfdbcf;
    max-width: 570px;
  }

  ${S.Trophy} {
    background: #e9d5a8;
    border: 4px double #896b3e;
    border-radius: 50%;
    box-shadow:
      0 3px 0 #a1834e,
      inset 0 0 0 3px #f7e7c4;
    color: #5e4828;
    height: 58px;
    width: 58px;
  }

  ${S.Period} {
    background: #ffffff0c;
    border: 1px solid #cfb57e66;
    border-radius: 4px;
    color: #ecd9b1;
  }

  ${S.Table} {
    th {
      background: #eee4d0;
      color: #695537;
      font-size: 10px;
      letter-spacing: 0.1em;
      padding-bottom: 14px;
      padding-top: 14px;
      text-transform: uppercase;
    }

    td {
      border-top-color: #ddceb4;
      padding-bottom: 18px;
      padding-top: 18px;
    }

    th:last-child,
    td:last-child {
      width: 220px;
    }

    tbody tr:nth-child(even) {
      background: #f5eddc;
    }

    tbody tr:hover {
      background: #efe3ca;
    }
  }

  ${S.Amount} {
    color: #244c3b;
    font-size: 20px;

    small {
      color: #77613d;
      font-size: 10px;
      letter-spacing: 0.06em;
    }
  }

  ${S.Footer} {
    background: #f3ead7;
    border-top-color: #ddceb4;
  }

  ${S.Message} {
    color: #6c604f;
    min-height: 150px;

    strong {
      color: #284936;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 23px;
      font-weight: 400;
    }
  }

  ${S.Retry} {
    background: #fffbf2;
    border-color: #b8a17c;
    color: #284936;

    &:focus-visible {
      outline-color: #9a702e;
    }
  }

  ${UserLabel.Description} {
    color: #75654d;
  }

  ${UserLabel.Username} {
    color: #2d4433;
  }

  ${Pagination.NavigationButton},
  ${Pagination.PageButton} {
    background: #fffbf2;
    border-color: #cdbb99;
    color: #34513e;

    &:hover:not(:disabled) {
      background: #e8dcc1;
      border-color: #a68c5e;
    }

    &:focus-visible {
      border-color: #9a702e;
      box-shadow: 0 0 0 3px #bd96594d;
    }

    &[aria-current='page'] {
      background: #244c3b;
      border-color: #244c3b;
      color: #fff2d9;
    }

    &:disabled {
      background: transparent;
      color: #9c8c72;
    }
  }

  @media (max-width: 600px) {
    ${S.Table} {
      th:last-child,
      td:last-child {
        width: 150px;
      }
    }
  }

  @media (max-width: 480px) {
    ${S.Amount} {
      font-size: 14px;
    }

    ${S.Table} {
      th:first-child,
      td:first-child {
        width: 60px;
      }

      th:last-child,
      td:last-child {
        width: 124px;
      }
    }
  }

  @media (max-width: 400px) {
    ${UserLabel.AvatarLink} {
      display: none;
    }
  }
`;

export const Rank = styled(S.Rank)`
  align-items: center;
  background: ${({$podium}) =>
    $podium ? 'linear-gradient(145deg, #315a46, #173e33)' : 'linear-gradient(145deg, #fffbeb, #e5d4ad)'};
  border: 1px solid ${({$podium}) => ($podium ? '#bba16b' : '#c5af83')};
  border-radius: 50%;
  box-shadow:
    0 3px 0 ${({$podium}) => ($podium ? '#102c24' : '#baa37a')},
    inset 0 0 0 3px ${({$podium}) => ($podium ? '#bba16b36' : '#fff8e699')};
  color: ${({$podium}) => ($podium ? '#f7e5b8' : '#6a5431')};
  display: inline-flex;
  height: 36px;
  justify-content: center;
  min-width: 36px;
  padding: 6px;
`;
