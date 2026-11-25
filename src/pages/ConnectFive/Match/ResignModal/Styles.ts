import styled from 'styled-components';

import {Wrapper as IconWrapper} from 'components/Icon/Styles';
import {Header as ModalHeader} from 'components/Modal/Styles';
import UConfirmationModal from 'modals/ConfirmationModal';
import {Message} from 'modals/ConfirmationModal/Styles';

import {classic} from '../../theme';

export const ConfirmationModal = styled(UConfirmationModal)`
  background: ${classic.surface};
  border: 1px solid ${classic.borderStrong};
  color: ${classic.text};
  max-width: calc(100vw - 32px);

  ${ModalHeader} {
    border-color: ${classic.border};

    ${IconWrapper}:hover {
      background: ${classic.surfaceRaised};
    }
  }

  ${Message} {
    color: ${classic.textSecondary};
  }

  button {
    background: ${classic.surfaceRaised};
    border-color: ${classic.borderStrong};
    color: ${classic.text};

    &:focus-visible {
      outline: 2px solid ${classic.focus};
      outline-offset: 3px;
    }

    &:hover {
      background: ${classic.border};
    }

    &:last-child {
      background: ${classic.negativeSoft};
      border-color: ${classic.negative};
      color: ${classic.negative};
    }
  }
`;
