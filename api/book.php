<?php
require('../includes/functions.php');

$type = $_GET['type'];
$acc = $_GET['acc'];
$title = $_GET['title'];
$author = $_GET['author'];
$call_no = $_GET['call_no'];
$publisher = $_GET['publisher'];
$issued = $_GET['issued'];
$subject = $_GET['subject'];
$place = $_GET['place'];
$date_pub = $_GET['date_pub'];
$pages = $_GET['pages'];
$binding = $_GET['binding'];
$isbn = $_GET['isbn'];
$seller = $_GET['seller'];
$bill_no = $_GET['bill_no'];
$price = $_GET['price'];
$lang = $_GET['lang'];

if($type == 'select') {
	$sql = 'SELECT * FROM book WHERE acc like ? OR title like ? OR author like ? OR publisher like ? OR issued like ? OR call_no like ? OR subject like ? OR place like ? OR date_pub like ? OR pages like ? OR binding like ? OR isbn like ? OR seller like ? OR bill_no like ? OR price like ? OR lang like ?';
	$data = query($sql, $acc, $title, $author, $publisher, $issued, $call_no, $subject, $place, $date_pub, $pages, $binding, $isbn, $seller, $bill_no, $price, $lang);
	$json = array();
	foreach($data as $row) {
		$arr = array(
			'acc' => $row['acc'],
			'author' => $row['author'],
			'title' => $row['title'],
			'call_no' => $row['call_no'],
			'subject' => $row['subject'],
			'publisher' => $row['publisher'],
			'place' => $row['place'],
			'date_pub' => $row['date_pub'],
			'pages' => $row['pages'],
			'binding' => $row['binding'],
			'isbn' => $row['isbn'],
			'seller' => $row['seller'],
			'bill_no' => $row['bill_no'],
			'price' => $row['price'],
			'lang' => $row['lang'],
			'issued' => $row['issued']
			);
			
		array_push($json, $arr);
	}
	echo json_encode($json);
}

if($type == 'insert') {
	$sql = 'INSERT INTO book VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,-1)';
	$data = query($sql, $acc, $title, $author, $call_no, $subject, $publisher, $place, $date_pub, $pages, $binding, $isbn, $seller, $bill_no, $price, $lang);
}

if($type == 'update') {
	$sql = 'UPDATE book SET issued=? WHERE acc=?';
	$data = query($sql, $issued, $acc);
}
?>