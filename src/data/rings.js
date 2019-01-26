// const ADOPT = 0;
// const TRIAL = 1;
// const ASSESS = 2;
// const HOLD = 3;
export const RINGS = [
  { radius: 180, name: 'ADOPT', color: '#93c47d' },
  { radius: 260, name: 'TRIAL', color: '#93d2c2' },
  { radius: 330, name: 'ASSESS', color: '#fbdb84' },
  { radius: 390, name: 'HOLD', color: '#efafa9' },
  // { radius: 440, name: 'DEAD', color: '#efafa9' },
];

export const RING_NAMES = RINGS.map( (ring) => {
  return ring.name;
})

export const CUSTOM_RING_FILTERS = {
  'I know it quite well': ['ADOPT', 'TRIAL', 'HOLD'],
  'I would like to know it better': ['TRIAL', 'ASSESS'],
};
