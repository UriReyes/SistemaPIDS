<?php
include('../conexion.php');
$fecha = $_POST['fecha'];
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$serie = $_POST['serie'];
$folio = $_POST['folio'];
$estatus = $_POST['estatus'];
$articulo = $_POST['articulo'];
$piezas = $_POST['piezas'];

$query = "INSERT INTO inventario_site (fecha, marca, modelo, numero_serie, folio, estatus, articulo, piezas) VALUES ('$fecha', '$marca', '$modelo', '$serie' , '$folio', '$estatus', '$articulo', '$piezas')";
$resultado = mysqli_query($conexion, $query);

if (!$resultado) {
     die('Consulta Fallida' . mysqli_error($conexion));
}

echo "Dato Insertado";