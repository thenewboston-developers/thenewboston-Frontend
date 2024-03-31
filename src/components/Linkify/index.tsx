import {ReactNode} from 'react';
import ReactLinkify from 'react-linkify';

import {SFC} from 'types';
import * as S from './Styles';

interface CustomLinkifyProps {
  children: ReactNode;
}

const Linkify: SFC<CustomLinkifyProps> = ({children}) => {
  const componentDecorator = (href: string, text: string, key: number) => (
    <S.Anchor href={href} key={key} rel="noopener noreferrer" target="_blank">
      {text}
    </S.Anchor>
  );

  return <ReactLinkify componentDecorator={componentDecorator}>{children}</ReactLinkify>;
};

export default Linkify;
