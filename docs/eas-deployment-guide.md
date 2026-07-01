# EAS Build & EAS Update 導入・実機確認手順書 (iOS前提)

本ドキュメントは、チームメンバー全員の iPhone に開発用のテストアプリをインストールし、GitHub へのプッシュ時に自動で最新コードがスマホへ配信（EAS Update）される環境を構築するための手順書です。

---

## 📱 1. メンバー全員の iPhone の UDID（端末識別子）を調べる

iOS の制約上、EAS Build を行う前に、インストールさせたいすべての iPhone の **UDID** を Expo に登録する必要があります。

### パソコンを使わずに iPhone 単体で調べる方法
1. iPhone でブラウザ（Safari）を開き、 **[get.udid.io](https://get.udid.io/)** にアクセスします。
2. **「Tap to find UDID」** ボタンをタップします。
3. 「構成プロファイルのダウンロードを許可しますか？」とダイアログが出るので **「許可」** をタップ。
4. ダウンロード完了後、iPhone の **「設定」アプリ** を開きます。
5. 最上部に表示される **「プロファイルがダウンロードされました」** をタップします。
6. 右上の **「インストール」** をタップし、端末のパスコードを入力してインストールします。
7. ブラウザに戻ると、画面にあなたの iPhone の **UDID**（長い英数字の文字列）が表示されます。これをコピーして、SlackやDiscordで共有・テキストにまとめてください。

---

## 🛠️ 2. コマンドラインでの設定と初期ビルド手順 (EAS Build)

UDID が集まったら、ビルド担当者（例: `@Tomoodi`）がコマンドを実行して、Expo クラウドにデバイスを登録し、アプリをビルドします。

### 1. ログインと初期設定
```bash
# EAS CLI のグローバルインストール
npm install -g eas-cli

# Expo アカウントにログイン
eas login

# app フォルダに移動してプロジェクト登録
cd app
eas project:init
```

### 2. メンバーのデバイス（UDID）登録
```bash
# デバイスの登録コマンドを実行
eas device:create
```
- 実行中に `How would you like to register your devices?` と聞かれるので、 **「Input UDIDs manually」** を選択します。
- メンバー全員の iPhone の「名前（例: Tomo-iPhone）」と「UDID」を順番に入力して登録します。
- ※登録には **Apple Developer アカウント（無料アカウントでも可）** のログイン認証が求められます。画面の指示に従ってログインしてください。

### 3. テスト用アプリ本体のビルド
```bash
# 開発用ビルドを実行
eas build --platform ios --profile development
```
- ビルドには 10〜20分程度 かかります。
- ビルドが正常終了すると、ターミナルに **QRコード** と **インストール用URL** が表示されます。

### 4. メンバーの iPhone へインストール
1. ターミナルに表示された **QRコード**（または発行されたExpoのURL）を、メンバー全員に共有します。
2. 各 iPhone の標準カメラでQRコードをスキャンし、WEBページを開きます。
3. **「Install」** ボタンを押すと、iPhone のホーム画面に本プロジェクト専用のテストアプリがダウンロード・インストールされます。
4. **注意**: インストール後、iPhone の **「設定 ＞ プライバシーとセキュリティ ＞ デベロッパモード」** をオンにして、端末を再起動してください（これを行わないとアプリが起動できません）。

---

## ⚡ 3. 日々の開発と自動更新の手順 (EAS Update)

アプリ本体が一度 iPhone に入ってしまえば、今後は **EAS Build（再ビルド）を毎回行う必要はありません。**
JavaScript/TypeScript の変更は、以下のコマンドでインターネット経由で一発でスマホに反映されます。

### 手動でスマホに更新を配信する場合
```bash
# 1. コードを保存・修正する
# 2. app フォルダでアップデートを配信する
cd app
npx eas update --branch preview --message "ここに更新内容のメモ"
```

### GitHub マージ時の完全自動配信 (CD)
本リポジトリには、GitHub Actions ワークフローが構成されています。
1. `main` ブランチに PR がマージされる。
2. クラウド（GitHub Actions）上で自動的に `npx eas update` が走り、全メンバーの iPhone へ自動で最新コードが配信されます。

### スマホでの確認方法
1. スマホにインストールしたアプリを起動します。
2. 起動時に裏側で最新版がないかチェックされます。
3. 新しい更新が見つかると、画面上に **「Update available」** というバナーが表示されるので、それをタップするか、アプリを一度終了して開き直すことで、画面が最新のコードに変わります！

---

## 🔑 4. GitHub Actions 用の Expoトークン設定（重要）

GitHub Actions で自動更新（EAS Update）を動かすには、GitHub に認証トークンを登録する必要があります。

1. **[Expoの管理画面](https://expo.dev/settings/access-tokens)** にアクセスし、ログインします。
2. 「Create Access Token」ボタンを押し、ハッカソン用のトークン（`EXPO_TOKEN`）を発行・コピーします。
3. GitHub の本プロジェクトのリポジトリページにアクセスします。
4. **「Settings ＞ Secrets and variables ＞ Actions」** を選択します。
5. **「New repository secret」** ボタンを押し、以下の内容で保存します。
   - **Name**: `EXPO_TOKEN`
   - **Secret**: コピーしたトークンの文字列
