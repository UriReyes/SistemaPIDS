<?php
include('../conexion.php');
$json = file_get_contents('php://input');
$array = json_decode($json, true);
if ($array['tipo'] == 'Alumno') {
    $tipo = $array['tipo'];
    $nombre = $array['nombre'];
    $noControl = $array['noControl'];
    $carrera = $array['carrera'];
    $cantidad = intval($array['cantidad']);
    $articulo = $array['articulo'];
    $serie = $array['serie'];
    $fechaPrestamo = $array['fecha'] . " " . $array['hora'];
    $query = "INSERT INTO prestamo_site (tipo, nombre_prestario, no_control, carrera, articulo, serie, cantidad, fecha_prestamo, fecha_regreso, estatus, estado_regreso) VALUES ('$tipo', '$nombre', '$noControl', '$carrera', '$articulo', '$serie', '$cantidad', '$fechaPrestamo', Null, 'Prestado', 'Sin devolucion') ";
    $resultado = mysqli_query($conexion, $query);
    if ($resultado) {
        echo "1";
    } else {
        die('Consulta Fallida' . mysqli_error($conexion));
    }
} else {
    $tipo = $array['tipo'];
    $nombre = $array['nombre'];
    $cantidad = intval($array['cantidad']);
    $articulo = $array['articulo'];
    $serie = $array['serie'];
    $fechaPrestamo = $array['fecha'] . " " . $array['hora'];
    $query = "INSERT INTO prestamo_site (tipo, nombre_prestario, articulo, serie, cantidad, fecha_prestamo, fecha_regreso, estatus, estado_regreso) VALUES ('$tipo', '$nombre', '$articulo', '$serie', '$cantidad', '$fechaPrestamo', Null, 'Prestado', 'Sin devolucion') ";
    $resultado = mysqli_query($conexion, $query);
    if ($resultado) {
        echo "1";
    } else {
        die('Consulta Fallida' . mysqli_error($conexion));
    }
}