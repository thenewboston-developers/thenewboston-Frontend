import {ReactNode} from 'react';

import {LineEmblem, RankStone} from '../Stones';

import * as S from './Styles';

interface BoardProps {
  children: ReactNode;
  description: string;
  eyebrow: string;
  id?: string;
  isPageTitle?: boolean;
  period?: string;
  title: string;
  titleId: string;
}

// The walnut frame shared by the Connect Five leaderboards: the winning line emblem, a heading and the standings
export const StandingsBoard = ({
  children,
  description,
  eyebrow,
  id,
  isPageTitle = false,
  period,
  title,
  titleId,
}: BoardProps) => (
  <S.Board aria-labelledby={titleId} id={id}>
    <S.Header>
      <LineEmblem />
      <S.Heading>
        <S.Eyebrow>{eyebrow}</S.Eyebrow>
        <S.Title as={isPageTitle ? 'h1' : 'h2'} id={titleId}>
          {title}
        </S.Title>
        <S.Description>{description}</S.Description>
      </S.Heading>
      {period && <S.Period>{period}</S.Period>}
    </S.Header>
    {children}
  </S.Board>
);

interface PlayerProps {
  description?: string;
  inLine: boolean;
  isSelf?: boolean;
  user: {avatar: string | null; id: number; username: string};
}

export const StandingsPlayer = ({description, inLine, isSelf = false, user}: PlayerProps) => {
  const profilePath = `/profile/${user.id}`;

  return (
    <S.Player>
      <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
        <S.Avatar $inLine={inLine} size="40px" src={user.avatar} />
      </S.AvatarLink>
      <S.Identity>
        <S.NameRow>
          <S.Username to={profilePath}>{user.username}</S.Username>
          {isSelf && <S.SelfChip>You</S.SelfChip>}
        </S.NameRow>
        {description && <S.PlayerNote>{description}</S.PlayerNote>}
      </S.Identity>
    </S.Player>
  );
};

interface RankProps {
  lineAbove: boolean;
  lineBelow: boolean;
  rank: number;
}

export const StandingsRank = ({lineAbove, lineBelow, rank}: RankProps) => (
  <S.RankCell $lineAbove={lineAbove} $lineBelow={lineBelow}>
    <RankStone rank={rank} />
  </S.RankCell>
);
