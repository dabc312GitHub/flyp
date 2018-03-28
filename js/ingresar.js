function perfil_usuario(datos_de_usuario){
  $("#perfil").css("display" , "block");
  $("#perfil").empty();
  if(datos_de_usuario.nombre === '' || datos_de_usuario.apellido === '' || datos_de_usuario.src_foto_de_perfil === '' || datos_de_usuario.musica_favorita === ''){
    $("#perfil").append('parece que necesitas actualizar tu información base de datos no  <br>');
  }
  $("#perfil").append('<ul>' + 
  '<li> <img src="'+ datos_de_usuario.src_foto_de_perfil + '" width="200" height="200"/> </li>' + 
  '<li>' + 'Nombre: ' + datos_de_usuario.nombre + '</li>' + 
  '<li>' + 'Apellido: ' + datos_de_usuario.apellido + '</li>' 
  + '</ul>');
  
  $("#perfil").append('<br> Hobbies: <br>');
  for(let hobbie of datos_de_usuario.hobbies){
    $("#perfil").append('<br>' + hobbie);
  }
  $("#perfil").append("<br><a href='usuarios.html'>explorar</a>");
}

  $("#ingresoFormulario").submit(function (event){
    event.preventDefault();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../data/usuarios.json", true);
    var usuarios;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            usuarios = JSON.parse(this.responseText);
            let puede_ingresar = false;
            let indice_usuario = 0;
             for(let i of usuarios['usuarios']){
              if(i.usuario == ingresoFormulario.usuario.value && i.contra == ingresoFormulario.contra.value){
                puede_ingresar = !puede_ingresar;
                break;
              }
              indice_usuario++;
            }
            if(puede_ingresar){
              $("#ingresoFormulario").css("visibility" , "hidden");
              perfil_usuario(usuarios.usuarios[indice_usuario]);
            }
            else{
              $("#ingresoFormulario input[name=usuario]").val('');
              $("#ingresoFormulario input[name=contra]").val('');
              $("#errors").html('usuario no registrado, vuelve a intertarlo o  ' + '<a href="registrar.html">registrate</a>');
            }
        }
    }
    xmlhttp.send()
  });
