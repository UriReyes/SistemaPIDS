<?php
include('../conexion.php');
$fecha = $_POST['fecha'];
$laboratorio = $_POST['laboratorio'];
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$serie = $_POST['serie'];
$folio = $_POST['folio'];
$estatus = $_POST['estatus'];
$articulo = $_POST['articulo'];

$query = "INSERT INTO inventario_laboratorio (fecha, laboratorio, marca, modelo, numero_serie, folio, estatus, articulo) VALUES ('$fecha', '$laboratorio', '$marca', '$modelo', '$serie' , '$folio', '$estatus', '$articulo') ";
$resultado = mysqli_query($conexion, $query);

if (!$resultado) {
     die('Consulta Fallida' . mysqli_error($conexion));
}

echo "Dato Insertado";