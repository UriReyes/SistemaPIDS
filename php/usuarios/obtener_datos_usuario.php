<?php
include('../conexion.php');
if (isset($_POST['idUsuario'])) {
    $id = $_POST['idUsuario'];
    $query = "SELECT * FROM usuarios WHERE idUsuario='$id'";
    $result = mysqli_query($conexion, $query);
    if (!$result) {
        die('Consulta Fallida' . $conexion->connect_error);
    } else {
        $json = array();
        while ($row = mysqli_fetch_array($result)) {
            $json[] = array(
                'idUsuario' => $row['idUsuario'],
                'nombre' => $row['nombre'],
                'a_paterno' => $row['a_paterno'],
                'a_materno' => $row['a_materno'],
                'correo' => $row['correo'],
                'estado' => $row['estado'],
                'avatar' => $row['avatar'],
                'privilegios' => $row['privilegios'],
                'password' => $row['password']
            );
        }
        $json_string = json_encode($json);
        echo $json_string;
    }
}