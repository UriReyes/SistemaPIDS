<?php

include('../conexion.php');
$query = "SELECT * FROM usuarios";
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
        );
    }
    $json_string = json_encode($json);
    echo $json_string;
}

mysqli_free_result($result); //Limpiamos Memoria
mysqli_close($conexion); //Cerramos Conexion