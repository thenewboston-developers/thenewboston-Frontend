export const snakeToTitle = (str: string): string => {
  const words = str.split('_');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};

export const truncate = (str: string, size: number): string => {
  return str.length <= size ? str : `${str.slice(0, size)}...`;
};
