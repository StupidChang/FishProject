<?php
    require_once('conn2SQL.php');
    $FishPondName = $_POST['FishPondName'];
    //$FishPondName = "魚塭戰艦號";
    $myarray = array();
    $sql = "SELECT PositionCode FROM sensorposition A INNER JOIN fishpond B ON A.FishCode = B.FishCode WHERE FishPondName = '$FishPondName' ";

    $result = $conn->query($sql);   

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $myarray[] = array("PositionCode" => $row["PositionCode"]);
        }
    } else {
        //echo "0 查找值";
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>