import { Sequelize, DataTypes } from "sequelize";

class ProfileImgAdress extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        profileImgAdress_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: "프로필어드레스ID",
      },
      profileImgAdress: {
        type: DataTypes.STRING,
        commet: "프로필사진주소",
      },

    },
    {
        charset: "utf8mb4", // 한국어+이모티콘 설정!
        sequelize,
        collate: "utf8mb4_general_ci", // 한국어 설정
        tableName: "ProfileImgAdress", // 테이블 이름
        timestamps: true, // createAt & updateAt 활성화
        paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
      }
    );
  }
 // static associate() {}
}


export {ProfileImgAdress};