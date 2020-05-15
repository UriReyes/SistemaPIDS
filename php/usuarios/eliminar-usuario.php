<?php
include('../conexion.php');
if (isset($_POST['idUsuario'])) {
    $id = $_POST['idUsuario'];
    //echo $id;
    $query = "DELETE FROM usuarios WHERE idUsuario='$id'";
    $resultado = mysqli_query($conexion, $query);
    if (!$resultado) {
        die("Consulta Fallida");
    }
    echo "Usuario Eliminado";
}