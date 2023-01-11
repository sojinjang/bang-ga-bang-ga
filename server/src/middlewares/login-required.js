import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1];
  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    res.status(401).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }

  try {
    const accessKey = process.env.ACCESS_SECRET || "access-key";

    const jwtDecoded = jwt.verify(userToken, accessKey);



    const userId = jwtDecoded.userId;


    req.currentUserId = userId;

    next();
  } catch (err) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    // 403 코드로 JSON 형태로 프론트에 전달함.
    res.status(403).json({
      result: "forbidden-approach",
      reason: "토큰 값에 문제가 발생하였습니다.",
    });

    return;
  }
}

export { loginRequired };
