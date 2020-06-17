-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lockersize
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrier`
--

DROP TABLE IF EXISTS `carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carrierName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES (2101,'Maxer'),(2102,'SeaDel'),(3100,'IDel'),(5100,'FedEx Corporation'),(5101,'Delhivery'),(5102,'Amazon Logistics'),(5103,'AB Express');
/*!40000 ALTER TABLE `carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrier_delivery`
--

DROP TABLE IF EXISTS `carrier_delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrier_delivery` (
  `propertyId` int DEFAULT NULL,
  `carrierId` int DEFAULT NULL,
  `deliveryDay` varchar(20) DEFAULT NULL,
  `deliveryTime` time DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `c_id` (`carrierId`),
  CONSTRAINT `carrier_delivery_ibfk_1` FOREIGN KEY (`carrierId`) REFERENCES `carrier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier_delivery`
--

LOCK TABLES `carrier_delivery` WRITE;
/*!40000 ALTER TABLE `carrier_delivery` DISABLE KEYS */;
INSERT INTO `carrier_delivery` VALUES (101,5100,'Monday','15:00:00',2),(101,5100,'Saturday','11:00:00',3),(101,5100,'Wednesday','13:00:00',8),(102,5100,'Monday','15:00:00',9),(103,5102,'Sunday','17:00:00',10),(101,3100,'Monday','23:05:00',22),(101,3100,'Tuesday','12:50:00',23),(101,3100,'Wednesday','11:55:00',24),(101,3100,'Thursday','19:30:00',25),(101,3100,'Friday','18:10:00',26),(101,3100,'Sunday','06:35:00',27),(101,2101,'Monday','22:20:00',97),(101,2101,'Tuesday','12:05:00',98),(101,2101,'Thursday','19:25:00',99),(101,2101,'Friday','18:27:00',100),(101,5101,'Tuesday','11:00:00',106),(101,5101,'Thursday','18:30:00',107),(101,5102,'Tuesday','22:00:00',111),(101,5102,'Friday','16:00:00',112),(101,5102,'Sunday','16:00:00',113),(101,2102,'Tuesday','11:15:00',114),(101,2102,'Wednesday','11:20:00',115),(101,2102,'Friday','20:25:00',116),(101,2102,'Saturday','12:30:00',117),(101,2102,'Sunday','19:45:00',118);
/*!40000 ALTER TABLE `carrier_delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `propertyId` int NOT NULL AUTO_INCREMENT,
  `propertyName` varchar(255) DEFAULT NULL,
  `propertyAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (101,'ABC Properties','A-12, YGV city'),(102,'PQR Properties','A-13, YGV city'),(103,'JKL Properties','A-15, YGV city'),(104,'WE Properties','B-45, NJU city'),(105,'JIE Properties','B-40, NJU city'),(106,'PQ Properties','oiuyt city'),(107,'RSJ Properties','B-12, YGV city');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unitsdata`
--

DROP TABLE IF EXISTS `unitsdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unitsdata` (
  `propertyId` int NOT NULL,
  `unitId` int NOT NULL AUTO_INCREMENT,
  `unitNumber` int NOT NULL,
  `buildingNumber` int NOT NULL,
  `addressId` varchar(20) NOT NULL,
  PRIMARY KEY (`unitId`)
) ENGINE=InnoDB AUTO_INCREMENT=2109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unitsdata`
--

LOCK TABLES `unitsdata` WRITE;
/*!40000 ALTER TABLE `unitsdata` DISABLE KEYS */;
INSERT INTO `unitsdata` VALUES (101,2101,1,15,'AdI101115'),(101,2103,2,17,'AdI101217'),(101,2104,2,16,'AdI101216'),(101,2106,3,5,'AdI10135'),(101,2108,2,15,'AdI101215');
/*!40000 ALTER TABLE `unitsdata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-16 22:12:47
