<?php
    require_once('connect.php');//引入資料庫連結設定檔
    $name = $_POST['name'];//取得name值
    $sql = "INSERT INTO 表格名稱 (欄位名稱) VALUES ('$name') ";//插入表格語法
    mysqli_query($link, $sql) or die("錯誤訊息：".mysqli_error($link));//執行插入
    echo "資料插入成功！";//顯示訊息
?>