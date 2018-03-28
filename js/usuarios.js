$(document).ready(function (){
  
  function mostrar_usuarios(data){
    for(let i of data.usuarios){
      let usuario = JSON.stringify(i);
      $("#usuarios").append("<tr>" + 
      "<td><p id='semilink' onclick='mostrar_perfil("+ usuario +")'>" + i.nombre  + "</p></td>" + 
        "<td>" + i.apellido  + "</td>" + 
        "<td> <img src='" + i.src_foto_de_perfil  + "' width='100' height='100'/></td>"
        + "</tr>");
    }
  }
  
  
  function mostrar_perfil(usuario){
    $("#usuarios").css("display" , "none");
    perfil_usuario(usuario);
  }
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "../data/usuarios.json", true);
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      mostrar_usuarios(data);
      
    }
    
  }
  
  xmlhttp.send();
    
  $("img").hover(function (){
    $(this).css({
      "width" : "150",
      "height" : "150"
    }) },
    function (){
      $(this).css({
      "width" : "100",
      "height" : "100"
      });
    });
  
});