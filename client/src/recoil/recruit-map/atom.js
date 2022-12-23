import { atom } from 'recoil';

export const regionAtom = atom({
  key: 'region',
  default: '홍대',
});

export const targetCafeAtom = atom({
  key: 'targetCafe',
  default: undefined,
});
