import React, {useState} from 'react';

import * as S from './Styles';

interface ReadMoreLessProps {
  text: string;
  maxLength: number;
  readMoreText?: string;
  readLessText?: string;
}

const ReadMoreLess: React.FC<ReadMoreLessProps> = ({
  text,
  maxLength,
  readMoreText = 'Read More',
  readLessText = 'Read Less',
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
