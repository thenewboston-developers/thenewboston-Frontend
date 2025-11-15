import {Fragment, ReactNode} from 'react';

import Linkify from 'components/Linkify';
import {SFC, UserReadSerializer} from 'types';

import * as S from './Styles';

export interface ContentWithMentionsProps {
  content: string;
  mentionedUsers: UserReadSerializer[];
}

const ContentWithMentions: SFC<ContentWithMentionsProps> = ({className, content, mentionedUsers}) => {
  const renderContentWithMentions = (): ReactNode => {
    if (!mentionedUsers || mentionedUsers.length === 0) {
      return content;
    }

    const userMap = new Map<string, UserReadSerializer>();
    mentionedUsers.forEach((user) => {
      userMap.set(user.username.toLowerCase(), user);
    });

    const mentionRegex = /@(\w+)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null = mentionRegex.exec(content);

    while (match !== null) {
      const username = match[1];
      const user = userMap.get(username.toLowerCase());

      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      if (user) {
        parts.push(
          <S.MentionLink key={match.index} to={`/profile/${user.id}`}>
            @{user.username}
          </S.MentionLink>,
        );
      } else {
        parts.push(match[0]);
      }

      lastIndex = match.index + match[0].length;
      match = mentionRegex.exec(content);
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
  };

  return (
    <S.Container className={className}>
      <Linkify>{renderContentWithMentions()}</Linkify>
    </S.Container>
  );
};

export default ContentWithMentions;
