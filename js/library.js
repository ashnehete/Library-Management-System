var last_tab = 'issue';

$(document).ready(function() {
	$('.book').hide();
	$('.member').hide();
	$('.late').hide();
	hide_search2();
	$('#search2_book').show();
	return false;
});



/**
 * Global variables
 */
function oBook(type, acc, author, title, call_no, subject, publisher, place, date_pub, pages, binding, isbn, seller, bill_no, price, lang, issued) {
    this.type = type;
    this.acc = acc;
    this.author = author;
    this.title = title;
    this.call_no = call_no;
    this.subject = subject;
    this.publisher = publisher;
    this.place = place;
    this.date_pub = date_pub;
    this.pages = pages;
    this.binding = binding;
    this.isbn = isbn;
    this.seller = seller;
    this.bill_no = bill_no;
    this.price = price;
    this.lang = lang;
    this.issued = issued;
}

function oMember(type, name, number, date, receipt, amount, expiry, address, phone_1, phone_2, email, book_1, book_2) {
    this.type = type;
    this.name = name;
    this.number = number;
    this.date = date;
    this.receipt = receipt;
    this.amount = amount;
    this.expiry = expiry;
    this.address = address;
    this.phone_1 = phone_1;
    this.phone_2 = phone_2;
    this.email = email;
    this.book_1 = book_1;
    this.book_2 = book_2;
}

function oIssue(type, acc, number, i_date, r_date, reissue, issued) {
	this.type = type;
	this.acc = acc;
	this.number = number;
	this.i_date = i_date;
	this.r_date = r_date;
	this.reissue = reissue;
	this.issued = issued;
}

var book = ['Acc', 'Author', 'Title', 'Call_No', 'Subject', 'Publisher', 'Place', 'Date_Pub', 'Pages', 'Binding', 'ISBN', 'Seller', 'Bill_No', 'Price', 'Lang', 'Issued'];
var member = ['Name', 'Number', 'Date', 'Receipt', 'Amount', 'Expiry', 'Address', 'Phone_1', 'Phone_2', 'Email', 'Book_1', 'Book_2'];
var issue = ['Acc', 'Number', 'I_Date', 'R_date', 'Reissue', 'Issued'];







/**
 * On Issue submit
 */
$('#issue').submit(function(event){
	var valB = $(this).find('.acc').val();
	var valM = $(this).find('.mem').val();
	
	//member
	console.log('member');
	var o = new oMember('select', '', valM, '', '', '', '', '', '', '', '', '', '');
	var data = getData('member', o)[0];
	if(data.book_1 == -1) {
		var objM = new oMember('update', '', valM, '', '', '', '', '', '', '', '', valB, data.book_2);
		getData('member', objM);
	}
	else if(data.book_2 == -1) {
		var objM = new oMember('update', '', valM, '', '', '', '', '', '', '', '', data.book_1, valB);
		getData('member', objM);
	}
	else {
		alert('Member already issued two books.\nIssue cancelled.');
		return;
	}
	
	//book
	console.log('book');
	var objB = new oBook('update', valB, '', '', '', '', '', '', '', '', '', '', '', '', '', '', 1);
	getData('book', objB)[0];
	
	//issue
	console.log('issue');
	var objI = new oIssue('insert', valB, valM, '', '', '', '');
	getData('issue', objI);
	
	last_tab = 'issue';
})








/**
 * On Return submit
 */
$('#return').submit(function(event){
	var valB = $(this).find('.acc').val();

	//issue
	console.log('issue');
	var oI = new oIssue('select', valB, '', '', '', '', '');
	var all = getData('issue', oI);
	var data;
	
	for(var x in all) {
		if(all[x].issued == 1) {
			data = all[x];
		}
	}
	console.log(data);
	
	//late_fees
	console.log('late_fees');
	var r_date = new Date(data.r_date);
	var today = new Date();
	var timeDiff = today - r_date;
	var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
	var msg = 'LATE FEES INFO\n';
	
	if(days <= 0)
		msg += 'No Late Fees.';
	else
		msg += 'Rs. ' + (days * 5);
	var c = confirm(msg);
	
	if(c ==  1) {
	
		//member
		console.log('member');
		oM = new oMember('select', '', data.number, '', '', '', '', '', '', '', '', '', '');
		var memData = getData('member', oM)[0];
		var objM;
		if(memData.book_1 == valB) {
			objM = new oMember('update', '', memData.number, '', '', '', '', '', '', '', '', -1, memData.book_2);
		}
		else if(memData.book_2 == valB) {
			objM = new oMember('update', '', memData.number, '', '', '', '', '', '', '', '', memData.book_1, -1);
		}
		getData('member', objM);

		//issue
		console.log('issue');
		var objI = new oIssue('update', valB, '', '', '', '', 1);
		getData('issue', objI);

		//book
		console.log('book');
		objB = new oBook('update', valB, '', '', '', '', '', '', '', '', '', '', '', '', '', '', -1);
		getData('book', objB);
	}
	
	last_tab = 'return';
})






/** 
 * On reissue submit
 */
 $('#reissue').submit(function() {
	var valB = $(this).find('.acc').val();

	//issue
	console.log('issue');
	var oI = new oIssue('select', valB, '', '', '', '', '');
	var all = getData('issue', oI);
	var data;
	
	for(var x in all) {
		if(all[x].issued == 1) {
			data = all[x];
		}
	}
	console.log(data);
	
	//late_fees
	console.log('late_fees');
	var r_date = new Date(data.r_date);
	var today = new Date();
	var timeDiff = today - r_date;
	var days = Math.ceil(timeDiff / (1000 * 3600 * 24));
	var msg = 'LATE FEES INFO\n';
	
	if(days <= 0)
		msg += 'No Late Fees.';
	else
		msg += 'Rs. ' + (days * 5);
	var c = confirm(msg);
	
	if(c ==  1) {
		//issue
		console.log('issue');
		var objI = new oIssue('update', valB, '', '', '', 1, '');
		getData('issue', objI);
	}
	
	last_tab = 'reissue';
 })

function radio(text) {
	return '<label class="btn btn-primary"><input type="radio" name="options2" value="'+text+'">'+text+'</label>';
}








/**
 * On search1 toggle
 */
var search1 = 'book';
var search2 = 'acc';
$('#search1 input:radio').on('change.radiocheck', function() {
	hide_search2();
	var s_book = $('#search2_book');
	var s_member = $('#search2_member');
	var s_issue = $('#search2_issue');
	search1 = $(this).filter(':checked').val();
	var type;
	if (search1 == 'book') {s_book.show(); search2='acc';}
	else if (search1 == 'member') {s_member.show(); search2='name';}
	else {s_issue.show(); search2='acc';}
});

function hide_search2() {
	$('#search2_book').hide();
	$('#search2_member').hide();
	$('#search2_issue').hide();
}

/**
 * On search2 toggle
 */
$('#search2_book input:radio, #search2_member input:radio, #search2_issue input:radio').on('change.radiocheck', function() {
	search2 = $(this).filter(':checked').val().toLowerCase();
});

/**
 * On search_in toggle
 */
$('#search_in').change(function() {
	var s;
	if (search1 == 'book') {s = new oBook();} else if (search1 == 'member') {s = new oMember();} else{s = new oIssue();};
	for(var x in s) {
		s[x] = '';
	}
	if(search2 != 'acc') {
		s[search2] = '%' + $(this).val() + '%';
	}
	else {
		s[search2] = $(this).val();
	}
	s['type'] = 'select';
	var data = getData(search1, s);
	console.log(data);
	var text = $('#search_text');
	text.html(header("Total: " + data.length));
	for(var i = 0; i < data.length; i++) {
		console.log(data[i]);
		for(var j in data[i]) {
			text.append(j.charAt(0).toUpperCase() + j.slice(1) + ': ' + data[i][j] + '<br>');
		}
		text.append('<br>');
	}
});









/**
 * When acc box is changed
 */
$('.acc').change(function() {
	var book = $(this).parent().parent().parent().siblings('.col-xs-6').children('.book');
	book.html(header('Book'));
	var val = $(this).val();
	var o = new oBook('select', val, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
	var data = getData('book', o)[0];
	if(data === undefined) {
		book.append('No data available.');
	}
	else {
		book.append('Title: ' + data.title + '<br/>');
		book.append('Author: ' + data.author + '<br/>');
		book.append('Publisher: ' + data.publisher + '<br/>');
		if(data.issued == 1) {
			book.append('Issued' + '<br/>');
		}
	}
	book.show();
})

/**
 * When mem box is changed
 */
$('.mem').change(function() {
	var member = $(this).parent().parent().parent().siblings('.col-xs-6').children('.member');
	member.html(header('Member'));
	var val = $(this).val();
	var o = new oMember('select', '', val, '', '', '', '', '', '', '', '', '', '');
	var data = getData('member', o)[0];
	if(data === undefined) {
		member.append('No data available.');
	}
	else {
		member.append('Name: ' + data.name + '<br/>');
		member.append('Phone_1: ' + data.phone_1 + '<br/>');
		if(data.book_1 != -1) {
			member.append('Book1: ' + data.book_1 + '<br/>');
		}
		if(data.book_2 != -1) {
			member.append('Book2: ' + data.book_2 + '<br/>');
		}
	}
	member.show();
})


















var header = function(text) {
	return '<h5>' + text + '</h5>';
}

/**
 * Getting data from the api resources
 * id - book/member/issue
*/
jQuery.ajaxSetup({async:false});
var getData = function(id, obj) {
	var send = 'api/' + id + '.php?';
	for(var i in obj) {
		send += i + '=' + obj[i] + '&';
	}
	var obj;
	console.log(send);
	$.get(send, function(data) {
		obj = data;
		console.log(obj);
	}, 'json');
	return obj;
}