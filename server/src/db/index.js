"use strict";
import Sequelize from "sequelize";
import {
  User,
  MatchingPosts,
  MatchingSituation,
  CafeInformation,
  OperationInformation,
  MatchingLog,
  ThemeImgAdress,
  ProfileImgAdress,
  TeamEvaluate,
} from "./models";

const env = process.env.NODE_ENV || "development"; //개발용 환경 설정 배포 시 production으로 바꾸면 됨
const config = require("../config/config.js")[env]; //Sequelize 설정 파일
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize; //db객체에 sequelize 인스턴스 넣기
db.Sequelize = Sequelize; //db객체에 Sequelize 패키지 넣기

db.User = User;
db.MatchingPosts = MatchingPosts;
db.MatchingSituation = MatchingSituation;
db.CafeInformation = CafeInformation;
db.OperationInformation = OperationInformation;
db.MatchingLog = MatchingLog;
db.ThemeImgAdress = ThemeImgAdress;
db.ProfileImgAdress = ProfileImgAdress;
db.TeamEvaluate = TeamEvaluate;

User.init(sequelize);
MatchingPosts.init(sequelize);
MatchingSituation.init(sequelize);
CafeInformation.init(sequelize);
OperationInformation.init(sequelize);
MatchingLog.init(sequelize);
ThemeImgAdress.init(sequelize);
ProfileImgAdress.init(sequelize);
TeamEvaluate.init(sequelize);

//관계
CafeInformation.associate(db);
OperationInformation.associate(db);
MatchingPosts.associate(db);
MatchingSituation.associate(db);
TeamEvaluate.associate(db);
User.associate(db);
export { db, sequelize };
