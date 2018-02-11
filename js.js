new function (){
  console.time();
  var ts = this,
    ancho = 15,
    alto = 15,
    porcentaje = 0.5,
    cuadrador,
    tabla = [];
    celdas = [];
  var element = newNode("table", ((a = document.getElementById("game"))?a: null));


  function generarTabla(){
    newTable(element, ancho+1, alto+1, function(r, x, y){
      if(!tabla[x]){tabla[x] = [];}
      tabla[x][y] = new Cell(ts, r, x, y);
      if(x != 0 && y != 0){
        celdas.push(tabla[x][y]);
      }
    });
  }
  function generarPuntos(){
    var cantidad = ancho*alto*porcentaje,
    hechos = 0;

    var tx,ty;
    for(var hechos = 0; hechos < cantidad; ++hechos){
      celdas.splice(Math.floor(Math.random()*celdas.length), 1)[0].setPunto();
    }
  }
  function generarCabezeras(){
    var x, y, arr = [], cuenta = 0;
    for(x = 1; x < ancho+1; ++x){
      for(y = 1; y < alto+1; ++y){
        if(tabla[x][y].isPunto()){
            ++cuenta;
        }else{
          if(cuenta){
            arr.push(cuenta);
            cuenta = 0;
          }
        }
      }
      if(cuenta){arr.push(cuenta)};
      cuenta = 0;
      tabla[x][0].setCuenta(arr);
      arr = [];
    }

    var x, y, arr = [], cuenta = 0;
    for(y = 1; y < alto+1; ++y){
      for(x = 1; x < ancho+1; ++x){
        if(tabla[x][y].isPunto()){
            ++cuenta;
        }else{
          if(cuenta){
            arr.push(cuenta);
            cuenta = 0;
          }
        }
      }
      if(cuenta){arr.push(cuenta)};
      cuenta = 0;
      tabla[0][y].setCuenta(arr);
      arr = [];
    }
  }
  function Cell(tsp, p, x, y){
    var ts = this,
      tsp = tsp,
      x = x,
      y = y,
      node = (x == 0 || y == 0)?"th":"td",
      punto = false,
      cuenta = [];
    var td = newNode(node, p);
    this.setPunto = function(){punto = true; td.style.backgroundColor = "#000";};
    this.isPunto = function(){return punto;};
    this.setCuenta = function(c){
      cuenta = c;
      td.innerHTML = cuenta.join((x == 0)?"</br>":",");
    };
  }
  function init(){
    generarTabla();
    generarPuntos();
    generarCabezeras();
    console.timeEnd();
  }
  init();
}
