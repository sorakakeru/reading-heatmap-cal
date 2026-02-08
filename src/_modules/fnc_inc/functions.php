<?php
  /**
   * reading-heatmap-cal
   * https://github.com/sorakakeru/reading-heatmap-cal
   * 
   * Copyright (c) 2025 Yamatsu
   * Released under the MIT license
   * https://github.com/sorakakeru/reading-heatmap-cal/blob/main/LICENSE
   * 
   * This script uses the PHP dotenv library and the Twig template engine (both under the BSD-3-Clause License).
   * For details about Twig's license, please refer to Twig web site.
   * https://twig.symfony.com/license
   * For details about PHP dotenv's license, please refer to PHP dotenv GitHub repository.
   * https://github.com/vlucas/phpdotenv/blob/master/LICENSE
   */

  //jsonファイル読み込み
  function loadDatas($file) {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?: [];
  }

  //セッション
  function sessionStart() {
    session_start();
    //ログインや重要操作時にID再生成
    if (!isset($_SESSION['initiated'])) {
      session_regenerate_id(true);
      $_SESSION['initiated'] = true;
    }
  }
  
  //CSRFトークン生成
  function generateToken() {
    return bin2hex(random_bytes(32));
  }

  //CSRFトークン検証
  function validateToken($token) {
    //送信されてきた$tokenが生成したハッシュと一致するか
    return isset($_SESSION['token']) && hash_equals($_SESSION['token'], $token);
  }

  //XSS対策
  function h($str) {
    if (is_array($str)) {
      return array_map('h', $str);
    } else {
      return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    }
  }

?>