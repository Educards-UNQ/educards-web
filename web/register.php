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
    <!-- Main css -->
    <link href="css/registrook.css" rel="stylesheet">
</head>

<body class="text-center">

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

    $cities = '<div class="cover-container d-flex h-100 p-3 mx-auto flex-column">';

    $cities .= '<header class="masthead mb-auto">';
    $cities .= '<div class="inner">';
    $cities .= '<nav class="nav nav-masthead justify-content-center">';
    $cities .= '</nav>';
    $cities .= '</div>';
    $cities .= '</header>';


    if (isset($result['name'])){
        $cities .= '<main role="main" class="inner cover bg-success">';
        $cities .= '<h1 class="cover-heading">Bienvenido '.$result['name'].'</h1>';
        $cities .= '<p class="lead">¡Ya puedes ingresar a la aplicacion y comenzar a divertirte! No esperes mas para pelear por el primer puesto de nuestro Ranking</p>';
        $cities .= '<p class="lead">';
        $cities .= '<a href="https://web-educards-unq.herokuapp.com/" class="btn btn-lg btn-secondary">Ir a Inicio</a>';
        $cities .= '</p>';
        $cities .= '</main>';

        
    }else{
        $cities .= '<main role="main" class="inner cover bg-danger">';
        $cities .= '<h1 class="cover-heading">Lo sentimos '.$_POST['name'].'</h1>';
        $cities .= '<p class="lead">Ocurrio un error, te recomendamos comunicarte con un administrador con el siguiente codigo de error: <br> <div class="alert alert-danger" role="alert">'.$result['errorCode'].'</div></p>';
        $cities .= '<p class="lead">';
        $cities .= '<a href="https://web-educards-unq.herokuapp.com/" class="btn btn-lg btn-secondary">Ir a Inicio</a>';
        $cities .= '</p>';
        $cities .= '</main>';
    }
    $cities .= '</div>';
    print $cities;
?>
    <!-- jQuery and Bootstrap -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="js/script.js"></script>
</body>

</html>