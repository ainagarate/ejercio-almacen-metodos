const express = require("express");
const almacen = require("./almacen");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//ruta GET que devuelve el array entero

app.get("/almacen", function (req, res){
    res.send(almacen);
});

//ruta GET que devuelve los objetos de una sección de almacén


app.get("/almacen/:seccion", function(req, res){

  let tipo= req.params.seccion;

  if (almacen[tipo] !== undefined) {
    res.send(almacen[tipo]);
  } else {
    let respuesta = {
      error: true,
      mensaje: "Esa sección no existe",
    };
    res.send(respuesta);
  }
});


//ruta POST que añade un objeto

app.post("/almacen/anyadir.html", function(req, res){
    let seccion = req.body.seccion;
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let descripcion = req.body.descripcion;
    let img = req.body.img;
    let producto = {
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      img: img,
    };
  
    if (almacen[seccion] !== undefined) {
      almacen[seccion].push(producto);
      res.send(almacen);
    } else {
      res.send("error");
    }
  });


  //ruta PUT modifica un objeto
  app.put("/almacen", function (req, res) {
    let nombre = req.body.nombre;
    let seccion = req.body.seccion;
    let referencia = req.body.referencia;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let imagen = req.body.img;
  
    let boolean = false;
    if (almacen[seccion] !== undefined) {
      for (let i = 0; i < almacen[seccion].length; i++) {
        if (referencia === almacen[seccion][i].nombre) {
          almacen[seccion][i].nombre = nombre;
          almacen[seccion][i].precio = precio;
          almacen[seccion][i].descripcion = descripcion;
          almacen[seccion][i].img = imagen;
          boolean = true;
        }
      }
    }
    if (boolean) {
      res.send(almacen);
    } else {
      res.send({ mensaje: "error" });
    }
  });

  //ruta DELETE que borra un producto
  app.delete("/almacen", function (req, res) {
    let seccion = req.body.seccion;
    let nombre = req.body.nombre;
    let boolean = false;
    for (let i = 0; i < almacen[seccion].length; i++) {
      if (almacen[seccion][i].nombre === nombre) {
        almacen[seccion].splice(i, 1);
        boolean = true;
      }
    }
  
    boolean ? res.send(almacen) : res.send({ mensaje: "error" });
  });







app.listen(3000);