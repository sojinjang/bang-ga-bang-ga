import { Sequelize, DataTypes } from "sequelize";

class MatchingSituation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        matchingSituationId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "모집현황ID",
        },
        isEvaluate: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "평가 완료 여부",
        },
      },
      {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "MatchingSituation", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true,
      }
    );
  }
  static associate(db) {
    db.MatchingSituation.belongsTo(db.MatchingPosts, {
      foreignKey: "matchingPostsId",
      sourceKey: "matchingPostsId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.MatchingSituation.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export { MatchingSituation };
