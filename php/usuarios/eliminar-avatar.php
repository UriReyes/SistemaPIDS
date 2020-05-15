<?php
$json = file_get_contents('php://input');
$array = json_decode($json);
foreach ($array as $key => $value) {
    if (unlink("../../" . $value)) {
        echo "success, Eliminado con éxito";
    } else {
        echo "error, Ha ocurrido un error";
    }
}