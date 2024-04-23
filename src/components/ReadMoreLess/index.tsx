import {useState, FC} from 'react';

import * as S from './Styles';

interface ReadMoreLessProps {
  maxLength: number;
  readLessText?: string;
  readMoreText?: string;
  text: string;
}

const ReadMoreLess: FC<ReadMoreLessProps> = ({
  maxLength,
  readLessText = 'Read Less',
  readMoreText = 'Read More',
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return null;
  }

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isExpanded ? (
        <span>
          {text} <S.Anchor onClick={toggleIsExpanded}>{readLessText}</S.Anchor>
        </span>
      ) : (
        <span>
          {text.substring(0, maxLength)}... <S.Anchor onClick={toggleIsExpanded}>{readMoreText}</S.Anchor>
        </span>
      )}
    </div>
  );
};

export default ReadMoreLess;
