const { Sequelize, DataTypes } = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      { 
        userId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: "일반회원",
        },
        userName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        mobileNumber: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        nickName: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        userIntro: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        gender: {
          type: DataTypes.ENUM("남자", "여자"),
          allowNull: true,
        },
        age: {
          type: DataTypes.ENUM("10대", "20대", "30대", "30대 이상"),
          allowNull: true,
        },
        mbti: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        preferenceTheme: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        nonPreferenceTheme: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        preferenceLocation: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
        tier: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "bronze",
        },
        escapeScore: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        matchingCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        mannerScore: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 50,
        },
        profileImg: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users",
        paranoid: true,
      }
    );
  }
 
  
  static associate(db) {
    db.User.hasMany(db.MatchingPosts, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
  static associate(db) {
    db.User.hasMany(db.MatchingSituation, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
  static associate(db) {
    db.User.hasMany(db.TeamEvaluate, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}
export { User };
