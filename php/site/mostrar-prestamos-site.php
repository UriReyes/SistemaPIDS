<?php
include('../conexion.php');
$query = "SELECT * FROM prestamo_site";
$result = mysqli_query($conexion, $query);
if (!$result) {
    die('Consulta Fallida' . $conexion->connect_error);
} else {
    //var_dump(mysqli_fetch_assoc($result));
    if (mysqli_num_rows($result) == 0) {
        $json['data']['fecha'] = null;
        $json['data']['marca'] = null;
        $json['data']['modelo'] = null;
        $json['data']['numero_serie'] = null;
        $json['data']['folio'] = null;
        $json['data']['estatus'] = null;
        $json['data']['articulo'] = null;
        $json['data']['piezas'] = null;
        $json_string = json_encode($json);
        echo $json_string;
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
            $json['data'][] = $row;
        }
        $json_string = json_encode($json);
        echo $json_string;
    }
}
mysqli_free_result($result); //Limpiamos Memoria
mysqli_close($conexion); //Cerramos Conexion