# reading-heatmap-cal

数値をヒートマップカレンダーとして記録するスクリプト。  
制作者は読んだ本のページ数を記録しています。

## 設置について

`/src`ディレクトリ直下に`.env`ファイルを作成する

```txt
ADMIN_PW='[ハッシュ化したパスワード]'
```

`/src`ディレクトリ直下に`log.json`ファイルを作成する（空ファイルでOK）

## 使い方

- ログイン後のフォームには読んだページ数を整数値で入力
- 同日に複数の値を送信した場合、値は合算されて保存される
- フォームの送信日と保存データの最後の日付が1日以上空いている場合、その間のデータは`0`として保存される

## 使用ライブラリ

以下のライブラリを利用しています。

- [Cal-Heatmap](https://cal-heatmap.com) (MIT License)
- [Twig](https://twig.symfony.com) (BSD-3-Clause License)
- [PHP dotenv](https://github.com/vlucas/phpdotenv) (BSD-3-Clause License)

## 本スクリプトのライセンス

MIT License
