export type Role = 'Tank' | 'Heal' | 'Dps';

export type NoticeableSpell = 'BL' | 'PI' | 'BR';

export type Location = 'Ranged' | 'Melee';

export type CombinedRole = {
  role: Role;
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
    { role: 'Tank', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Paladin: PlayerClass = {
  name: 'Paladin',
  availableRoles: [
    { role: 'Tank', location: 'Melee' },
    { role: 'Heal', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Hunter: PlayerClass = {
  name: 'Hunter',
  availableRoles: [{ role: 'Dps', location: 'Ranged' }],
  noticeableSpells: ['BL'],
};

export const Rogue: PlayerClass = {
  name: 'Rogue',
  availableRoles: [{ role: 'Dps', location: 'Melee' }],
  noticeableSpells: [],
};

export const Priest: PlayerClass = {
  name: 'Priest',
  availableRoles: [
    { role: 'Heal', location: 'Ranged' },
    { role: 'Dps', location: 'Ranged' },
  ],
  noticeableSpells: [],
};

export const Shaman: PlayerClass = {
  name: 'Shaman',
  availableRoles: [
    { role: 'Heal', location: 'Ranged' },
    { role: 'Dps', location: 'Ranged' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: ['BL'],
};

export const Mage: PlayerClass = {
  name: 'Mage',
  availableRoles: [{ role: 'Dps', location: 'Ranged' }],
  noticeableSpells: ['BL'],
};

export const Warlock: PlayerClass = {
  name: 'Warlock',
  availableRoles: [{ role: 'Dps', location: 'Ranged' }],
  noticeableSpells: [],
};

export const Monk: PlayerClass = {
  name: 'Monk',
  availableRoles: [
    { role: 'Tank', location: 'Melee' },
    { role: 'Heal', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Druid: PlayerClass = {
  name: 'Druid',
  availableRoles: [
    { role: 'Tank', location: 'Melee' },
    { role: 'Heal', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
    { role: 'Dps', location: 'Ranged' },
  ],
  noticeableSpells: ['BR'],
};

export const DH: PlayerClass = {
  name: 'Demon Hunter',
  availableRoles: [
    { role: 'Tank', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const DK: PlayerClass = {
  name: 'Death Knight',
  availableRoles: [
    { role: 'Tank', location: 'Melee' },
    { role: 'Dps', location: 'Melee' },
  ],
  noticeableSpells: [],
};

export const Evoker: PlayerClass = {
  name: 'Evoker',
  availableRoles: [
    { role: 'Heal', location: 'Ranged' },
    { role: 'Dps', location: 'Ranged' },
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
