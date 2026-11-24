import styled from 'styled-components';

export const Amount = styled.strong`
  color: #785311;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  gap: 4px 6px;
  justify-content: flex-end;
  overflow-wrap: anywhere;

  small {
    align-self: center;
    color: #7c6c4e;
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
export const Card = styled.section`
  background: #ffffff;
  border: 1px solid #dfe4ec;
  border-radius: 22px;
  margin: 28px 0;
  overflow: hidden;
`;
export const Description = styled.p`
  color: #607083;
  font-size: 13px;
  line-height: 1.65;
  margin: 6px 0 0;
`;
export const Eyebrow = styled.p`
  color: #8b6729;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  margin: 0 0 5px;
`;
export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid #edf0f4;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  padding: 18px 24px;
`;
export const Header = styled.div`
  align-items: center;
  background: linear-gradient(120deg, #fffbf1, #ffffff 80%);
  display: flex;
  gap: 16px;
  padding: 26px 24px;

  @media (max-width: 480px) {
    gap: 12px;
    padding: 22px 16px;
  }
`;
export const Heading = styled.h2`
  color: #22374a;
  font-size: 26px;
  letter-spacing: -0.035em;
  margin: 0;
`;
export const Message = styled.div`
  align-items: center;
  color: #607083;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 10px;
  line-height: 1.7;
  padding: 36px 24px;
  text-align: center;

  strong {
    color: #22374a;
    font-size: 18px;
  }
`;
export const Period = styled.span`
  background: #f3f5f8;
  border-radius: 100px;
  color: #607083;
  flex-shrink: 0;
  font-size: 12px;
  margin-left: auto;
  padding: 7px 12px;

  @media (max-width: 600px) {
    display: none;
  }
`;
export const Rank = styled.span<{$podium: boolean}>`
  background: ${({$podium}) => ($podium ? '#fff1ce' : '#f3f5f8')};
  border-radius: 10px;
  color: ${({$podium}) => ($podium ? '#805719' : '#657185')};
  display: inline-block;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  padding: 8px 6px;
`;
export const Retry = styled.button`
  background: #ffffff;
  border: 1px solid #9aa7b6;
  border-radius: 8px;
  color: #22374a;
  cursor: pointer;
  font: inherit;
  padding: 8px 16px;

  &:focus-visible {
    outline: 3px solid #486db5;
    outline-offset: 3px;
  }
`;
export const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  caption {
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  th {
    background: #f8f9fb;
    color: #677589;
    font-size: 11px;
    font-weight: 600;
    padding: 12px 16px;
    text-align: left;
  }
  td {
    border-top: 1px solid #edf0f4;
    padding: 16px;
    vertical-align: middle;
  }
  th:first-child,
  td:first-child {
    padding-left: 24px;
    width: 76px;
  }
  th:last-child,
  td:last-child {
    padding-right: 24px;
    text-align: right;
    width: 160px;
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 12px 8px;
    }
    th:first-child,
    td:first-child {
      padding-left: 12px;
      width: 52px;
    }
    th:last-child,
    td:last-child {
      padding-right: 12px;
      width: 104px;
    }
  }
`;
export const Trophy = styled.span`
  align-items: center;
  background: #fff0c7;
  border: 1px solid #f0d28c;
  border-radius: 16px;
  color: #a57522;
  display: flex;
  flex-shrink: 0;
  height: 54px;
  justify-content: center;
  width: 54px;

  @media (max-width: 480px) {
    display: none;
  }
`;
