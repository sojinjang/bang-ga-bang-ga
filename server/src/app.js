import express from "express";
const ejs = require("ejs");
import { errorHandler } from "./middlewares";
import {
  usersRouter,
  metchingPostRouter,
  cafeInformationRouter,
  teamEvaluateRouter,
  matchingSituationRouter,
  multerRouter,
} from "./routers";
import { sequelize } from "./db";
import cors from "cors";

const app = express();
sequelize.sync();
/* GET home page. */
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async function (req, res, next) {
  res.send("hello, wolrd!");
});
// CORS 에러 방지
app.use(
  cors({
    origin: true, // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// html, css, js 라우팅
// app.use(viewsRouter);

app.use("/api/user", usersRouter);
app.use("/api/matching-posts", metchingPostRouter);
app.use("/api/cafe-infos", cafeInformationRouter);
app.use("/api/evaluate", teamEvaluateRouter);
app.use("/api/matching-situation", matchingSituationRouter);
app.use("/api/", multerRouter);

app.use(errorHandler);

app.use("/uploads", express.static("uploads"));
export { app };
