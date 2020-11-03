//GET-> Devolver el array entero

fetch("/almacen") 
    .then(function(respuesta){
        return respuesta.json();
    }).then(function (datos){

        let sillas = "";
        let armarios = "";
        let mesas = "";

        for (let i = 0; i < datos.sillas.length; i++) {
            sillas += `
              <h1>${datos.sillas[i].nombre}</h1>
              <p>Descripción: ${datos.sillas[i].descripcion}</p>
              <p>Precio: ${datos.sillas[i].precio}</p>
              <img src="${datos.sillas[i].img}" alt="" />
           `;
          }

        for (let i = 0; i < datos.armarios.length; i++) {
          armarios += `
                <h1>${datos.armarios[i].nombre}</h1>
                <p>Descripción: ${datos.armarios[i].descripcion}</p>
                <p>Precio: ${datos.armarios[i].precio}</p>
                <img src="${datos.armarios[i].img}" alt="" />
             `;
        }
    
    
        for (let i = 0; i < datos.mesas.length; i++) {
          mesas += `
            <h1>${datos.mesas[i].nombre}</h1>
            <p>Descripción: ${datos.mesas[i].descripcion}</p>
            <p>Precio: ${datos.mesas[i].precio}</p>
            <img src="${datos.mesas[i].img}" alt="" />
         `;
        }
        document.getElementById("div1").innerHTML = sillas + armarios + mesas;
      });
    

// GET-> Buscar por tipo de producto

function buscar() {
  let seccion = document.getElementById("seccion").value;
  fetch(`/almacen/${seccion}`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        window.alert(datos.mensaje);
      } else {
        let productos = "";
        for (let i = 0; i < datos.length; i++) {
          productos += `
            <h1>${datos[i].nombre}</h1>
            <p>Descripción: ${datos[i].descripcion}</p>
            <p>Precio: ${datos[i].precio}</p>
            <img src="${datos[i].img}" alt="" />
            `;
        }
        document.getElementById("div1").innerHTML = productos;
      }
    });
}



 //POST ->Añadir un producto

function anyadir(){

    

    let nombre= document.getElementById("nombre").value;
    let descripcion= document.getElementById("descripcion").value;
    let img= document.getElementById("img").value;
    let precio= document.getElementById("precio").value;
    let seccion=document.getElementById("seccion").value;
    

    let producto ={ nombre:nombre,
        descripcion:descripcion,
        img:img,
        precio:precio,
        seccion:seccion,

};

fetch("/almacen/anyadir.html",{

    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(producto),
})

.then(function(respuesta){
return respuesta.json(); 

})
.then(function (datos){
let sillas = "";
let armarios = "";
let mesas = "";

for (let i = 0; i < datos.sillas.length; i++) {
  sillas += `
    <h1>${datos.sillas[i].nombre}</h1>
    <p>Descripción: ${datos.sillas[i].descripcion}</p>
    <p>Precio: ${datos.sillas[i].precio}</p>
    <img src="${datos.sillas[i].img}" alt="" />
 `;
}
for (let i = 0; i < datos.armarios.length; i++) {
    armarios += `
          <h1>${datos.armarios[i].nombre}</h1>
          <p>Descripción: ${datos.armarios[i].descripcion}</p>
          <p>Precio: ${datos.armarios[i].precio}</p>
          <img src="${datos.armarios[i].img}" alt="" />
       `;
  }

for (let i = 0; i < datos.mesas.length; i++) {
  mesas += `
    <h1>${datos.mesas[i].nombre}</h1>
    <p>Descripción: ${datos.mesas[i].descripcion}</p>
    <p>Precio: ${datos.mesas[i].precio}</p>
    <img src="${datos.mesas[i].img}" alt="" />
 `;
}
document.getElementById("div1").innerHTML = sillas + armarios + mesas;

})


}


//PUT -> Modificar un producto

let seccion="armarios";

  function manageChange(event) {
    console.log(event.target.value);
    seccion = event.target.value;
  }

function editar(){
  let referencia= document.getElementById("referencia").value;
  let nombre= document.getElementById("nuevoNombre").value;
  let img= document.getElementById("nuevaImg").value;
  let descripcion= document.getElementById("nuevaDescripcion").value;
  let precio= document.getElementById("nuevoPrecio").value;

  let producto={
      seccion:seccion,
      referencia:referencia,
      nombre:nombre,
      img:img,
      descripcion:descripcion,
      precio:precio,

  };

  fetch("/almacen",{

    method:"PUT",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(producto),
})

.then(function(res){

    return res.json();
}

).then(function (datos){

    let sillas = "";
    let armarios = "";
    let mesas = "";
   
    for (let i = 0; i < datos.sillas.length; i++) {
      sillas += `
        <h1>${datos.sillas[i].nombre}</h1>
        <p>Descripción: ${datos.sillas[i].descripcion}</p>
        <p>Precio: ${datos.sillas[i].precio}</p>
        <img src="${datos.sillas[i].img}" alt="" />
     `;
    }
   
    for (let i = 0; i < datos.armarios.length; i++) {
      armarios += `
            <h1>${datos.armarios[i].nombre}</h1>
            <p>Descripción: ${datos.armarios[i].descripcion}</p>
            <p>Precio: ${datos.armarios[i].precio}</p>
            <img src="${datos.armarios[i].img}" alt="" />
         `;
    }
  

    for (let i = 0; i < datos.mesas.length; i++) {
      mesas += `
        <h1>${datos.mesas[i].nombre}</h1>
        <p>Descripción: ${datos.mesas[i].descripcion}</p>
        <p>Precio: ${datos.mesas[i].precio}</p>
        <img src="${datos.mesas[i].img}" alt="" />
     `;
    }
    document.getElementById("div1").innerHTML = sillas + armarios + mesas;

}
)

}


//DELETE-> Borrar un producto


function borrar(){

  let nombre= document.getElementById("referencia").value;


let producto={

  seccion:seccion,
  nombre:nombre,
}


fetch("/almacen", {

  method:"DELETE",
  headers:{
      "Content-Type":"application/json",
  },
  body:JSON.stringify(producto),

    
}).then(function (res){

  return res.json();
}).then(function (datos){

  let sillas = "";
  let armarios = "";
   let mesas = "";
  
  for (let i = 0; i < datos.sillas.length; i++) {
    sillas += `
      <h1>${datos.sillas[i].nombre}</h1>
      <p>Descripción: ${datos.sillas[i].descripcion}</p>
      <p>Precio: ${datos.sillas[i].precio}</p>
      <img src="${datos.sillas[i].img}" alt="" />
   `;
  }
  
  for (let i = 0; i < datos.armarios.length; i++) {
    armarios += `
          <h1>${datos.armarios[i].nombre}</h1>
          <p>Descripción: ${datos.armarios[i].descripcion}</p>
          <p>Precio: ${datos.armarios[i].precio}</p>
          <img src="${datos.armarios[i].img}" alt="" />
       `;
  }


  for (let i = 0; i < datos.mesas.length; i++) {
    mesas += `
      <h1>${datos.mesas[i].nombre}</h1>
      <p>Descripción: ${datos.mesas[i].descripcion}</p>
      <p>Precio: ${datos.mesas[i].precio}</p>
      <img src="${datos.mesas[i].img}" alt="" />
   `;
  }
  document.getElementById("div1").innerHTML = sillas + armarios + mesas;
})
}


   