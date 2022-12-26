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
  default: 0,
});

const maxPageNumAtom = atom({
  key: 'maxPageNum',
  default: 1,
});

const recruitPostDataAtom = atom({
  key: 'recruitPostData',
  default: {
    title: '',
    peopleNum: 2,
    themeName: '',
    matchStatus: false,
    matchingTime: 0,
    matchingLocation: '',
    cafeId: 0,
    userId: 1,
  },
});

const currentRegionAtom = atom({
  key: 'currentRegion',
  default: '전체',
});

export {
  showRecruitPostAtom,
  showRecruitModalPageAtom,
  screenLevelAtom,
  showUserProfileModalAtom,
  currentPageAtom,
  maxPageNumAtom,
  recruitPostDataAtom,
  currentRegionAtom,
};
