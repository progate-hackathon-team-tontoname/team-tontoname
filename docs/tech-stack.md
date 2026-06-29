# 技術スタック

> [!NOTE]
> バックエンドは **Express（TypeScript）+ PostgreSQL** に決定しました。その他の項目は引き続き検討中です。

## フレームワーク・ライブラリ

| レイヤー | 採用技術 | 理由 |
| :--- | :--- | :--- |
| **アプリ基盤** | [Expo](https://expo.dev/) (React Native) | セットアップが速く、ハッカソンに最適。iOS/Android 両対応 |
| **ナビゲーション** | [Expo Router](https://expo.github.io/router/) | ファイルベースルーティングで直感的に管理できる |
| **地図** | [react-native-maps](https://github.com/react-native-maps/react-native-maps) + Google Maps API | GPSマーカー・移動ルートの表示 |
| **バックエンド** | [Express](https://expressjs.com/) (TypeScript) | React Native と言語を統一（TypeScript）。シンプルで学習コストが低い |
| **DB** | [PostgreSQL](https://www.postgresql.org/) | 信頼性の高いRDB。Express と同じ Railway にデプロイして一元管理 |
| **AI** | [Gemini API](https://ai.google.dev/) | キャラクターの「感想」テキスト・お土産コメントの生成 |
| **プッシュ通知** | [Expo Notifications](https://docs.expo.dev/push-notifications/overview/) | 「〇〇に着いたよ！」通知をゲストへ送信 |

---

## 画面構成

```
/ (ホーム)
  ├── /check-in     チェックイン（キャラクター名前・見た目の設定）
  ├── /map          荷物キャラのGPS地図ビュー（メイン画面）
  ├── /timeline     訪れたスポットの写真＋感想タイムライン
  └── /souvenir     お土産（シール・絵葉書）ギャラリー
```

---

## 機能一覧

### MVP（ハッカソン2日間で必ず実装する）

| 機能 | 概要 |
| :--- | :--- |
| **キャラクター移動** | Express サーバーが GPS 座標を生成 → PostgreSQL に保存 |
| **地図更新** | アプリが定期的に API をポーリング → `react-native-maps` のマーカーを更新 |
| **感想タイムライン** | Express サーバーが Gemini API を呼び出し、感想テキストを生成して PostgreSQL に保存 |

### 余裕があれば実装

| 機能 | 概要 |
| :--- | :--- |
| **スポット写真の表示** | AI が生成・または Unsplash API から取得した写真をタイムラインに表示 |
| **プッシュ通知** | 新スポット到着時にゲストへ通知 |
| **お土産ギャラリー** | チェックアウト前にキャラクターが選んだシール・絵葉書を表示 |
| **キャラクター設定** | チェックイン時に名前・見た目（アイコン）をカスタマイズ |

---

## システム構成図

```
[Expo アプリ（ゲスト）]
        │
        │ REST API リクエスト（ポーリング）
        ▼
[Express サーバー（TypeScript）]  ── Railway にデプロイ
        │                    │
        │ SQL クエリ          │ Gemini API 呼び出し
        ▼                    ▼
[PostgreSQL]           [Gemini API]
（同じ Railway 上）
```

---

## 未決定事項

> [!IMPORTANT]
> 以下はチームで確認・決定が必要な項目です。

- [ ] Google Maps API キーの取得担当者
- [ ] Gemini API キーの取得担当者
- [ ] Railway プロジェクトの作成担当者（Express + PostgreSQL をデプロイ）
- [ ] 地図更新のポーリング間隔（何秒ごとに叩くか）
- [ ] AIエージェントのGPS座標生成ロジック（ランダム？実際の地図API？）
- [ ] キャラクターのビジュアル（イラスト素材の用意）
