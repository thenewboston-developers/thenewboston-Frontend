import {createContext, useContext} from 'react';

// How any part of the game tells the player that something went wrong. The message floats above the bottom of the
// screen instead of being inserted into the page, so nothing the player is using moves.
export const NoticeContext = createContext<(text: string) => void>(() => undefined);

export const useAlert = () => useContext(NoticeContext);
