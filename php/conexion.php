<?php
$servidor = 'localhost'; //Direccion Servidor MySQL
$usuario = "root"; // Usuario Creado desde el Servidor MySQl
$password = "12345678";
$bd = "pids_itp_db";

// $servidor = 'localhost'; //Direccion Servidor MySQL
// $usuario = "root"; // Usuario Creado desde el Servidor MySQl
// $password = "12345678";
// $bd = "prueba_inventario_sis";

$conexion = new mysqli($servidor, $usuario, $password, $bd);

if ($conexion->connect_error) {
    die('Error en la conexión: [' . $conexion->connect_error . "]");
}
    
    // printf("Conectado con éxito: %s\n", $mysqli->server_info);