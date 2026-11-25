export const snakeToTitle = (str: string): string => {
  const words = str.split('_');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};

export const truncate = (str: string, size: number): string => {
  return str.length <= size ? str : `${str.slice(0, size)}...`;
};

export interface TextPart {
  isMention: boolean;
  text: string;
}

const MENTION_PATTERN = /@(\w+)/g;

/**
 * Splits text into plain parts and @mentions. With `usernames`, only mentions of those usernames (in any case) count.
 * An @ that follows a letter or digit, as in an email address, does not start a mention.
 */
export const splitMentions = (text: string, usernames?: string[]): TextPart[] => {
  const knownUsernames = usernames ? new Set(usernames.map((username) => username.toLowerCase())) : null;
  const parts: TextPart[] = [];
  let lastIndex = 0;

  for (const match of Array.from(text.matchAll(MENTION_PATTERN))) {
    const index = match.index ?? 0;
    const isMention =
      !/\w/.test(text.charAt(index - 1)) && (!knownUsernames || knownUsernames.has(match[1].toLowerCase()));

    if (isMention) {
      if (index > lastIndex) parts.push({isMention: false, text: text.slice(lastIndex, index)});
      parts.push({isMention: true, text: match[0]});
      lastIndex = index + match[0].length;
    }
  }

  if (lastIndex < text.length) parts.push({isMention: false, text: text.slice(lastIndex)});
  return parts;
};
