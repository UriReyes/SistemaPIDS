<?php

session_start();
if (isset($_SESSION['usuario'])) {
    header("location:panel_control.php");
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

    <title>َIniciar Sesión</title>
    <link rel="stylesheet" href="fontawesome/css/all.min.css" />
    <link href="css/recursos/GoogleFonts.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/login.css" />
    <link rel="icon" type="image/png" href="img/almacen.png" sizes="64x64" />
</head>

<body>
    <img class="wave" src="img/wave.svg" alt="" />
    <div class="container">
        <div class="img">
            <img src="img/LITP.png" alt="Background" />
        </div>
        <div class="login-container">
            <form class="formularioStyle" method="POST">
                <img class="avatar" src="img/envio-y-entrega.png" alt="Perfil" />
                <h2 class="txt-login">Inicio de Sesión</h2>
                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h5>Usuario</h5>
                        <input class="input" type="text" name="usuario" id="usuario" />
                    </div>
                </div>
                <div class="input-div two">
                    <div class="i">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div>
                        <h5>Contraseña</h5>
                        <input class="input" type="password" name="password" id="password" />
                    </div>
                </div>
                <a id="recuperarPassword" href="php/usuarios/recuperarPassword.html" target="_blank">Olvidó su
                    contraseña</a>
                <div id="errores-login" class="errores-login">
                    <p id="error-login"></p>
                    <a id="cerrar-error" href="">X</a>
                </div>
                <input type="submit" name="login" value="Ingresar" id="login" class="btn" />

            </form>

        </div>
    </div>
    <script src="js/recursos/jquery.min.js"></script>
    <script src="js/recursos/popper.min.js"></script>
    <script src="js/funciones_login.js"></script>
</body>

</html>