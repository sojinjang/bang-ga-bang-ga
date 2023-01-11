const { Sequelize, DataTypes } = require("sequelize");

class TeamEvaluate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        teamEvaluateId: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        evaluatorId: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        evaluateTargetId: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        shortEvaluate: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        mannerEvaluate: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        escapeEvaluate: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "TeamEvaluates",
        modelName: "TeamEvaluate",
        paranoid: true,
      }
    );
  }
  static associate(db) {
    db.TeamEvaluate.belongsTo(db.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}
export { TeamEvaluate };
