// const models = require("./src/db/index");
import { db } from "./src/db/index";
import { app } from "./src/app";

// sync({force:true})로 작성하면 기존 테이블 삭제 후 새로 생성
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
    app.listen(process.env.PORT);
    const PORT = process.env.PORT || 3008;
    console.log(`서버 정상 실행 http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err); 
  });
