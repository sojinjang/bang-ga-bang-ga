import { Router } from "express";
import { loginRequired } from "../middlewares";
import {
  metchingPostService,
  mapPostService,
  postingService,
  matchingSituationService,
} from "../services";

const metchingPostRouter = Router();

//지도로 보기에서 지역명(홍대)으로 get요청 api
metchingPostRouter.get("/map/:locationDetail", async (req, res, next) => {
  const locationDetail = req.params.locationDetail;

  try {
    const locationfilterPosts = await mapPostService.getLocationfilterPosts(
      locationDetail
    );

    res.status(200).json(locationfilterPosts);
  } catch (error) {
    next(error);
  }
});

//2. 마커클릭했을 떄 옆에 해당 카페에 등록되어있는 모집공고 보여주기 API
metchingPostRouter.get("/map/cafePost/:cafeId", async (req, res, next) => {
  const cafeId = req.params.cafeId;
  try {
    const [recruitingInfo, cafeInfo] = await mapPostService.getCafePosts(
      cafeId
    );

    res
      .status(200)
      .json({ cafeInfo: cafeInfo[0], recruitingInfo: recruitingInfo });
  } catch (error) {
    next(error);
  }
});

//게시글 전체 조회 (게시글 6개 페이지네이션) ->(페이징x 지역별필터링으로 수정)
metchingPostRouter.get("/:local_detail", async (req, res, next) => {
  let localDetail = req.params.local_detail;
  try {
    const posts = await metchingPostService.getLocalDetailPosts(localDetail);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//게시글 전체 조회
metchingPostRouter.get("/", async (req, res, next) => {
  try {
    const posts = await metchingPostService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//본인 게시글만 조회
metchingPostRouter.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userPosts = await metchingPostService.getUserPosts(userId);
    res.status(200).json(userPosts);
  } catch (error) {
    next(error);
  }
});

//클릭한 게시글 조회
metchingPostRouter.get(
  "/read-post/:MatchingPostsId",
  async (req, res, next) => {
    try {
      const postId = req.params.MatchingPostsId;
      const clickPost = await metchingPostService.getClickPost(postId);

      res.status(200).json(clickPost);
    } catch (error) {}
  }
);

//모집 게시글 쓰기
metchingPostRouter.post("/", async (req, res, next) => {
  const postContent = req.body;

  try {
    const post = await metchingPostService.postPost(postContent);
    const userId = post.userId;
    const matchingPostsId = post.matchingPostsId;
    const participatnsInfo = { userId, matchingPostsId };
    const users = await matchingSituationService.addParticipants(
      participatnsInfo
    );

    res.status(200).json({ message: "게시글 작성 성공" });
  } catch (error) {
    next(error);
  }
});

//게시글 작성 중 지역 카페 List 조회api
metchingPostRouter.get("/cafe-list/:locationDetail", async (req, res, next) => {
  const locationDetail = req.params.locationDetail;

  try {
    const cafeList = await postingService.getCafeList(locationDetail);
    res.status(200).json(cafeList);
  } catch (error) {
    next(error);
  }
});
//게시글 작성 중 지역 카페 테마정보 조회api
metchingPostRouter.get("/cafe-infomation/:cafeId", async (req, res, next) => {
  const cafeId = req.params.cafeId;

  try {
    const cafeInformation = await postingService.getCafeThemeInfomation(cafeId);
    res.status(200).json(cafeInformation);
  } catch (error) {
    next(error);
  }
});
//게시글 수정하기
metchingPostRouter.patch("/:matching_post_id", async (req, res, next) => {
  try {
    const postid = req.params.matching_post_id;
    const patchPost = req.body;

    const updatePost = await metchingPostService.updatePost(postid, patchPost);

    res.status(200).json({ message: "게시글 수정 성공" });
  } catch (error) {
    next(error);
  }
});

//게시글 삭제하기
metchingPostRouter.delete("/:matching_post_id", async (req, res, next) => {
  try {
    const postId = req.params.matching_post_id;
    await metchingPostService.deletePost(postId);
    res.status(200).json({ message: "게시글 삭제 성공" });
  } catch (error) {
    next(error);
  }
});

export { metchingPostRouter };
