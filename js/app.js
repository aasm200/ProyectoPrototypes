//variables


//constructor 
function Seguro (marca , year ,tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
    
}
//realiza cotizacion con los datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
        let cantidad;
        const base = 2000;
    // marca
        switch(this.marca) {
            case "1":
            cantidad = base *1.15;
            break;

            case "2":
                cantidad = base *1.05;
            break;

            case "3":
                cantidad = base *1.45;
            break;
            
            default:
            break;
        }
    // leer año
    const diferencia = new Date().getFullYear() - this.year;

    //cada año que la diferencia es mayor va disminuir el costo 
     cantidad -= ((diferencia*3)*cantidad)/100;   

        /* 
            Si el seguro es basico se * 30% mas
            Si el seguro es completo se * 50% mas
        */

    //leer tipo

    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

     return cantidad;
}

function UI(){}

//llena opciones de años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max-20;
    const selectYear = document.querySelector('#year');
    for( let i = max; i > min ; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarMensaje = (mensaje , tipo) => {
    
    borrarMensaje();
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total,seguro)=>{
    
    const {marca ,year ,tipo} = seguro;
    
     let textoMarca;

    switch (marca) {
        case "1":
            textoMarca = "Americano";
            break;
        case "2":
            textoMarca = "Asiatico";
            break;
        case "3":
            textoMarca = "Europeo";
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');
    
    div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
    <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </span></p>
    <p class="font-bold">Total: <span class="font-normal"> $${total} </span></p>
    `;
    
    const resultadoDiv = document.querySelector('#resultado');
    
    //mostrar spinner
    
    const spinner = document.querySelector('#cargando');
    spinner.style.display = "block";
    
    setTimeout(() => {
        spinner.style.display = "none"; // se borra el spinner pero se muestra el resultado
        resultadoDiv.appendChild(div); // resultado
    }, 3000);

}

//instanciar UI
const ui = new UI(); 

document.addEventListener('DOMContentLoaded', ()=> {
    ui.llenarOpciones(); //llamas tu funcion con la constante donde instanciaste ,ui Y no UI 

});

eventListener();
function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();
    //Leer marca
    const marca = document.querySelector('#marca').value;

    //leer año
    const year = document.querySelector('#year').value;
    
    //leer tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // selector especifico de css nos ayuda a saber el valor de los Radio Buttons
     
    if(marca === '' || year === '' || tipo === '') {
       
        ui.mostrarMensaje('Revisa tus Campos toda la informacion es obligatoria','error');
        return;
    } 

    ui.mostrarMensaje('Cotizando','exito');

    //ocultar cotizacion previa

    const resultados = document.querySelector('#resultado div');
    if(resultados !== null ) {
        resultados.remove();
    }

    //instanciar el seguro
    const seguro = new Seguro(marca,year,tipo);
    //utilizar prototype que va a cotizar
    const total = seguro.cotizarSeguro();

    //mostrar resultados en UI

    ui.mostrarResultado(total,seguro);
}

function borrarMensaje() {
    const mensaje = document.querySelector('.mensaje');
    if(mensaje !== null){
        mensaje.remove();
    }
}



