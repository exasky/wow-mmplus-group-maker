export type RoleType = 'Tank' | 'Heal' | 'Dps';

export type NoticeableSpell = 'BL' | 'PI' | 'BR';

export type Location = 'Ranged' | 'Melee';

export type CombinedRole = {
  type: RoleType;
  location: Location;
};

export interface PlayerClass {
  name: string;
  availableRoles: CombinedRole[];
  noticeableSpells: NoticeableSpell[];
}

export const Warrior: PlayerClass = {
  name: 'Warrior',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Paladin: PlayerClass = {
  name: 'Paladin',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Heal', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Hunter: PlayerClass = {
  name: 'Hunter',
  availableRoles: [{ type: 'Dps', location: 'Ranged' }],
  noticeableSpells: ['BL'],
};

export const Rogue: PlayerClass = {
  name: 'Rogue',
  availableRoles: [{ type: 'Dps', location: 'Melee' }],
  noticeableSpells: [],
};

export const Priest: PlayerClass = {
  name: 'Priest',
  availableRoles: [
    { type: 'Heal', location: 'Ranged' },
    { type: 'Dps', location: 'Ranged' },
  ],
  noticeableSpells: [],
};

export const Shaman: PlayerClass = {
  name: 'Shaman',
  availableRoles: [
    { type: 'Heal', location: 'Ranged' },
    { type: 'Dps', location: 'Ranged' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: ['BL'],
};

export const Mage: PlayerClass = {
  name: 'Mage',
  availableRoles: [{ type: 'Dps', location: 'Ranged' }],
  noticeableSpells: ['BL'],
};

export const Warlock: PlayerClass = {
  name: 'Warlock',
  availableRoles: [{ type: 'Dps', location: 'Ranged' }],
  noticeableSpells: ["BR"],
};

export const Monk: PlayerClass = {
  name: 'Monk',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Heal', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Druid: PlayerClass = {
  name: 'Druid',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Heal', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
    { type: 'Dps', location: 'Ranged' },
  ],
  noticeableSpells: ['BR'],
};

export const DH: PlayerClass = {
  name: 'Demon Hunter',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const DK: PlayerClass = {
  name: 'Death Knight',
  availableRoles: [
    { type: 'Tank', location: 'Melee' },
    { type: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: ['BR'],
};

export const Evoker: PlayerClass = {
  name: 'Evoker',
  availableRoles: [
    { type: 'Heal', location: 'Ranged' },
    { type: 'Dps', location: 'Ranged' },
  ],
  noticeableSpells: ['BL'],
};

export const ALL_CLASSES = [
  Warrior,
  Paladin,
  Hunter,
  Rogue,
  Priest,
  Shaman,
  Mage,
  Warlock,
  Monk,
  Druid,
  DH,
  DK,
  Evoker,
];

export const MAP_NAME_CLASS = ALL_CLASSES.reduce((acc, curr) => {
  acc[curr.name] = curr;
  return acc;
}, {} as any);
