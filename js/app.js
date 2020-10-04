import { templPaises_Provincias } from '../templates/paises_provincias.js'

function main (){

    const storeUsers = 'usuarios'

    const btnLog = document.querySelector('#b_login')
    if(btnLog){
        btnLog.addEventListener('click', onClickLog)
    }

    const btnReg = document.querySelector('#b_registrar')

    if(btnReg){
        btnReg.addEventListener('click', onClickReg)
    }

    const radioBtnEspa = document.querySelector('#español')
    const radioBtnExtra = document.querySelector('#extranjero')

    if(radioBtnEspa){
        radioBtnEspa.addEventListener('click', () => {
            onClickNacionalidad(radioBtnEspa.id)
        })
    }

    if(radioBtnExtra){
        radioBtnExtra.addEventListener('click', () => {
            onClickNacionalidad(radioBtnExtra.id)
        })
    }

    function onClickNacionalidad (nacionalidad) {
        const form = document.querySelector('#f_registro')
        form.querySelector('#pais_provincia').innerHTML = templPaises_Provincias.render(nacionalidad)
    }

    function onClickReg(){
        const formReg = document.querySelector('#f_registro')
        const inputs = [...formReg.querySelectorAll('input')]
        // const usuario = {
        //     nombre : inputs[0].value,
        //     apellido : inputs[1].value,
        //     male : inputs[2].value,
        //     female: inputs[3].value,
        //     extran: inputs[4].value,
        //     espa: inputs[5].value,
        //     pais_provicia: inputs[6].value,
        //     movil: inputs[7].value,
        //     mail: inputs[8].value,
        //     usuario: inputs[9].value,
        //     pwd: inputs[10].value,
        //     terminos: inputs[11].value
        // }
        console.log(inputs)

        // const users = window.localStorage.getItem(storeUsers) ?
        // JSON.parse(window.localStorage.getItem(storeUsers)) : []
        // users.push(usuario)
        
        // window.localStorage.setItem(storeUsers, JSON.stringify(users))
        // inputs.forEach(item => item.value = '')
        validarInputs(formReg)
        validarRadioBtn()
        validarTerminos()
    }

    function onClickLog(){

    }

    function validarInputs(form){
        const inputs = [...form.querySelectorAll('input, select')]
        console.log(inputs)
        inputs.forEach((item)=>{console.log(item.value)})
        try {
            inputs.forEach((item)=> {
                if(!item.value){
                    const error = new Error(`Campo ${item.id} invalido`)
                    error.code = item.id
                    throw error
                }
            })
            return true
        
        } catch(error) {
            console.log(error.message)
            console.log(error.code)
            return false
        }
    }

    function validarRadioBtn(){
        const form = document.querySelector('#f_radiobtn')
        const radioInputs = [...form.querySelectorAll('input')]
        console.log(radioInputs)
        try {
            if(radioInputs[0].checked === false && radioInputs[1].checked === false){
                const error = new Error(`Campos ${radioInputs[0].id} y ${radioInputs[1].id} vacios`)
                error.code = radioInputs[0].id
                throw error
            }
            return true
        
        } catch(error) {
            console.log(error.message)
            console.log(error.code)
            return false
        }
    }

    function validarTerminos(){
        const form = document.querySelector('#f_terminos')
        const checkInput = [...form.querySelectorAll('input')]
        console.log(checkInput)
        try {
            if(checkInput[0].checked === false ){
                const error = new Error(`Campos ${checkInput[0].id} vacios`)
                error.code = checkInput[0].id
                throw error
            }
            return true
        
        } catch(error) {
            console.log(error.message)
            console.log(error.code)
            return false
        }
    }
}

document.addEventListener('DOMContentLoaded', main)