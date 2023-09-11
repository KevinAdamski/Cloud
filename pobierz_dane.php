<?php
// nawiązanie połączenia z bazą danych
$db_host = 'serwer2241105.home.pl';
$db_user = '36456610_kevinadamski';
$db_pass = 'qwerty123!@#UIOP';
$db_name = '36456610_kevinadamski';
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// pobranie danych z bazy danych
$limit = $_POST['limit'];
$offset = $_POST['offset'];
$sql = "SELECT * FROM P2_chat ORDER BY id DESC LIMIT $limit OFFSET $offset";
$result = mysqli_query($conn, $sql);

// przetworzenie wyników do formatu JSON
$data = array();
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);

// zamknięcie połączenia z bazą danych
mysqli_close($conn);
?>
