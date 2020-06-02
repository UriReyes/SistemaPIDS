<?php
include("../conexion.php");
if (isset($_POST['correo']) && isset($_POST['password'])) {
    // Verificar que el correo exista
    $query = "SELECT correo FROM usuarios";
    $resultadoCorreos = mysqli_query($conexion, $query);
    if ($resultadoCorreos) {
        $correosArray = array();
        while ($row = mysqli_fetch_assoc($resultadoCorreos)) {
            array_push($correosArray, $row["correo"]);
        }
        $correo = $_POST['correo'];
        if (in_array($correo, $correosArray)) {
            // Si el correo Existe en la BD
            $pass = $_POST['password'];
            $queryActualizar = "UPDATE usuarios SET password = '$pass' WHERE (correo = '$correo')";
            $resultado = mysqli_query($conexion, $queryActualizar);
            if (!$resultado) {
                die('Consulta Fallida' . $conexion->connect_error);
            } else {
                echo 1;
            }
        } else {
            echo "El correo electrónico ingresado no existe";
        }

        $resultadoCorreos->free();
    }
    mysqli_close($conexion);
}