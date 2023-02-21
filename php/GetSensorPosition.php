<?php
    require_once('conn2SQL.php');
    $FishPondName = $_GET['FishPondName'];
    //$FishPondName = "魚塭戰艦號";
    $myarray = array();

    $sql = "SELECT FishCode FROM fishpond Where FishPondName='$FishPondName'";
    $result = $conn->query($sql);   
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc() ) {
            $FishCode = $row["FishCode"];
        }
    }

    $sql = "SELECT PositionCode, X, Y FROM sensorposition Where FishCode='$FishCode'";
    $result = $conn->query($sql);   

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $myarray[] = array("PositionCode" => $row["PositionCode"],
                            "X" => $row['X'],
                            "Y" => $row['Y']);
        }
    } else {
        //echo "0 查找值";
    }

    $data_json_en = json_encode($myarray);
    echo $data_json_en;

    $result->free(); // 釋放記憶體
    $conn->close();
?>