const express = require("express");
const customerRoute = require("./routes/customer");
const productRoute = require("./routes/product");
const app = express();
const port = 3000;

app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

// 에러 처리 핸들러 미들웨어 함수
app.use(function (err, req, res, next) {
  res.status(500).json({ statusCode: res.statusCode, errMessage: err.message }); // 상태코드 500, 에리 메세지 전달
});

// 3000번 포트로 웹서버 실행
app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
});

app.get("/error", function (req, res, next) {
  next(new Error("에러 발생")); // next() 함수를 사용해서 에러 처리 핸들러로 에러 전달
});
app.use("/customer", customerRoute); // customer 라우트를 추가하고 기본 경오로 /customer 사용
app.use("/product", productRoute); // product 라우트를 추가하고 기본 경오로 /product 사용
