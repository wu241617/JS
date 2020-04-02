<?php
   $user = $_POST["user"];
   $password = $_POST["password"];
   
   if($user == "wuhao" && $password = "05241617"){
	   echo '{"result":true}';
   }else{
	   echo '{"result":false}';
   }
?>