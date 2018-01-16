<?php
	header('Access-Control-Allow-Origin: *');  
	header('Content-Type: application/json');
	require('./event.php');
	require('./login.php');
		
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "redcloud";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Problemes de connexion: " . $conn->connect_error);
	} 
	
	if (isset($_POST["login"])){
		login();
	} else if (isset($_POST['user_nom'],$_POST['user_prenom'],$_POST['user_pseudo'])) {
		insert_user();
	} else if (isset($_GET['events'])) {
		get_events();
	}
	
	//
	
	function login () {
		global $conn;
		$sql = "SELECT * FROM user WHERE user_pseudo = '$_POST[pseudo]' AND user_password = '$_POST[password]'";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			$data = TRUE;
		} else {
			$data = FALSE;
		}
		echo json_encode(new Login($data));
	}
	
	function insert_user () {
		global $conn;
		$sql = "INSERT INTO user(user_nom, user_prenom, user_pseudo, user_ville, user_npa, user_datenaissance, user_email, user_password) 
				VALUES ('$_POST[user_nom]','$_POST[user_prenom]','$_POST[user_pseudo]','$_POST[user_ville]','$_POST[user_npa]','$_POST[user_datenaissance]','$_POST[user_email]','$_POST[user_password]')";
		
		if ($conn->query($sql) or die(mysqli_error($conn)) === TRUE) {
			echo json_encode(true);
		} else {
			echo json_encode(false);
		}
	}
	
	function get_events() {
		global $conn;
		$sql = "SELECT event_id AS 'id', event_imageUri as 'uri', event_body as 'body', event_date as 'date', event_userInfo as 'userInfo', event_title AS 'title' FROM events";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
		// output data of each row
			$data = [];
			while($row = $result->fetch_assoc()) {
				$data[] = new Event($row["id"], 'http://' . $_SERVER['SERVER_ADDR'] . $row["uri"], $row["body"], $row["date"], $row["userInfo"], $row["title"]);
			}
			echo json_encode($data);	
		}	
	}
	
	
	?>
