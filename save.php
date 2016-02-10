<?php
require("db.php");

if($_POST['param']=="saveAll"){

	//$stmt = $db->prepare('INSERT INTO map () VALUES (:mapArray, :mapProperties, :name, :mapUnits)');
	//$stmt->execute(array(':mapArray' => $_POST['mapArray'], ':mapProperties' => $_POST['mapProperties'], ':name' => $_POST['name'], ':mapUnits' => $_POST['mapUnits']));
	//$maxMapID = $db->query('SELECT max(id) from maps')->fetchColumn(); 
	
	print_r($_POST['data']);

	echo JSON_encode("Success");
}
?>