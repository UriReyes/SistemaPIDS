<?php
include('../conexion.php');
$nombre = $_POST['nombre'];
$a_paterno = $_POST['a_paterno'];
$a_materno = $_POST['a_materno'];
$correo = $_POST['correo'];
$avatar = $_POST['avatar'];
$privilegio = $_POST['privilegio'];
$password = $_POST['password'];
$query = "INSERT INTO usuarios (nombre, a_paterno, a_materno, correo, avatar, privilegios, password) 
VALUES ('$nombre', '$a_paterno', '$a_materno', '$correo', '$avatar' ,'$privilegio', '$password')";
$resultado = mysqli_query($conexion, $query);

if (!$resultado) {
     die('Consulta Fallida' . mysqli_error($conexion));
}

echo "Dato Insertado";