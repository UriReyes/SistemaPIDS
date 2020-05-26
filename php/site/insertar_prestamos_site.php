<?php
$json = file_get_contents('php://input');
$array = json_decode($json, true);
$nombre = $array['nombre'];
$noControl = $array['noControl'];
$carrera = $array['carrera'];
$cantidad = $array['cantidad'];
$articulo = $array['articulo'];
$serie = $array['serie'];
$fecha = $array['fecha'];
$hora = $array['hora'];

echo $nombre, $noControl, $carrera, $cantidad, $articulo, $serie, $fecha, $hora;