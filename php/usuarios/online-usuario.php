<?php
// En la base de datos cuando se esta offline se reserva el valor online para tomarlo una vez que se ingrese, por el contrario, cuando se ingresa el estado se actualiza a offline
include("../conexion.php");
if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $query = "UPDATE `pids_itp_db`.`usuarios` SET `estado` = 'online' WHERE (`idUsuario` = '$id')";
    $result = mysqli_query($conexion, $query);
    if (!$result) {
        die("Consulta Fallida");
    }
    echo "Estado Actualizado";
}