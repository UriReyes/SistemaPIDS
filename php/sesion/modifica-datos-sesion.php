<?php
// obtenemos los datos a actualizar

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$avatar = $_POST['avatar'];
$a_paterno = $_POST['a_paterno'];
$a_materno = $_POST['a_materno'];
$privilegios = $_POST['privilegio'];
// abrimos sesion
if ($_POST['idSesion'] == $_POST['id']) {
    session_start();
}
$_SESSION['id'] = $id;
$_SESSION['avatar'] = $avatar;
$_SESSION['usuario'] = $nombre;
$_SESSION['a_paterno'] = $a_paterno;
$_SESSION['a_materno'] = $a_materno;
$_SESSION['privilegios'] = $privilegios;
$json = new \stdClass();
$json->id = $_SESSION['id'];
$json->nombre = $_SESSION['usuario'];
$json->a_paterno = $_SESSION['a_paterno'];
$json->a_materno = $_SESSION['a_materno'] = $a_materno;
$json->avatar = $_SESSION['avatar'];
$json->privilegios = $_SESSION['privilegios'];
//$json = [$_SESSION['avatar'], $_SESSION['usuario'], $_SESSION['a_paterno'], $_SESSION['a_materno'], $_SESSION['privilegios']];
$myJSON = json_encode($json);
echo $myJSON;