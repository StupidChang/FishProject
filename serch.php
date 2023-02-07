<?php
    include("config.php");
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("Connetion failed: ". $conn->connect_error);
    }
    $key = false;
    $sql = "SELECT * FROM ph";
    $result = $conn->query($sql);
    if($result ->num_rows > 0){
        while($row = $result->fetch_assoc()){
            
        }
        if(!$key){
            //create($conn);
        }
    }
?>