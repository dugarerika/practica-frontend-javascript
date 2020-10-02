import { templPaises_Provincias } from '../templates/paises_provincias.js'

function main (){


    const radioBtnEspa = document.querySelector('#español')
    const radioBtnExtra = document.querySelector('#extranjero')


    if(radioBtnEspa){
        radioBtnEspa.addEventListener('click', () => {
            onClickNacionalidad(radioBtnEspa.value)
        })
    }

    if(radioBtnExtra){
        radioBtnExtra.addEventListener('click', () => {
            onClickNacionalidad(radioBtnExtra.value)
        })
    }

    function onClickNacionalidad (nacionalidad) {
        const form = document.querySelector('#f_registro')
        console.log('form')
        form.querySelector('#paises').innerHTML = templPaises_Provincias.render(nacionalidad)
    }
}

document.addEventListener('DOMContentLoaded', main)