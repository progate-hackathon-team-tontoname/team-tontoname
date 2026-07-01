# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「あずかり旅」— Progateハッカソン（2026年7月4〜5日）のチーム「とんとん飴」のプロジェクト。ホテルに預けた荷物を旅するキャラクターとして擬人化し、AIエージェントがそのキャラクターを自律的に動かす。ゲストはスマホアプリでキャラクターのGPS移動・観光スポットの写真・AI生成の「感想」をリアルタイムで受け取れる。

## アーキテクチャ

```
[Expo (React Native) アプリ]   ← ゲスト向けモバイルUI
        │ REST ポーリング
        ▼
[Express (TypeScript) サーバー]  — Railway にデプロイ
        │ SQL クエリ              │ Gemini API 呼び出し
        ▼                         ▼
[PostgreSQL]               [Gemini API]  ← 感想テキスト生成
（同じ Railway プロジェクト）
```

**フロントエンド** — Expo + Expo Router（ファイルベースルーティング）、`react-native-maps` + Google Maps API、Expo Notifications でプッシュ通知。

**バックエンド** — Express（TypeScript）+ PostgreSQL を Railway で運用。サーバーが GPS 座標を生成して PostgreSQL に保存し、Gemini API で感想テキストを生成。アプリがポーリングする REST API を提供する。

## 画面構成（Expo Router）

| ルート | 役割 |
| :--- | :--- |
| `/check-in` | チェックイン時のキャラクター名・外見設定 |
| `/map` | キャラクターのリアルタイム GPS 地図ビュー |
| `/timeline` | 訪れたスポットの写真＋AI感想のタイムライン |
| `/souvenir` | チェックアウト時に解放されるシール・絵葉書ギャラリー |

## MVP スコープ

- キャラクター移動：サーバーが GPS 座標を生成 → PostgreSQL に保存
- 地図更新：アプリが API をポーリング → `react-native-maps` のマーカーを更新
- 感想タイムライン：サーバーが Gemini API を呼び出しテキストを生成 → アプリで表示

## 開発コマンド

> Expo・Express の雛形がコミットされた後に確定する。以下は採用技術から想定されるコマンド。

**フロントエンド（Expo）**
```bash
cd frontend
npx expo start           # 開発サーバー起動（QRコードまたは i/a でシミュレーター）
npx expo start --ios
npx expo start --android
```

**バックエンド（Express + TypeScript）**
```bash
cd backend
npm run dev    # ts-node / nodemon で開発サーバー起動
npm run build  # tsc コンパイル
npm start      # コンパイル済みを実行
npm test       # テスト実行
```

**データベース**
```bash
psql $DATABASE_URL  # Railway の PostgreSQL に接続（接続情報は Railway ダッシュボードから取得）
```

## Git 運用ルール

- `main` ブランチへの直接 push は**禁止**。必ず PR を経由してマージする。
- ブランチ命名：`feat/xxx`、`fix/xxx`、`docs/xxx`、`refactor/xxx`

**コミットメッセージ形式：**
```
<type>(<scope>): <subject>

Co-Authored-By: Codex <noreply@anthropic.com>
```

type の種類：`feat`、`fix`、`docs`、`refactor`、`test`、`chore`

**PR テンプレート：**
```markdown
## 概要
[変更内容の1行サマリー]

## 変更内容
- [変更点]

## テスト
- [ ] ユニットテスト追加
- [ ] ローカルで動作確認
```

## 外部 API

- **Google Maps API** — `react-native-maps` の地図タイルと GPS 表示
- **Gemini API** — キャラクターの感想テキスト・お土産コメントの生成
- **Expo Notifications** — キャラクターが新スポットに到着した際のプッシュ通知

API キーはリポジトリ外で管理する（Railway 環境変数 / Expo Secrets）。コードにコミットしない。

## デプロイ

バックエンド（Express + PostgreSQL）は Railway にデプロイ。`main` へのプッシュで Railway の GitHub 連携による自動デプロイを目指す。
