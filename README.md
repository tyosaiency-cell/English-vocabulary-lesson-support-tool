# AI活用・英単語授業支援ツール (English Vocabulary Support Tool)

## 📖 プロジェクト概要
Google Gemini 3.0 Pro (Google AI Studio) を活用して開発された、語彙復習用Webアプリケーションのプロトタイプです。

授業冒頭の15分間での活用を想定しており、教員が設定した「重点単語」と、生徒自身が選択した「苦手単語」に基づき、AIが個別最適化された学習コンテンツ（ゲーム、物語、対話）をリアルタイムで生成します。

## ✨ 主な機能 (Key Features)
このリポジトリには、以下の機能コンポーネントが含まれています：

* **単語マッチングゲーム (MatchingGame):** 楽しく単語を定着させるインタラクティブなゲーム機能。
* **AIストーリー生成 (Story Reader):** 生徒の苦手単語を組み込んだ物語をAIが自動生成し、文脈の中で単語を学習。
* **個別診断 (Student Diagnosis):** 生徒の理解度を診断し、学習データを蓄積。
* **教員用ダッシュボード (Teacher View):** クラス全体の学習成果や苦手傾向を可視化し、教員へのフィードバックを実現。

## 🛠 技術スタック (Tech Stack)
本プロトタイプは、最新のAI開発環境を用いて構築されました。

* **Development:** Google AI Studio
* **AI Model:** Google Gemini 3.0 Pro
* **Frontend:** React, TypeScript, Vite
* **Architecture:** Component-based Architecture

## 🚀 開発背景・利用シナリオ (Background & Scenario)
本アプリケーションは、英語授業の**冒頭15分間（ウォームアップ）**での活用を目的としています。単なる暗記ではなく、学習者の「メタ認知」を刺激する以下のフローで設計されています。
1.  **課題提示:** 教員がその授業の「重点単語」を生徒に配信します。
2.  **メタ認知による選別:** 生徒は自信度（メタ認知）に基づき、自分が「まだ覚えていない単語」を自律的に選択します。
3.  **文脈学習:** 選択された単語は、AIによって即座に「単語の定義」「短文読解」「定着演習」へと展開され、文脈の中で記憶を強化します。

*※ 現在はプロトタイプ段階のため、データベースは未実装となっております。*


## Run Locally
**Prerequisites:**  Node.js
1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
