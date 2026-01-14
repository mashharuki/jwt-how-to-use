import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';

type Food = {
  id: number;
  description: string;
};

// ダミーの食品データ
const foods: Food[] = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];

// JWT secret key(ここでは学習目的でダミー値を設定)
const jwtSecret = 'secret123';

// Expressアプリケーションの作成
const app = express();

// CORSを有効化
app.use(cors());

// JWT認証ミドルウェアの設定
// この設定により、すべてのエンドポイントでJWT認証が必要になる
// JWT認証の流れ
// ヘッダーからトークンを取り出し毎回検証を行う
app.use(
  expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({
    path: ['/jwt']
  })
);

/**
 * JWTトークンを発行するエンドポイント
 * GET /jwt
 */
app.get('/jwt', (_req, res) => {
  // ダミーのユーザー情報でJWTトークンを発行
  res.json({
    token: jwt.sign({ user: 'johndoe' }, jwtSecret)
  });
});

/**
 * 食品データを取得するエンドポイント
 * データの取得にはJWT認証が必要
 * GET /foods
 */
app.get('/foods', (_req, res) => {
  res.json(foods);
});

app.use((err: { name?: string }, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err?.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid or missing JWT token' });
    return;
  }
  next(err);
});

app.listen(3001);
console.log('App running on localhost:3001');
