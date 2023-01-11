import { Sequelize, DataTypes } from "sequelize";

class MatchingLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      matchingLogId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: "매칭테이블ID",
      },
      isEvaluate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        commet: "팀원평가여부",
      },
    },
    
    {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "MatchingLog", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
 // static associate() {}
}



export {MatchingLog}; 