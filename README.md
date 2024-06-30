# 魚塭檢測系統

## 簡介
IOT應用，利用MQTT協定，在遠端以Arduino sensor進行資料傳輸至Broker，Node.js負責進行與MQTT Broker之間的資料接收並儲存於MySQL資料庫。

* 前端使用HTML5/CSS/JS/JQuary/Boostrap5
* 後端使用PHP/MySQL

## 使用說明
使用前須開啟XAMPP並開啟Apache、MySQL，並使用Fishpomg1.html作為主要進入點

未開啟資料庫將顯示錯誤且無法顯示。

**1.頁面介紹**
![image1](https://github.com/StupidChang/FishProject/assets/54949870/fe141589-d4ab-4aac-9b95-b0cf7a8e4d30)
**2.感測器列表**
![image2](https://github.com/StupidChang/FishProject/assets/54949870/d464ff90-6d5f-4dea-bbae-ab0d16e65264)
**3.感測器觀察頁面，可以查詢以及圖表顯示**
![image3](https://github.com/StupidChang/FishProject/assets/54949870/485e00fc-09ea-4640-a63f-1b3dfb09d801)
![image4](https://github.com/StupidChang/FishProject/assets/54949870/88a37047-8051-4aa6-9d2c-b5e8e5f30a84)
![image5](https://github.com/StupidChang/FishProject/assets/54949870/85af362c-06bc-4153-89fe-5c29ab89eb62)

**4.SQL共有5資料表**
![image6](https://github.com/StupidChang/FishProject/assets/54949870/f3d96647-cb8e-4b39-96e2-640b218e6d9f)
