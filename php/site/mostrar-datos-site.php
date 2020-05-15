<?php

include('../conexion.php');
$query = "SELECT * FROM inventario_site";
$result = mysqli_query($conexion, $query);
if (!$result) {
    die('Consulta Fallida' . $conexion->connect_error);
} else {
    while ($row = mysqli_fetch_assoc($result)) {
        $json['data'][] = $row;
    }
    $json_string = json_encode($json);
    echo $json_string;
}

mysqli_free_result($result); //Limpiamos Memoria
mysqli_close($conexion); //Cerramos Conexion