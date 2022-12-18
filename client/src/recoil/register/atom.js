import { atom } from 'recoil';

export const showCelebrateAtom = atom({
  key: 'showCelebrate',
  default: false,
});
export const showRegisterProfileAtom = atom({
  key: 'showRegisterProfile',
  default: false,
});
export const showAddProfileIconAtom = atom({
  key: 'showAddProfileIcon',
  default: false,
});
export const profileImgAtom = atom({
  key: 'profileImg',
  default: null,
});
