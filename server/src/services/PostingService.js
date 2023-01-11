import { Sequelize } from "sequelize";
import { MatchingPosts } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class PostingService {
  constructor(model) {
    this.MatchingPosts = model;
  }
  async getCafeList(locationDetail) {
    const query = ` select cafeId, locationDetail, cafeName  from  CafeInformation
    where locationDetail = "${locationDetail}"; `

    const cafeList = await sequelize.query(query, {type: QueryTypes.SELECT})

    return cafeList;
  }

  async getCafeThemeInfomation(cafeId) {
    const query = ` select operationInformationId, time, review, activity, category, theme, recommendedNum, genre, difficulty from  OperationInformation
    where  cafeId =  ${cafeId}; `

    const cafeInformation = await sequelize.query(query, {type: QueryTypes.SELECT})

    return cafeInformation;
  }
}

const postingService = new PostingService(MatchingPosts);

export { postingService };
