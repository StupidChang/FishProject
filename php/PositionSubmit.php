<?php
    require_once("conn2SQL.php");
    $X = $_GET['FinalPositionX'];
    $Y = $_GET['FinalPositionY'];
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

    $sql = "INSERT INTO sensorposition (FishCode, X, Y) VALUES ('$FishCode', '$X', '$Y')"
    $result = $conn->query($sql);   
    if($result === TRUE)
        echo "插入成功"
    else
        echo "插入失敗"

    $result->free();
    $conn->close();
?>