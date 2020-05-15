<?php
include("../conexion.php");
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $a_paterno = $_POST['a_paterno'];
    $a_materno = $_POST['a_materno'];
    $correo = $_POST['correo'];
    $avatar = $_POST['avatar'];
    $privilegio = $_POST['privilegio'];
    $password = $_POST['password'];

    $query = "UPDATE usuarios SET nombre ='$nombre', a_paterno='$a_paterno', a_materno='$a_materno', 
    correo='$correo', avatar='$avatar', privilegios='$privilegio', password='$password' WHERE idUsuario='$id' ";
    $resultado = mysqli_query($conexion, $query);
    if (!$resultado) {
        die('Falló la consulta');
    }
    echo 'Usuario Actualizado';
}