<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("location:php/no_inicio_sesion.php");
}
?>
<script src="js/recursos/jquery.min.js"></script>
<script src="js/recursos/bootstrap.min.js"></script>
<!------ Include the above in your HEAD tag ---------->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <title>Sistema PIDS</title>
    <link rel="stylesheet" href="css/recursos/bootstrap.min.css" id="bootstrap-css" />
    <link rel="stylesheet" href="css/recursos/sweetalert2.min.css" />
    <link rel="stylesheet" href="css/recursos/animate.css" />
    <link rel="stylesheet" href="fontawesome/css/all.min.css" />
    <link rel="stylesheet" href="css/recursos/GoogleFonts.css" />
    <link rel="stylesheet" type="text/css" href="dataTables/datatables.min.css" />
    <link rel="stylesheet" href="dataTables/dataTables.bootstrap.css" />
    <link rel="stylesheet" href="dataTables/responsive.bootstrap4.min.css" />
    <link rel="stylesheet" href="css/estilos_panel.css" />
    <link rel="icon" type="image/png" href="img/almacen.png" sizes="64x64" />
</head>

<body>
    <div class="page-wrapper chiller-theme toggled">
        <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <div class="sidebar-brand">
                    <a href="#"><i class="fas fa-code"></i>Sistema <span>PIDS</span></a>
                    <div id="close-sidebar">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="sidebar-header">
                    <div class="display-flex">
                        <div class="user-pic">
                            <img id="avatar-user" class="img-responsive img-rounded"
                                src="<?php echo ($_SESSION['avatar']); ?>" alt="User picture" />
                        </div>
                        <div class="user-info">
                            <p id="id_sesion" hidden="hidden"><?php echo ($_SESSION['id']); ?></p>
                            <span id="datos-sesion" class="user-name"><b>Nombre: </b>
                                <?php echo ($_SESSION['usuario'] . ' ' . $_SESSION['a_paterno'] . ' ' . $_SESSION['a_materno']); ?><strong></strong></span>
                            <span id="privilegios-sesion" class="user-role"><b>Tipo: </b>
                                <?php echo ($_SESSION['privilegios']); ?></span>
                            <!-- <span class="user-status"><i
                                    class="fa fa-circle"></i><span><?php //echo ($_SESSION['estado']); 
                                                                    ?></span></span> -->
                            <span class=""><i class="fas fa-graduation-cap"></i> <span> Departamento De
                                    Sistemas</span></span>
                        </div>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>General</span>
                        </li>
                        <div class="svg-wrapper">
                            <svg height="60" width="248">
                                <rect class="shape1" height="60" width="248" />
                                <rect class="shape2" height="60" width="248" />
                                <li class="item seleccion text">
                                    <a id="home" href="#">
                                        <i class="fas fa-home"></i>
                                        <span>Home</span>
                                    </a>
                                </li>
                            </svg>
                        </div>

                        <li class="sidebar-dropdown">
                            <!--La clase sirve para utilizar un DropMenu-->
                            <a id="site" href="#">
                                <i class="fas fa-desktop"></i>
                                <span>Site</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <div class="svg-wrapper compact-wraper">
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="inventario_site" href="#">Inventario</a>
                                            </li>
                                        </svg>
                                    </div>
                                    <div class="svg-wrapper compact-wraper" compact-wraper>
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="bajas_site" href="#">Bajas de Inventario</a>
                                            </li>
                                        </svg>
                                    </div>
                                    <div class="svg-wrapper compact-wraper" compact-wraper>
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="prestamos_site" href="#">Préstamos</a>
                                            </li>
                                        </svg>
                                    </div>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar-dropdown">
                            <a id="laboratorio" href="#">
                                <i class="far fa-building"></i>
                                <span>Laboratorio</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <div class="svg-wrapper compact-wraper" compact-wraper>
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="inventario_laboratorio" href="#">Inventario</a>
                                            </li>
                                        </svg>
                                    </div>
                                    <div class="svg-wrapper compact-wraper" compact-wraper>
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="bajas_laboratorio" href="#">Bajas Inventario</a>
                                            </li>
                                        </svg>
                                    </div>
                                    <div class="svg-wrapper compact-wraper" compact-wraper>
                                        <svg height="35" width="248">
                                            <rect class="shape1" height="35" width="248" />
                                            <rect class="shape2" height="35" width="248" />
                                            <li class="item compact-text">
                                                <a id="bitacoras_laboratorio" href="#">Bitácoras</a>
                                            </li>
                                        </svg>
                                    </div>
                                </ul>
                            </div>
                        </li>
                        <!--Laboratorios-->
                        <li class="sidebar-dropdown">
                            <a id="reportes" href="#">
                                <i class="far fa-file-alt"></i>
                                <span>Reportes</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li class="item">
                                        <a id="bajas_reportes" href="#">Bajas de inventario</a>
                                    </li>
                                    <li class="item">
                                        <a id="que_prestado_reportes" href="#">¿Qué se ha prestado?</a>
                                    </li>
                                    <li class="item">
                                        <a id="prestamos_alumnos_reportes" href="#">Préstamos a alumnos</a>
                                    </li>
                                    <li class="item">
                                        <a id="prestamos_profesores_reportes" href="#">Préstamos a profesores</a>
                                    </li>
                                    <li class="item">
                                        <a id="bitacoras_reportes" href="#">Reportes de bitácoras</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!--Reportes-->
                        <li class="header-menu">
                            <span>Extra</span>
                        </li>
                        <div class="svg-wrapper">
                            <svg height="60" width="248">
                                <rect class="shape1" height="60" width="248" />
                                <rect class="shape2" height="60" width="248" />
                                <li class="item text">
                                    <a id="administrar_usuarios" href="#">
                                        <i class="fa fa-user"></i>
                                        <span>Administrar Usuarios</span>
                                    </a>
                                </li>
                            </svg>
                        </div>
                        <div class="svg-wrapper">
                            <svg height="60" width="248">
                                <rect class="shape1" height="60" width="248" />
                                <rect class="shape2" height="60" width="248" />
                                <li class="item text">
                                    <a id="cerrar_sesion" href="#">
                                        <i class="fa fa-power-off"></i>
                                        <span>Cerrar Sesión</span>
                                    </a>
                                </li>
                            </svg>
                        </div>
                        <!--Cerrar Sesión-->
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
            <!-- sidebar-content  -->
        </nav>
        <!-- sidebar-wrapper  -->

        <main id="contenedorGlobal" class="page-content">
            <div class="titulo">
                <div class="siglas-titulo">
                    <h2>INSTITUTO TECNOLÓGICO DE <span>PACHUCA</span></h2>
                    <p class="dep_sistemas">Departamento de Sistemas</p>
                </div>
                <div class="logo-titulo">
                    <img src="img/LITP.png" alt="Logos" />
                </div>
            </div>
            <div id="contenido" class="contenido-home">
                <script>
                $(document).on("load", function() {
                    $("#contenido").load("/sistema_PIDS/php/home.php");
                });
                </script>
            </div>
            <!--Contenido Home-->
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <script src="js/recursos/popper.min.js"></script>
    <script type="text/javascript" charset="utf8" src="dataTables/datatables.min.js"></script>
    <script src="js/recursos/jquery.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.js"></script> -->
    <!-- <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.3/js/responsive.bootstrap4.min.js"></script> -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
    <script src="dataTables/jquery.dataTables.min.js"></script>
    <script src="dataTables/dataTables.bootstrap4.min.js"></script>
    <script src="dataTables/dataTables.responsive.min.js"></script>
    <script src="dataTables/responsive.bootstrap4.min.js"></script>
    <script src="js/recursos/sweetalert2.all.min.js"></script>
    <script src="js/funciones.js"></script>
</body>

</html>