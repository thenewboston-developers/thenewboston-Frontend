import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const CodeValue = styled.span`
  font-family: monospace;
  font-size: 14px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const DropdownMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  button {
    border-radius: 6px;
    padding: 6px;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${colors.palette.gray[100]};
    }
  }
`;

export const InvitationActions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const InvitationCard = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const InvitationDetails = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 16px;
    grid-template-columns: 1fr;
  }
`;

export const InvitationHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

export const InvitationMainInfo = styled.div`
  display: flex;
  flex: 1;
`;

export const NoteItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  grid-column: 1 / -1;
`;

export const StatusBadgeWrapper = styled.div`
  align-items: center;
  display: inline-flex;
`;
