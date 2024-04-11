// console.log("Conectado");

/*
    {
        piso: 5,
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },


*/

// Variables globales

// Lista de objetos
let puntosEcologicos = [

    {
        piso: "3", // Lo ponemos en string por que en el select va a estar en string
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },

    {
        piso: "4",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },

    {
        piso: "5",
        no_aprovechables: 0,
        organicos: 0,
        aprovechables: 0
    },
];

let tipoCanecaAgregar;

// Selectores
const selectPiso = document.getElementById("select_floor");
const canecas = document.querySelectorAll(".bowl");
const btnAgregar = document.getElementById("btnSubmit");
const body = document.querySelector('body');

// Eventos y escuchadores de eventos 

document.addEventListener("DOMContentLoaded", () => {

    puntosEcologicos = JSON.parse(localStorage.getItem('canecasFull'));   
    pintarPuntoEcologico();
    cambiarFondo();
});

selectPiso.addEventListener("input", () => {
    pintarPuntoEcologico();
    cambiarFondo();
})

btnAgregar.addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cantidad").value);
    

    // Agregar la cantidad de desechos en su respectivo punto ecologiaco

    // 1. Recorrer la lista de puntos ecologicos
    puntosEcologicos.forEach(punto => {
        // 1.2 Encontrar el piso al que el usuario agrego la basura
        if (punto.piso == selectPiso.value) 
        {
            if(cantidad > 500)
            {
                alert('No cabe la basura!!');
                document.getElementById("cantidad").value = 0;
                return;
            }
            // 1.3 SUmar los desechos que estaban + los nuevos
            // 1. aprovechables
            // 2. no_aprovechables
            // 3. organicos
            punto[tipoCanecaAgregar] += parseInt(cantidad);
        }
    });
    
    pintarPuntoEcologico();
});

// Recorremos la lista de canecas 
canecas.forEach(caneca => {
    caneca.addEventListener("click", () => {
        // 1 .Abrir el Modal
        document.getElementById("btnOpenModal").click();
        // 2. Obtener el atributo personalizado
        // console.log("Diste click en una caneca");

        tipoCanecaAgregar = caneca.getAttribute("type-bowl")
        // console.log(tipoCanecaAgregar);
    });
});

// Funciones

function pintarPuntoEcologico() 
{
    const contadorHtml = document.querySelectorAll('.bowl .body_top span');

    // 1. Recorrer la lista de puntos ecologicos
    puntosEcologicos.forEach(caneca => 
    {
        // 1.2 Preguntar si el piso que se esta iterando es igual al seleccionado
        if(caneca.piso === selectPiso.value) 
        {   
            contadorHtml[0].textContent = caneca.aprovechables;
            contadorHtml[1].textContent = caneca.organicos;
            contadorHtml[2].textContent = caneca.no_aprovechables;

            // 1.3 Seleccionar los contadores de cada caneca y asignar nuevo valor
            if(tipoCanecaAgregar === 'aprovechables' || contadorHtml[0].value === 0 )
            {
                contadorHtml[0].textContent = caneca.aprovechables;
                promedios();
                cambiarFondo();
            }
            else if(tipoCanecaAgregar === 'organicos' || contadorHtml[1].value === 0 )
            {
                contadorHtml[1].textContent = caneca.organicos;
                promedios();
                cambiarFondo();
            }
            else if(tipoCanecaAgregar === 'no_aprovechables' || contadorHtml[2].value === 0 )
            {
                contadorHtml[2].textContent = caneca.no_aprovechables;
                promedios();
                cambiarFondo();
            } 
        }
    });

    localStorage.setItem('canecasFull',JSON.stringify(puntosEcologicos));
};

// 1.4 Sacar el promedio del punto ecologico 
function promedios()
{   
    let suma = 0;
    let promedio = 0;

    puntosEcologicos.forEach(caneca =>
    {
        if(caneca.piso === selectPiso.value)
        {
            let {aprovechables, organicos, no_aprovechables} = caneca;
            suma += (aprovechables + organicos + no_aprovechables);
            
            promedio = (suma/500) * 100; 
        }
    })  

    return promedio;
}

//cambiar fondo
function cambiarFondo()
{
    const body = document.querySelector('body');
    const promedio = promedios();

    if(promedio < 25)
    {
        //rojo y 'Estado: No amigo del ambiente'
        body.style.backgroundColor = 'red';
        alert('Estado: No amigo del ambiente');
    }
    else if(promedio >= 25 && promedio <= 50)
    {
        //naranja: 'Estado: Normal'
        body.style.backgroundColor = 'orange';
        alert('Estado: Normal');
    }
    else if(promedio > 50)
    {
        //verde: 'Estado: Amigable con el medio ambiente'
        body.style.backgroundColor = 'green';
        alert('Estado: Amigable con el medio ambiente');
    }
}

    


