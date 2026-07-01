# 開発ガイドライン

## 1. Git 運用ルール

### ブランチ戦略
基本的に `main` ブランチから作業用ブランチを切り、作業完了後に Pull Request (PR) を経由して `main` へマージします。

```text
main
  └─ feat/headphone-motion              ← 機能開発
  └─ docs/sync-current-implementation   ← ドキュメント整備
  └─ feat/how-chat                      ← 機能開発
  └─ fix/airpods-disconnect             ← バグ修正
  └─ docs/update-spec                   ← 仕様更新
```

#### ブランチ命名規則
作業内容に応じて、以下のプレフィックスを使用してください。
- `feat/xxx` : 新機能開発
- `fix/xxx` : バグ修正
- `docs/xxx` : ドキュメントの作成・更新
- `refactor/xxx` : リファクタリング

#### マージ方針
PR を `main` ブランチへマージする際は、履歴をきれいに保つため原則 **Squash and Merge** を使用してください。

> [!IMPORTANT]
> `main` ブランチへの直接 push は**禁止**です。必ず Pull Request を経由してマージしてください。

---

## 2. コミットメッセージ規約

コミットメッセージは以下のフォーマットに従って記述してください。

```text
<type>(<scope>): <subject>

Co-Authored-By: Codex <noreply@anthropic.com>
```

### Type の一覧と用途

| Type | 用途 |
| :--- | :--- |
| **feat** | 新機能の開発 |
| **fix** | バグ修正 |
| **docs** | ドキュメントの作成・修正 |
| **refactor** | リファクタリング（機能追加やバグ修正を含まないコード変更） |
| **test** | テストの追加・修正 |
| **chore** | ビルドプロセスやツール、ライブラリのメタデータなどの設定変更 |

### コミットメッセージの例

```text
feat(motion): AirPods 頭部モーションの記録を実装

- HeadphoneMotionService を追加
- CMHeadphoneMotionManager で姿勢・加速度を取得
- 未接続時は手動リアクション選択へフォールバック

Co-Authored-By: Codex <noreply@anthropic.com>
```

---

## 3. PR (Pull Request) プロセス

### 作成前チェック
*（未定）*

### PR テンプレート
Pull Request を作成する際は、以下のテンプレートを使用してください。

```markdown
## 概要
[変更内容の1行サマリー]

## 変更内容
- [変更点]

## テスト
- [ ] ユニットテスト追加
- [ ] ローカルで動作確認
```
