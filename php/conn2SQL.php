<?php
    $servername = "localhost";
    $username = "Chang";
    $password = "zxc900211";
    $dbname = "Chang";

    $conn = new mysqli($servername, $username, $password, $dbname);
    // 一切的起源就是 mysqli 這個 class
    // 內中的伺服器名稱 / 帳號 / 密碼 / 與資料庫名的排序是固定的

    if ($conn->connect_error) { // connect_error 是內建的語法，表示連線Failed
        die('連線Failed');
    } else {
        //echo '連線Success' . '<br>';
    }
?>
