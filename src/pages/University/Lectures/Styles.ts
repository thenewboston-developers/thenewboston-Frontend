import Avatar from 'components/Avatar';
import styled from 'styled-components';
import {colors} from 'styles';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 24px 16px;
`;

export const SectionHeading = styled.div`
  align-items: center;
  display: flex;
  padding: 20px 22px;
`;

export const LectureAvatar = styled(Avatar)`
  img {
    color: ${colors.gray};
    height: 100%;
    margin-right: 8px;
    width: 100%;
  }
`;

export const H3 = styled.h3``;

export const H5 = styled.h5`
  color: ${colors.gray};
  text-transform: uppercase;
`;

export const Wrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 16px;
  overflow: hidden;
`;
