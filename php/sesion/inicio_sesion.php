<?php

session_start();
include('../conexion.php');
if (isset($_POST['usuario']) && isset($_POST['password'])) {
    $usuario = mysqli_real_escape_string($conexion, $_POST['usuario']);
    $password = mysqli_real_escape_string($conexion, $_POST['password']);
    $query = "SELECT nombre,estado,privilegios,avatar,a_paterno,a_materno,correo,idUsuario FROM usuarios WHERE nombre = '$usuario' AND password = '$password'";
    $resultado = mysqli_query($conexion, $query);
    $filas = mysqli_num_rows($resultado);
    if ($filas == 1) {
        $datos = mysqli_fetch_array($resultado);
        $_SESSION['usuario'] = $datos[0];
        $_SESSION['a_paterno'] = $datos[4];
        $_SESSION['a_materno'] = $datos[5];
        $_SESSION['avatar'] = $datos[3];
        $_SESSION['estado'] = $datos[1];
        $_SESSION['privilegios'] = $datos[2];
        $_SESSION['id'] = $datos[7];
        echo "1" . ",";
        echo "$datos[7]";
    } else {
        echo "Error Usuario Inexistente Comuniquese con el administrador";
    }
} else {
    echo 'Error Comuniquese con soporte técnico';
}