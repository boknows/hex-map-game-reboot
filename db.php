<?php 
  	try {   $db = new PDO('mysql:host=localhost;dbname=hex;charset=utf8', 'root', 'root'); }  //xampp connection
	catch(PDOException $ex){ die("Failed to connect to the database: " . $ex->getMessage());} 
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); 
?>