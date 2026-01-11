import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// API base URL
const apiUrl = 'http://localhost:3001';

/**
 * Axios request interceptor to add JWT token to headers
 * JWTをヘッダーに追加するためのAxiosリクエストインターセプター
 */
axios.interceptors.request.use(
  config => {
    // オリジンを取得
    const { origin } = new URL(config.url as string);
    const allowedOrigins = [apiUrl];
    // ローカルストレージからトークンを取得
    const token = localStorage.getItem('token');
    // トークンが存在し、オリジンが許可されている場合、ヘッダーに追加
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

type Food = {
  id: number
  description: string
}

/**
 * App コンポーネント
 * @returns 
 */
function App() {
  // ローカルストレージから保存されたJWTを取得
  const storedJwt = localStorage.getItem('token');
  // ステート変数
  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /**
   * JWTを取得するメソッド
   */
  const getJwt = async () => {
    // /jwt APIメソッドを呼び出し
    const { data } = await axios.get(`${apiUrl}/jwt`);
    // ローカルストレージにJWTをセットする
    localStorage.setItem('token', data.token);
    setJwt(data.token);
  };

  /**
   * 食べ物のデータを首都するメソッド
   */
  const getFoods = async () => {
    try {
      // /foods APIメソッドを呼び出し
      const { data } = await axios.get(`${apiUrl}/foods`);
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setFetchError(message);
    }
  };

  return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>
          Get Foods
        </button>
        <ul>
          {foods.map((food) => (
            <li key={food.id}>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
    </>
  );
}
export default App;