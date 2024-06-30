<?php
    require_once('conn2SQL.php');//引入資料庫連結設定檔
    $FishSubmitName = $_POST['FishSubmitName'];//取得name值
    $FishSubmitX = $_POST['FishSubmitX'];
    $FishSubmitY = $_POST['FishSubmitY'];
    $FishSubmitText = $_POST['FishSubmitText'];
    //$FishPondNumber = $_POST['FishPondNumber'];
    $today = date('Y/m/d');

    //$FishSubmitName = "123";
    //$FishSubmitX = "123";
    //$FishSubmitY = "123";
    //$FishSubmitText = "123";
    //$today = "2023-03-15";

    $sql = "INSERT INTO fishpond (FishPondName, CreateDate, FishText, X, Y) VALUES ('$FishSubmitName', '$today', '$FishSubmitText', '$FishSubmitX', '$FishSubmitY')";//插入表格語法
    //mysqli_query($link, $sql) or die("錯誤訊息：".mysqli_error($link));//執行插入

    $result = $conn->query($sql);

    if ($result === TRUE) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }

    echo $sql
    
  
?>