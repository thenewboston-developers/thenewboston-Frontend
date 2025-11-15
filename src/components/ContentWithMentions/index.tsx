import {Fragment, ReactNode} from 'react';
import {Link} from 'react-router-dom';

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

    // Create a map of username to user data for quick lookup
    const userMap = new Map<string, UserReadSerializer>();
    mentionedUsers.forEach((user) => {
      userMap.set(user.username.toLowerCase(), user);
    });

    // Regular expression to find @mentions
    // Matches @ followed by alphanumeric characters and underscores
    const mentionRegex = /@(\w+)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null = mentionRegex.exec(content);

    while (match !== null) {
      const username = match[1];
      const user = userMap.get(username.toLowerCase());

      // Add text before the mention
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Add the mention as a link or plain text
      if (user) {
        parts.push(
          <S.MentionLink key={match.index} to={`/profile/${user.id}`}>
            @{user.username}
          </S.MentionLink>,
        );
      } else {
        // Not a valid mention, keep as plain text
        parts.push(match[0]);
      }

      lastIndex = match.index + match[0].length;
      match = mentionRegex.exec(content);
    }

    // Add remaining text after the last mention
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
