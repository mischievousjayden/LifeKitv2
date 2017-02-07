define(DB_HOST, "127.0.0.1");
        define(DB_USER, "root");
        define(DB_PASSWORD, "48384d4e34Fgonehome!pz3vex");
        define(DB_DATABASE, "LifeKit");
         $con = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

        if (mysqli_connect_errno())
                                  {
                                  print "<br>Failed to connect to MySQL: <br>" . mysqli_connect_error();
                                  }
                                else {

                                }
?>