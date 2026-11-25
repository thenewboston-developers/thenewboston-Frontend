import {splitMentions} from 'utils/strings';

describe('splitMentions', () => {
  it('splits text into plain parts and mentions', () => {
    expect(splitMentions('@bucky thanks, and @Demo_Maya too!')).toEqual([
      {isMention: true, text: '@bucky'},
      {isMention: false, text: ' thanks, and '},
      {isMention: true, text: '@Demo_Maya'},
      {isMention: false, text: ' too!'},
    ]);
  });

  it('keeps text without mentions in one part', () => {
    expect(splitMentions('No mentions here')).toEqual([{isMention: false, text: 'No mentions here'}]);
    expect(splitMentions('')).toEqual([]);
  });

  it('does not treat the @ of an email address as a mention', () => {
    expect(splitMentions('Mail me@example.com or ask (@bucky)')).toEqual([
      {isMention: false, text: 'Mail me@example.com or ask ('},
      {isMention: true, text: '@bucky'},
      {isMention: false, text: ')'},
    ]);
  });

  it('only counts the given usernames, in any case, when they are known', () => {
    expect(splitMentions('@BUCKY meet @nobody', ['bucky'])).toEqual([
      {isMention: true, text: '@BUCKY'},
      {isMention: false, text: ' meet @nobody'},
    ]);
  });
});
