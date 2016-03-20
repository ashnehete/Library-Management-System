<?php
require('../includes/functions.php');
$type = $_GET['type'];
$acc = $_GET['acc'];
$number = $_GET['number'];
$i_date = $_GET['i_date'];
$r_date = $_GET['r_date'];
$reissue = $_GET['reissue'];
$issued = $_GET['issued'];

if($type == 'select') {
	$sql = 'SELECT * FROM issue WHERE acc like ? OR number like ? OR i_date like ? OR r_date like ? OR reissue like ? OR issued like ?';
	$data = query($sql, $acc, $number, $i_date, $r_date, $reissue, $issued);
	$json = array();
	foreach($data as $row) {
		$arr = array("acc" => $row["acc"],
		"number" => $row["number"],
		"i_date" => $row["i_date"],
		"r_date" => $row["r_date"],
		"reissue" => $row["reissue"],
		"issued" => $row["issued"]);
		
		array_push($json, $arr);
	}
	echo json_encode($json);
}

if($type == 'insert') {
	$i = date('Y-m-d');
	$r = date('Y-m-d', strtotime('+10 days'));
	$sql = 'INSERT INTO issue VALUES(?, ?, ?, ?, -1, 1)';
	$data = query($sql, $acc, $number, $i, $r);
}

if($type == 'update') {
	if($reissue == 1) {
		$r = date('Y-m-d', strtotime('+10 days'));
		$sql = 'UPDATE issue SET r_date=?, reissue=1 WHERE acc=? AND issued=1';
		$data = query($sql, $r, $acc);
	}
	else if($issued == 1) {
		$r = date('Y-m-d');
		$sql = 'UPDATE issue SET issued=-1, r_date=? WHERE acc=? AND issued=1';
		$data = query($sql, $r, $acc);
	}
}
?>