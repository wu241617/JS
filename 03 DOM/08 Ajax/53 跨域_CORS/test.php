<?php
   $person =array("name"=>"wuhao","age"=>23);
   
   header("Access-Control-Allow-Origin: *");
   
   echo json_encode($person);
?>