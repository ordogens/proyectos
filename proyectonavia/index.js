let suma = 0;

function fun(x) {
  for (let c = 0; c <= x; c++) {
    // suma += c
    console.log(c);
  }
}
// fun(100)

//Con un for muestre la tabla del 10, 1 hasta llegar a 20

for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    console.log(`${i} * ${j} = ${i * j}`);
  }
  console.log("");
}

//Haga una funcion con un parametro donde la funcion reconozca si el parametro es un numero o string
