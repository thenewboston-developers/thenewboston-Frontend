const Artwork = () => (
  <svg aria-label="Ships on a navy blue Battleship grid" role="img" viewBox="0 0 500 400" width="100%">
    <rect fill="#102e40" height="400" rx="22" width="500" />
    {Array.from({length: 11}, (_, index) => (
      <g key={index} stroke="#315367" strokeWidth="1">
        <path d={`M${70 + index * 32} 40v320 M70 ${40 + index * 32}h320`} />
      </g>
    ))}
    <g fill="#78a4b7" stroke="#a6c8d6" strokeWidth="2">
      <path d="M102 77l16-5 16 5v138l-16 13-16-13z" />
      <path d="M198 109l16-5 16 5v106l-16 13-16-13z" />
      <path d="M262 269l16-5 16 5v74l-16 13-16-13z" />
      <path d="M326 77l16-5 16 5v74l-16 13-16-13z" />
      <path d="M102 301l16-5 16 5v42l-16 13-16-13z" />
    </g>
    <g fill="#d6e9f0">
      <circle cx="182" cy="56" r="4" />
      <circle cx="310" cy="216" r="4" />
      <circle cx="150" cy="248" r="4" />
      <circle cx="374" cy="312" r="4" />
    </g>
    <g stroke="#f0ad76" strokeLinecap="round" strokeWidth="4">
      <path d="M109 143l18 18m0-18l-18 18 M205 111l18 18m0-18l-18 18" />
    </g>
    <circle cx="342" cy="184" fill="none" r="21" stroke="#efca83" strokeDasharray="3 5" strokeWidth="2" />
    <path d="M342 155v14m0 30v14m-29-29h14m30 0h14" stroke="#efca83" strokeWidth="2" />
  </svg>
);

export default Artwork;
