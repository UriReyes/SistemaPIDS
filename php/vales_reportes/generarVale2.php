<?php

require_once('../../vendor/autoload.php');
$css = file_get_contents('css_vales.css');
$json = file_get_contents('php://input');
$array = json_decode($json, true);
if ($array['tipo'] == "Alumno") {
    $tipo = $array['tipo'];
    $nombre = $array['nombre_prestario'];
    $noControl = $array['no_control'];
    $carrera = $array['carrera'];
    $cantidad = intval($array['cantidad']);
    $articulo = $array['articulo'];
    $serie = $array['serie'];
    $fechaPrestamo = $array['fecha_prestamo'];
} else {
    $tipo = $array['tipo'];
    $nombre = $array['nombre_prestario'];
    $noControl = "Sin número de control";
    $carrera = "Docente";
    $cantidad = intval($array['cantidad']);
    $articulo = $array['articulo'];
    $serie = $array['serie'];
    $fechaPrestamo = $array['fecha_prestamo'];
}

$mpdf = new \Mpdf\Mpdf([]);

echo $nombre;
function plantilla($nombrePrestario, $numero_control, $carreraA, $tipoP, $articuloP, $serieP, $cantidadP, $fechaPrestamoP)
{

    $html = '
     <body>
         <table>
         <tr>
             <td>
                 <img
                 class="responsive2"
                 src="../../img/logoSEP.svg.png"
                 width="50px"
                 height="50px"
                 />
             </td>
             <td class="center">
                 <div class="center">
                 <h3>Instituto Tecnológico de Pachuca</h3>
                 <small>Vale para prestamo de articulos</small>
                 </div>
             </td>
             <td>
                 <img
                     class="responsive1"
                     src="../../img/LITP.png"
                     width="50px"
                     height="50px"
                 />  
             </td>
         </tr>
         </table>
         <table>
            <tr>
                <td>
                    <p class="small"><b>Numero de Control(Alumno): </b>' . $numero_control . '</p>
                    <p class="small"><b>Nombe del prestario: </b>' . $nombrePrestario . '</p>
                    <p class="small"><b>Carrera(Alumno): </b>' . $carreraA . '</p>
                </td>
                <td class="center">
                    <p><b>____________________________</b></p>
                    <small class="xx-small">Firma Alumno</small>
                </td>
            </tr>
         </table>
         <br />
         <br />
         <table class="borde-abajo">
            <thead>
                <tr>
                    <td class="anchoIgual"><b>Tipo Prestario</b></td>
                    <td class="anchoIgual"><b>Articulo Prestado</b></td>
                    <td class="anchoIgual"><b>Serie</b></td>
                    <td class="anchoIgual"><b>Cantidad</b></td>
                    <td class="anchoIgual"><b>Fecha del Prestamo</b></td>
                </tr>
            </thead>
        </table>
        <table>
            <tbody>
                <tr>
                    <td class="anchoIgual">' . $tipoP . '</td>
                    <td class="anchoIgual">' . $articuloP . '</td>
                    <td class="anchoIgual">' . $serieP . '</td>
                    <td class="anchoIgual">' . $cantidadP . '</td>
                    <td class="anchoIgual">' . $fechaPrestamoP . '</td>
                </tr>
            </tbody>
         </table>
         <br />
         <br />
         <p><small class="x-small"><b>Queda comprometido a regresar el articulo que se le ha prestado</b></small></p>
         <p><small class="xx-small">Departamento de Sistemas Computacionales</small></p>
         <p><small class="xx-small">Prestamo de Inventario</small></p>
         <p><small class="xx-small">Prestamo de Inventario</small></p>
         <p><small class="xx-small"><strong>Vale del Alumno</strong></small></p>
         <br />
         <br />
         <br />
         <br />
         <p><small class="xx-small"><strong>Cortar</strong></small> ---------------------------------------------------------------------------------------------------------------------------------------------- </p>
         <table>
         <tr>
             <td>
                 <img
                 class="responsive2"
                 src="../../img/logoSEP.svg.png"
                 width="50px"
                 height="50px"
                 />
             </td>
             <td class="center">
                 <div class="center">
                 <h3>Instituto Tecnológico de Pachuca</h3>
                 <small>Vale para prestamo de articulos</small>
                 </div>
             </td>
             <td>
                 <img
                     class="responsive1"
                     src="../../img/LITP.png"
                     width="50px"
                     height="50px"
                 />  
             </td>
         </tr>
         </table>
         <table>
            <tr>
                <td>
                    <p class="small"><b>Numero de Control(Alumno): </b>' . $numero_control . '</p>
                    <p class="small"><b>Nombe del prestario: </b>' . $nombrePrestario . '</p>
                    <p class="small"><b>Carrera(Alumno): </b>' . $carreraA . '</p>
                </td>
                <td class="center">
                    <p><b>____________________________</b></p>
                    <small class="xx-small">Firma Alumno</small>
                </td>
            </tr>
         </table>
         <br />
         <br />
         <table class="borde-abajo">
            <thead>
                <tr>
                    <td class="anchoIgual"><b>Tipo Prestario</b></td>
                    <td class="anchoIgual"><b>Articulo Prestado</b></td>
                    <td class="anchoIgual"><b>Serie</b></td>
                    <td class="anchoIgual"><b>Cantidad</b></td>
                    <td class="anchoIgual"><b>Fecha del Prestamo</b></td>
                </tr>
            </thead>
        </table>
        <table>
            <tbody>
                <tr>
                    <td class="anchoIgual">' . $tipoP . '</td>
                    <td class="anchoIgual">' . $articuloP . '</td>
                    <td class="anchoIgual">' . $serieP . '</td>
                    <td class="anchoIgual">' . $cantidadP . '</td>
                    <td class="anchoIgual">' . $fechaPrestamoP . '</td>
                </tr>
            </tbody>
         </table>
         <br />
         <br />
         <p><small class="x-small"><b>Queda comprometido a regresar el articulo que se le ha prestado</b></small></p>
         <p><small class="xx-small">Departamente de Sistemas Computacionales</small></p>
         <p><small class="xx-small">Prestamo de Inventario</small></p>
         <p><small class="xx-small">Prestamo de Inventario</small></p>
         <p><small class="xx-small"><strong>Copia del Site</strong></small></p>
     </body>';
    return $html;
}
$plantilla = plantilla($nombre, $noControl, $carrera, $tipo, $articulo, $serie, $cantidad, $fechaPrestamo);
$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($plantilla, \Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->output();