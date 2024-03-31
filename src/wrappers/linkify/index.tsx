import * as React from 'react';
import {SFC} from 'types';
import ReactLinkify from 'react-linkify';
import * as S from './Styles';

interface CustomLinkifyProps {
  children: React.ReactNode;
}

const Linkify: SFC<CustomLinkifyProps> = ({children}) => {
  const componentDecorator = (href: string, text: string, key: number) => (
    <S.Anchor target="_blank" rel="noopener noreferrer" href={href} key={key}>
      {text}
    </S.Anchor>
  );

  return <ReactLinkify componentDecorator={componentDecorator}>{children}</ReactLinkify>;
};

export default Linkify;
