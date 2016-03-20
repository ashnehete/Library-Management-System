<?php
require('../includes/functions.php');
$type = $_GET['type'];
$number = $_GET['number'];
$name = $_GET['name'];
$phone_1 = $_GET['phone_1'];
$phone_2 = $_GET['phone_2'];
$book_1 = $_GET['book_1'];
$book_2 = $_GET['book_2'];
$date = $_GET['date'];
$receipt = $_GET['receipt'];
$amount = $_GET['amount'];
$expiry = $_GET['expiry'];
$address = $_GET['address'];
$email = $_GET['email'];

if($type == 'select') {
	$sql = 'SELECT * FROM member WHERE number like ? OR name like ? OR phone_1 like ? OR book_1 like ? OR book_2 like ? OR date like ? OR receipt like ? OR amount like ? OR expiry like ? OR address like ? OR phone_2 like ? OR email like ?';
	$data = query($sql, $number, $name, $phone_1, $book_1, $book_2, $date, $receipt, $amount, $expiry, $address, $phone_2, $email);
	$json = array();
	foreach($data as $row) {
		$arr = array(
            'name' => $row['name'],
            'number' => $row['number'],
            'date' => $row['date'],
            'receipt' => $row['receipt'],
            'amount' => $row['amount'],
            'expiry' => $row['expiry'],
            'address' => $row['address'],
            'phone_1' => $row['phone_1'],
            'phone_2' => $row['phone_2'],
            'email' => $row['email'],
            'book_1' => $row['book_1'],
            'book_2' => $row['book_2'],
			);
		
		array_push($json, $arr);
	}
echo json_encode($json);
}

if($type == 'insert') {
	$sql = 'INSERT INTO member VALUES(?,?,?,?,?,?,?,?,?,?,-1,-1)';
	$data = query($sql, $name, $number, $date, $receipt, $amount, $expiry, $address, $phone_1, $phone_2, $email, $book_1, $book_2);
}

if($type == 'update') {
	$sql = 'UPDATE member SET book_1=?, book_2=? WHERE number=?';
	$data = query($sql, $book_1, $book_2, $number);
}
?>