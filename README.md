# React Cookie内でJWTを取り扱うサンプルアプリ

## 概要

本プロジェクトは、ReactアプリケーションでJWT（JSON Web Token）を使用した認証の実装例を示すサンプルアプリケーションです。

### 主な特徴
- **フロントエンド**: React + TypeScript
- **バックエンド**: Express.js（JWT発行・検証サーバー）
- **認証方式**: JWT（HS256アルゴリズム）
- **ストレージ**: LocalStorage（JWTトークンの保存）
- **通信**: Axios（HTTPクライアント）

### 技術スタック
- React 19.2.3
- TypeScript 5.9.3
- Express.js 4.21.2
- jsonwebtoken 9.0.2
- express-jwt 8.5.1
- axios 1.7.9

## システム構成図

```mermaid
graph TB
    subgraph Browser["ブラウザ"]
        subgraph ReactApp["React Application (Port 3000)"]
            Button1["JWT取得ボタン"]
            Button2["食品データ取得ボタン"]
            Storage["LocalStorage<br/>(JWTトークン保存)"]
            Interceptor["Axios Interceptor<br/>(認証ヘッダー自動付与)"]
        end
    end
    
    subgraph Server["Express Server (Port 3001)"]
        subgraph AuthServer["認証サーバー"]
            API1["GET /jwt<br/>JWTトークン発行"]
            API2["GET /foods<br/>食品データ取得(JWT認証必須)"]
            MW1["ミドルウェア:<br/>- CORS<br/>- express-jwt(JWT検証)"]
        end
    end
    
    ReactApp <-->|HTTP Request/Response| AuthServer
```

## 機能一覧表

| No | 機能名 | エンドポイント | メソッド | 認証 | 説明 |
|----|--------|--------------|---------|------|------|
| 1 | JWTトークン取得 | `/jwt` | GET | 不要 | ユーザー情報を基にJWTトークンを発行 |
| 2 | 食品データ取得 | `/foods` | GET | 必要 | JWT認証後、食品リストを返却 |

### フロントエンド機能
| 機能 | 説明 |
|------|------|
| JWT取得 | サーバーからJWTトークンを取得し、LocalStorageに保存 |
| 食品データ取得 | JWTトークンを使用して保護されたAPIから食品データを取得 |
| Axios Interceptor | 全てのAPIリクエストに自動的にJWTトークンをAuthorizationヘッダーに付与 |
| エラーハンドリング | 認証エラーやネットワークエラーを表示 |

## 機能毎の処理シーケンス図

### 1. JWTトークン取得フロー

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant React as React App
    participant Server as Express Server
    
    User->>React: [Get JWT]クリック
    React->>Server: GET /jwt
    Note over Server: JWT生成<br/>(HS256, secret123)
    Server-->>React: { token: "eyJ..." }
    Note over React: LocalStorage.setItem<br/>('token', token)
    React-->>User: JWT表示
```

### 2. 保護されたリソース取得フロー

```mermaid
sequenceDiagram
    actor User as ユーザー
    participant React as React App
    participant Server as Express Server
    
    User->>React: [Get Foods]クリック
    Note over React: LocalStorage.getItem<br/>('token')
    Note over React: Axios Interceptor<br/>(Authorization header追加)
    React->>Server: GET /foods<br/>Authorization: Bearer eyJ...
    Note over Server: JWT検証<br/>(express-jwt)
    
    alt 成功時
        Server-->>React: [{id:1, description:...}]
        React-->>User: 食品リスト表示
    else 失敗時
        Server-->>React: 401 Unauthorized
        React-->>User: エラーメッセージ
    end
```

## 動かし方

### インストール

```bash
yarn
```

### ビルド

```bash
yarn build
```

### フロントエンドの起動

```bash
yarn start
```

### JWT発行用のサーバー起動

```bash
yarn server
```

