 <?php

// połączenie z bazą danych
$host = "serwer2241105.home.pl";
$user = "36456610_kevinadamski";
$password = "qwerty123!@#UIOP";
$dbname = "36456610_kevinadamski";
$conn = mysqli_connect($host, $user, $password, $dbname);

// pobranie danych z formularza
$message = $_POST["message"];
$nick = $_COOKIE["nick"];
$color = $_COOKIE["color"];
// zapisanie danych do bazy danych
$sql = "INSERT INTO P2_chat (message , nick, color) VALUES ('$message' , '$nick', '$color')";
mysqli_query($conn, $sql);



// zamknięcie połączenia z bazą danych
mysqli_close($conn);
?>



