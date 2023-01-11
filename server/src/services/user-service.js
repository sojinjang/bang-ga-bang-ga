// import { Sequelize } from "sequelize";
import { User } from "../db/models";
import { sequelize } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  constructor(model) {
    this.User = model;
  }
  //회원가입
  async addUser(user) {
    const { userName, mobileNumber, email, nickName, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = {
      userName,
      mobileNumber,
      email,
      nickName,
      password: hashedPassword,
    };
    const newUser = await User.create(newUserInfo);

    return newUser;
  }
  //회원정보수정
  async updateUser(userInfoRequired, updateData) {
    const { userId } = userInfoRequired;

    let user = await User.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error("가입 내역이 없습니다.");
    }
    // const hashedPassword = user.password;
    // const isPasswordSame = await bcrypt.compare(checkPassword, hashedPassword);

    // if (!isPasswordSame) {
    //   throw new Error("비밀번호가 일치하지 않습니다.");
    // }
    const { password } = updateData;
    if (password) {
      const newHashedPassword = await bcrypt.hash(password, 10);
      updateData.password = newHashedPassword;
    }
    const { escapeScore } = updateData;
    if (escapeScore) {
      user.escapeScore += escapeScore;
    }
    user.save();

    const isBronze = (score) => {
      if (0 <= score && score <= 20) return true;
      return false;
    };
    const isSilver = (score) => {
      if (20 < score && score < 40) return true;
      return false;
    };
    const isGold = (score) => {
      if (39 < score && score < 60) return true;
      return false;
    };
    const isPlatinum = (score) => {
      if (59 < score && score < 80) return true;
      return false;
    };
    const isDiamond = (score) => {
      if (79 < score) return true;
      return false;
    };
    const tierEvaluate = (score) => {
      if (isBronze(score)) return "bronze";
      if (isSilver(score)) return "silver";
      if (isGold(score)) return "gold";
      if (isPlatinum(score)) return "platinum";
      if (isDiamond(score)) return "diamond";
    };
    tierEvaluate(user.escapeScore);
    user.save();
    const userChanged = await User.update(updateData, {
      where: { userId },
    });

    return userChanged;
  }
  async updateMannerScore(userId) {
    const user = await User.findOne({
      where: { userId: userId },
    });
    if (!user) {
      throw new Error("회원 정보가 없습니다.");
    }
    user.mannerScore += 1;
    user.save();
    return user;
  }
  async updateManner(userId) {
    const user = await User.findOne({
      where: { userId: userId },
    });
    user.matchingCount += 1;
    user.save();
    return user;
  }
  async updateScore(updateScore, evaluateTargetId) {
    const { mannerEvaluate, escapeEvaluate } = updateScore;
    const user = await User.findOne({
      where: { userId: evaluateTargetId },
    });
    if (!user) {
      throw new Error("회원 정보가 없습니다.");
    }
    user.escapeScore += escapeEvaluate;
    user.mannerScore += mannerEvaluate;
    user.save();

    const isBronze = (score) => {
      if (0 <= score && score <= 20) return true;
      return false;
    };
    const isSilver = (score) => {
      if (20 < score && score < 40) return true;
      return false;
    };
    const isGold = (score) => {
      if (39 < score && score < 60) return true;
      return false;
    };
    const isPlatinum = (score) => {
      if (59 < score && score < 80) return true;
      return false;
    };
    const isDiamond = (score) => {
      if (79 < score) return true;
      return false;
    };
    const tierEvaluate = (score) => {
      if (isBronze(score)) return (user.tier = "bronze");
      if (isSilver(score)) return (user.tier = "silver");
      if (isGold(score)) return (user.tier = "gold");
      if (isPlatinum(score)) return (user.tier = "platinum");
      if (isDiamond(score)) return (user.tier = "diamond");
    };
    tierEvaluate(user.escapeScore);
    user.save();
    return user;
  }

  //로그인 시 token 전달
  async getUserToken(loginInfo) {
    const { email, password } = loginInfo;
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    const hashedPassword = user.password; // db에 저장되어 있는 암호화된 비밀번호

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    const accessKey = process.env.ACCESS_SECRET || "access-key";

    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      accessKey,
      { expiresIn: "3h" }
    );
    const refreshKey = process.env.REFRESH_SECRET || "refresh-key";
    const refreshToken = jwt.sign(
      { userId: user.userId, role: user.role },
      refreshKey,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  //유저정보 얻기
  async getUserById(userId) {
    const user = await User.findOne({
      where: { userId: userId },
    });
    return user;
  }
  async getUserByEmail(email) {
    const user = await User.findOne({
      // where: { user_idz: id },
      where: { userId: id },
      // attributes: ['user_id'],
    });
    return user;
  }
  async getUserByEmail(email) {
    const user = await User.findOne({
      // where: { user_id: id },
      where: { email: email },
      // attributes: ['user_id'],
    });
    return user;
  }
  async deleteUser(userId) {
    const user = User.destroy({
      where: { userId: userId },
    });
    return user;
  }
  // async updateTempPassword(userInfo) {
  //   const { userId, temporaryPassword } = userInfo;

  //   const user = User.update(
  //     { password: "temporaryPassword" },
  //     { where: { userId: userId } }
  //   );
  // }
}

const userService = new UserService(User);

export { userService };
