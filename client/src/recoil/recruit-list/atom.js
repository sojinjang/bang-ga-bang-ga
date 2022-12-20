import { atom } from 'recoil';

const showRecruitPostAtom = atom({
  key: 'showRecruitPost',
  default: false,
});

const showRecruitModalPageAtom = atom({
  key: 'showRecruitModalPage',
  default: 1,
});

export { showRecruitPostAtom, showRecruitModalPageAtom };
