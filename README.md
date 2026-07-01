# team-tontoname

Progateハッカソン 2026年7月 チーム「とんとん飴」のリポジトリです。

## ドキュメント

| ファイル | 内容 |
| :--- | :--- |
| [docs/PROJECT.md](docs/PROJECT.md) | プロジェクト概要（あずかり旅） |
| [docs/hackathon-information.md](docs/hackathon-information.md) | ハッカソンのルール・スケジュール・審査基準 |
| [docs/pre-hackathon-todo.md](docs/pre-hackathon-todo.md) | ハッカソン当日までのTODO |
| [docs/tech-stack.md](docs/tech-stack.md) | 技術スタック・画面構成・機能一覧（検討中） |
| [docs/development-guidelines.md](docs/development-guidelines.md) | Git運用・コミット規約・PRプロセス |

---

## 環境構築（フロントエンド）

### 必要なもの
- Node.js 18以上
- Expo Go アプリ（iOS/Android）→ **SDK 54対応版が必要**

### セットアップ

```bash
cd app
npm install --legacy-peer-deps
```

### 起動

```bash
npx expo start --host lan
```

QRコードをExpo Goでスキャンして確認。

### ⚠️ 注意：Expo GoのSDKバージョンについて

Expo GoはApp Storeのバージョンに応じてサポートするSDKが異なります。  
このプロジェクトは **SDK 54** を使用しています。

| Expo Go の状態 | 対処方法 |
| :--- | :--- |
| SDK 54対応版（最新） | そのままOK |
| 「Project is incompatible」エラーが出る | Expo GoをApp Storeで更新する |
| App Storeに更新がない | `npx expo start --host lan` のターミナルにサポートSDKバージョンが表示されるので、`app/package.json` の `expo` バージョンをそれに合わせる |

---

## 📋 TODO（次回ミーティング議題）

> 以下をチームで話し合い、`docs/PROJECT.md` に反映する。

- [ ] **使う技術** — フロント・バック・インフラ・AI/API など技術スタックの決定
- [ ] **課題のコンセプト** — 誰の・どんな課題を・どう解決するかの言語化
- [ ] **実装する機能** — MVPとして実装する機能の一覧と優先順位
- [ ] **実装するページ** — 画面構成・ページ一覧の整理
