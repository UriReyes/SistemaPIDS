<?php
include('../conexion.php');
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $query = "DELETE FROM inventario_laboratorio WHERE id='$id'";
    $resultado = mysqli_query($conexion, $query);
    if (!$resultado) {
        die("Consulta Fallida");
    }
    echo "Articulo Eliminado";
}