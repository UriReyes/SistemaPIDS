<?php
$imagen = $_FILES['avatar_usuario'];
$directorio = '../../img/avatar/';
$archivo = $directorio . basename($imagen['name']);

$tipoArchivo = strtolower(pathinfo($archivo, PATHINFO_EXTENSION));
$size = getimagesize($imagen['tmp_name']);
if ($size) {
    //Valida si imagen es menor a 5mb
    $tamano = $imagen['size'];
    if (!$tamano < 5000) {
        if ($tipoArchivo == 'jpg' || $tipoArchivo == 'png' || $tipoArchivo == 'jpeg' || $tipoArchivo == 'gif') {
            move_uploaded_file($imagen['tmp_name'], $archivo);
            echo "img/avatar/" . basename($imagen['name']);
        } else {
            echo "error, Solo se admite archivo jpg, jpeg, png, gif";
        }
    } else {
        echo "error, El tamaño de la imagen debe de ser menor a 5mb";
    }
} else {
    echo "error, El archivo no es una imagen";
}