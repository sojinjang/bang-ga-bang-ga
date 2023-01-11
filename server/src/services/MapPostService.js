import { or, Sequelize } from "sequelize";
import { MatchingPosts, CafeInformation } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class MapPostService {
  constructor(model) {
    this.MapPostService = model;
  }

  //지도로 보기에서 지역명(홍대)으로 get요청 api
  async getLocationfilterPosts(locationDetail) {
    //카페정보테이블 ,모집글 조회해서
    //조건1 필터링하기
    //조건2 필터링하기


    const query = ` SELECT  count(P.matchingPostsId) as recruitingNum, C.cafeId, C.cafeName, C.locationDetail ,C.lat, C.lng FROM CafeInformation C
    JOIN  MatchingPost P
      ON C.cafeId = P.cafeId
      where C.locationDetail = "${locationDetail}" and P.matchingTime > date_format(curdate(),'%Y%M%H%i' )and  matchStatus = 0
        group by C.cafeId
      having count(C.cafeId);`;
    const matchingPosts = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    if (matchingPosts[0] == undefined) {
      return [];
    } else if (
      matchingPosts[0].recruitingNum == 0 ||
      matchingPosts[0].recruitingNum == null
    ) {
      return [];
    }

    return matchingPosts;
  }

  //2. 마커클릭했을 떄 옆에 해당 카페에 등록되어있는 모집공고 보여주기 API
  async getCafePosts(cafeId) {
    const query1 = ` SELECT count(MS.matchingPostsId) as matchingSituationUserSum, P.matchingPostsId, C.cafeName, P.title, P.peopleNum ,P.themeName ,P.matchStatus ,P.matchingLocation, P.matchingTime, P.view, P.createdAt, P.updatedAt, P.deletedAt, P.userId
     FROM MatchingPost P 
     join MatchingSituation MS  on MS.matchingPostsId  = P.matchingPostsId 
     join CafeInformation C ON C.cafeId = P.cafeId
     where  P.cafeId = ${cafeId} and P.matchingTime > date_format(curdate(),'%Y%M%H%i' )and matchStatus = 0 and MS.deletedAt is null;`;

    const query2 = ` SELECT cafeId, address, cafeName FROM  CafeInformation
    where  cafeId = ${cafeId} ;`;

    const recruitingInfo = await sequelize.query(query1, {
      type: QueryTypes.SELECT,
    });
    const cafeInfo = await sequelize.query(query2, {
      type: QueryTypes.SELECT,
    });

    return [recruitingInfo, cafeInfo];
  }
}

const mapPostService = new MapPostService(MatchingPosts, CafeInformation);

export { mapPostService };
