<?php
include('../conexion.php');
$json = file_get_contents('php://input');
$array = json_decode($json, true);
$id = $array['id'];
$devolucion = $array['devolucion'];
$estatus = $array['estatus'];
$estadoDevolucion = $array['estadoDevolucion'];
$query = "UPDATE prestamo_site SET fecha_regreso = '$devolucion', estatus = '$estatus', estado_regreso = '$estadoDevolucion' WHERE (id = '$id')";
$resultado = mysqli_query($conexion, $query);
if ($resultado) {
    echo "Articulo Devuelto";
} else {
    die('Consulta Fallida' . $conexion->connect_error);
}