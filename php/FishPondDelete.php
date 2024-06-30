<?php
    require_once('conn2SQL.php');
    $FishPondName = $_POST['FishPondName'];
    //$FishPondName = "123";
    $sql = "DELETE FROM `fishpond` WHERE `FishPondName`=$FishPondName";

    $result = $conn->query($sql);   

    if ($result === TRUE) {
        echo "成功";
    } else {
        echo "失敗";
    }

    $conn->close();
?>