// import { Sequelize } from "sequelize";
import { TeamEvaluate } from "../db/models";
import { sequelize } from "../db/index";
import { QueryTypes } from "sequelize";
class TeamEvaluateService {
  constructor(model) {
    this.TeamEvaluate = model;
  }
  async addEvaluate(evaluate) {
    const evaluates = await TeamEvaluate.create(evaluate);

    return evaluates;
  }
  async getMyShortEvaluate(userId) {
    const query = `select * from TeamEvaluates A join Users B on A.evaluatorId = B.userId where evaluateTargetId = ${userId}`;
    const myShortEvaluate = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return myShortEvaluate;
  }
}

const teamEvaluateService = new TeamEvaluateService(TeamEvaluate);

export { teamEvaluateService };
