<!doctype html>
<html lang="es">

<head>
    <title>Educards UNQ</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Educards, un juego para aprender jugando. ¡No esperes un minuto mas y descargalo ya!">
    <meta name="keywords" content="HTML5, bootstrap, mobile, app, landing, android, responsive, educards, unq,">

    <!-- Font -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500" rel="stylesheet">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="images/educards_logo.png" />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Themify Icons -->
    <link rel="stylesheet" href="css/themify-icons.css">
    <!-- Owl carousel -->
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <!-- Main css -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body data-spy="scroll" data-target="#navbar" data-offset="30">

<?php /*
    $postdata = http_build_query(
        array(
            'name' => $_GET['name'],
            'year' => $_GET['year'],
            'image' => 'default.png',
            'password' => $_GET['password'],
        )
    );

    $opts = array('http' =>
        array(
            'ignore_errors'=>true,
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata,
            'body' => $postdata
        )
    );

    $context  = stream_context_create($opts);

    $result = file_get_contents('https://educards-unq.herokuapp.com/api/players', false, $context);*/


    //API URL
    $url = 'https://educards-unq.herokuapp.com/api/players';

    //create a new cURL resource
    $ch = curl_init($url);

    //setup request to send json via POST
    $data = array(
        'name' => $_POST['name'],
        'age' => (int) $_POST['year'],
        'image' => 'default.png',
        'password' => $_POST['password'],
    );
    $payload = json_encode($data);

    //attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    //set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

    //return response instead of outputting
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    //execute the POST request
    $result = json_decode(curl_exec($ch), true);

    //close cURL resource
    curl_close($ch);

    $cities = '<div class="nav-menu fixed-top">';
    $cities .= '<div class="container">';
    $cities .= '<div class="row">';
    $cities .= '<div class="col-md-12">';
    $cities .= '<nav class="navbar navbar-dark navbar-expand-lg">';
    $cities .= '<a class="navbar-brand" href="index.php"><img src="images/educards_logo.png" class="img-fluid" alt="logo" style="max-height: 50px;" /> EduCards UNQ</a>';
    $cities .= '<div class="collapse navbar-collapse" id="navbar">';
    $cities .= '<ul class="navbar-nav ml-auto"></ul>';
    $cities .= '</div></nav></div></div></div></div>';
    $cities .= '<header class="bg-gradient" id="home">';
    $cities .= '<div class="container mt-5">';


    if (isset($result['name'])){
        $cities .= '<h1>Bienvenido '.$result['name'].'</h1>';
        $cities .= '<p class="tagline">¡Ya puedes ingresar a la aplicacion y comenzar a divertirte! No esperes mas para pelear por el primer puesto de nuestro Ranking</p>';
        $cities .= '<p class="tagline"><br />';
        $cities .= '<a href="https://web-educards-unq.herokuapp.com/" class="btn btn-lg btn-primary">Ir a Inicio</a></p>'; 
    }else{
        $cities .= '<h1>Lo sentimos '.$_POST['name'].'</h1>';
        $cities .= '<p class="tagline">Ocurrio un error, te recomendamos comunicarte con un administrador con el siguiente codigo de error: <br /> <br /> <div class="alert alert-danger" role="alert">'.$result['errorCode'].'</div></p>';
        $cities .= '<p class="tagline"><br />';
        $cities .= '<a href="https://web-educards-unq.herokuapp.com/" class="btn btn-lg btn-primary">Ir a Inicio</a></p>';
    }
    $cities .= '</div>';
    $cities .= '<div class="img-holder mt-3"><img src="images/iphonex.png" alt="phone" class="img-fluid"></div>';
    $cities .= '</header>';
    print $cities;
?>
    <footer class="my-5 text-center">
        <!-- Copyright removal is not prohibited! -->
        <p class="mb-2"><small>COPYRIGHT © 2018. ALL RIGHTS RESERVED. EDUCARDS TEMPLATE BY <a href="#">LYNX SOFTWARE DESIGN</a></small></p>

        <small>
            <a href="https://github.com/Educards-UNQ/" class="m-2">GITHUB</a>
        </small>
    </footer>

    <!-- jQuery and Bootstrap -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <!-- Plugins JS -->
    <script src="js/owl.carousel.min.js"></script>
    <!-- Custom JS -->
    <script src="js/script.js"></script>
</body>

</html>