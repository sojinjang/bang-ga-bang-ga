import { Sequelize } from "sequelize";
import { CafeInformation } from "../db/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../db/index";
// const { sequelize } = require("../db/index");

class CafeInformationService {
  constructor(model) {
    this.CafeInformation = model;
  }
  async getCafesAll() {
    const query = `select * from CafeInformation;`;

    const cafeDatas = await sequelize.query(query, { type: QueryTypes.SELECT });

    return cafeDatas;
  }

  async getCafes() {
    const cafeDatas = await CafeInformation.findAll();
    return cafeDatas;
  }
  async getCafesDetail(location) {
    const query = `select * from CafeInformation
    where locationDetail = "${location}";`;

    const cafeDatas = await sequelize.query(query, { type: QueryTypes.SELECT });

    return cafeDatas;
  }
}

const cafeInformationService = new CafeInformationService(CafeInformation);

export { cafeInformationService };
