import { Router } from "express";
import { MatchingSituation } from "../db/models";
import { Users } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
class MatchingSituationService {
  constructor(model) {
    this.MatchingSituation = model;
  }
  //게임 참가
  async addParticipants(participantsInfo) {
    const { userId, matchingPostsId } = participantsInfo;
    const insertData = { userId, matchingPostsId };
    const user = await MatchingSituation.findOne({
      where: {
        userId: userId,
        matchingPostsId: matchingPostsId,
      },
    });
    if (user) {
      throw new Error("이미 참가신청이 되었습니다.");
    }
    const participants = await MatchingSituation.create(insertData);
    return participants;
  }
  //게임 참가 취소
  async deleteParticipants(participantsInfo) {
    const { userId, matchingPostsId } = participantsInfo;
    const participants = await MatchingSituation.destroy({
      where: { userId: userId, matchingPostsId: matchingPostsId },
    });
    return participants;
  }
  //내가 참여한 모집글 정보 조회(모집 완료 된 것))
  async getMyFinishedPostsInfo(userId) {
    const query = `select * from MatchingSituation A join MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId join Users C on A.userId = C.userId
      where A.userId = ${userId} and B.matchStatus = 1 and A.deletedAt is NULL`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //내가 참여한 모집글 정보 조회(모집 중인 것)
  async getMyNotFinishedPostsInfo(userId) {
    const query = `select * from MatchingSituation A join MatchingPost B
      on A.matchingPostsId = B.matchingPostsId join Users C on A.userId = C.userId
      where A.userId = ${userId} and B.matchStatus = 0 and A.deletedAt is NULL`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //각 모집글 참여자 정보
  async getPostInfo(matchingPostsId) {
    const query = `select * from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId join Users C on A.userId = C.userId
      where A.matchingPostsId = ${matchingPostsId} and A.deletedAt is NULL`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return participants;
  }
  //나의 매칭 횟수()
  async getMyPostCount(userId) {
    const query = `select count(A.userId) as myMatchingCount from MatchingSituation A JOIN MatchingPost B
      on A.matchingPostsId = B.matchingPostsId
      where A.userId = ${userId} and B.matchStatus = 1 and A.deletedAt is NULL`; //A.isFinish가 1이 되어야 매칭완료 처리

    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return participants;
  }
  //내가 참여한 게임 팀원 조회(본인을 제외하고 검색해야함)
  async getMyTeamInfo(participantsInfo) {
    const { userId, matchingPostsId } = participantsInfo;
    const query = `select * from MatchingSituation A join MatchingPost B
      on A.matchingPostsId =  B.matchingPostsId join Users C on A.userId = C.userId
      where A.userId not in (${userId}) and A.matchingPostsId = ${matchingPostsId}
      and A.deletedAt is NULL`; //A.isFinish가 1이 되어야 매칭완료 처리
    const participants = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return participants;
  }
  //팀원 평가 완료 시 isEvaluate 상태 변경
  async updateIsEvaluate(updateInfo) {
    const { userId, matchingPostsId } = updateInfo;
    const query = `update MatchingSituation set IsEvaluate = 1
    where userId=${userId} and matchingPostsId=${matchingPostsId}`;
    const participants = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
    });
    return participants;
  }
}

const matchingSituationService = new MatchingSituationService(
  MatchingSituation
);

export { matchingSituationService };
