// A winning line is five stones in a row, so the top five ranks of a leaderboard are drawn as one
export const WINNING_LINE_LENGTH = 5;

export interface WinningLineLink {
  above: boolean;
  below: boolean;
}

export const isInWinningLine = (rank: number): boolean => rank >= 1 && rank <= WINNING_LINE_LENGTH;

/**
 * For each row of a leaderboard (in display order), whether the gold line of the winning line runs up and down from
 * its rank stone. The line only joins neighboring rows that are both inside the winning line, so ranks that share a
 * place keep the line unbroken and later pages, which hold no top five ranks, show no line at all.
 */
export const getWinningLineLinks = (ranks: number[]): WinningLineLink[] =>
  ranks.map((rank, index) => {
    const inLine = isInWinningLine(rank);
    return {
      above: inLine && index > 0 && isInWinningLine(ranks[index - 1]),
      below: inLine && index < ranks.length - 1 && isInWinningLine(ranks[index + 1]),
    };
  });
