const LobbyMark = ({reversed = false}: {reversed?: boolean}) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="70" viewBox="0 0 112 70" width="112">
    <path d="M8 4h96v62H8z" fill="#173e33" stroke="#bd9659" />
    <path d="m14 5 9 42 9-42m26 0 9 42 9-42m4 0 9 42 9-42" fill="#dfc79c" />
    <path d="m36 65 9-42 9 42m26 0 9-42 9 42" fill="#b96b50" />
    <path d="M55 4v62" stroke="#bd9659" strokeWidth="4" />
    {[0, 1, 2].map((piece) => (
      <g key={piece}>
        <circle cx={reversed ? 89 : 23} cy={14 + piece * 14} fill="#f5e5c4" r="7" stroke="#b39460" />
        <circle cx={reversed ? 89 : 23} cy={14 + piece * 14} r="4.5" stroke="#d0b785" />
        <circle cx={reversed ? 45 : 89} cy={56 - piece * 14} fill="#b96b50" r="7" stroke="#e6a17c" />
        <circle cx={reversed ? 45 : 89} cy={56 - piece * 14} r="4.5" stroke="#d18a68" />
      </g>
    ))}
  </svg>
);

export default LobbyMark;
