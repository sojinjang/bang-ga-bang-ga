import { atom } from 'recoil';

const showRecruitPostAtom = atom({
  key: 'showRecruitPost',
  default: false,
});

const showRecruitModalPageAtom = atom({
  key: 'showRecruitModalPage',
  default: 1,
});

const screenLevelAtom = atom({
  key: 'screenLevel',
  default: 0,
});

const showUserProfileModalAtom = atom({
  key: 'showUserProfileModal',
  default: false,
});

const currentPageAtom = atom({
  key: 'currentPage',
  default: 1,
});

export { showRecruitPostAtom, showRecruitModalPageAtom, screenLevelAtom, showUserProfileModalAtom, currentPageAtom };
