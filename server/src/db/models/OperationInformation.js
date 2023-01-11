import { Sequelize, DataTypes } from "sequelize";

//카페 운영정보테이블
class OperationInformation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        operationInformationId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          comment: "운영정보ID",
        },
        time: {
          type: DataTypes.STRING(20),
          defaultValue: 0,
          commet: "시간",
        },
        review: {
          type: DataTypes.STRING(20),
          comment: "리뷰",
        },
        activity: {
          type: DataTypes.STRING(20),
          comment: "활동성",
        },
        category: {
          type: DataTypes.STRING(5),
          comment: "유형 자물쇠 형식인지",
        },
        theme: {
          type: DataTypes.STRING(100),
          comment: "테마",
        },
        recommendedNum: {
          type: DataTypes.STRING(20),
          comment: "추천인원수",
        },
        genre: {
          type: DataTypes.STRING(10),
          comment: "테마 장르",
        },
        difficulty: {
          type: DataTypes.STRING(10),
          comment: "테마 난이도",
        },
      },
      {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "OperationInformation", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
  //관계 설정
  // 모집글>카페정보<카페운영정보
  static associate(db) {
    db.OperationInformation.belongsTo(db.CafeInformation, {
      foreignKey: "cafeId",
      sourceKey: "cafeId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export { OperationInformation };
