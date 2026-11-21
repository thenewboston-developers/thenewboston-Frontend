import authPromptReducer, {closeAuthPrompt, openAuthPrompt} from './authPrompt';

describe('auth prompt', () => {
  it('is closed until a signed-out visitor tries something that needs an account', () => {
    expect(authPromptReducer(undefined, {type: 'init'})).toEqual({intent: null});
  });

  it('remembers what the visitor was trying to do', () => {
    expect(authPromptReducer({intent: null}, openAuthPrompt('like this post'))).toEqual({intent: 'like this post'});
  });

  it('closes', () => {
    expect(authPromptReducer({intent: 'like this post'}, closeAuthPrompt())).toEqual({intent: null});
  });
});
