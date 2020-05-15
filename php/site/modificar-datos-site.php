<?php
include("../conexion.php");
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $fecha = $_POST['fecha'];
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $serie = $_POST['serie'];
    $folio = $_POST['folio'];
    $estatus = $_POST['estatus'];
    $articulo = $_POST['articulo'];
    $piezas = $_POST['piezas'];

    $query = "UPDATE inventario_site SET fecha ='$fecha', marca='$marca', modelo='$modelo', 
    numero_serie='$serie', folio='$folio', estatus='$estatus', articulo='$articulo', piezas='$piezas' WHERE id='$id' ";
    $resultado = mysqli_query($conexion, $query);
    if (!$resultado) {
        die('Falló la consulta');
    }
    echo 'Dato Actualizado';
}