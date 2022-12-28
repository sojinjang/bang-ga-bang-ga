import { atom } from 'recoil';

const showRecruitPostAtom = atom({
  key: 'showRecruitPost',
  default: false,
});

const showRecruitModalPageAtom = atom({
  key: 'showRecruitModalPage',
  default: 1,
});

const showUserProfileModalAtom = atom({
  key: 'showUserProfileModal',
  default: false,
});

const currentPageAtom = atom({
  key: 'currentPage',
  default: 0,
});

const currentPostIdAtom = atom({
  key: 'currentPostId',
  default: 0,
});

const currentUserIndexAtom = atom({
  key: 'currentUserIndex',
  default: 0,
});

const currentUserDataAtom = atom({
  key: 'currentUserData',
  default: {},
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
    userId: 0,
  },
});

const currentRegionAtom = atom({
  key: 'currentRegion',
  default: '전체',
});

export {
  showRecruitPostAtom,
  showRecruitModalPageAtom,
  showUserProfileModalAtom,
  currentPageAtom,
  maxPageNumAtom,
  recruitPostDataAtom,
  currentRegionAtom,
  currentPostIdAtom,
  currentUserIndexAtom,
  currentUserDataAtom,
};
