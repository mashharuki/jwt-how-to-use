const express = require('express');
const { expressjwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');

// Expressアプリケーションの作成
const app = express();

// CORSを有効化
app.use(cors());

// JWT認証ミドルウェアの設定
app.use(expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }));

// ダミーの食品データ
const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];

// JWT secret key(ここでは学習目的でダミー値を設定)
const jwtSecret = 'secret123';

/**
 * JWTトークンを発行するエンドポイント
 * GET /jwt
 */
app.get('/jwt', (req, res) => {
  // ダミーのユーザー情報でJWTトークンを発行
  res.json({
    token: jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret)
  });
});

/**
 * 食品データを取得するエンドポイント
 * データの取得にはJWT認証が必要
 * GET /foods
 */
app.get('/foods', (req, res) => {
  res.json(foods);
});

app.listen(3001);
console.log('App running on localhost:3001');