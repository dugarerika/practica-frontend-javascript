import { templPaises_Provincias } from '../templates/paises_provincias.js'
import { templHeader } from '../templates/header.js'
import { templFooter } from '../templates/footer.js'

function main() {

    // Encabezado
    const posicion = window.location.pathname.lastIndexOf('/') + 1
    const page = window.location.pathname.slice(posicion)
    document.querySelector('header').innerHTML = templHeader.render(page)

    // Footer
    document.querySelector('footer').innerHTML= templFooter.render()


    const storeUsers = 'usuarios'
    // Nodos del DOM
    // Formularios
    const formRegistro = document.querySelector('#f_registro')
    const formLogin = document.querySelector('#f_login') 

    // Botones
    const btnAcceder = document.querySelector('#b_acceder')

    // Definicion de manejadores de eventos
    formRegistro.addEventListener('submit', sendData)
    nacionalidad.addEventListener('change', selectPaises_Provincias)

    // Funciones manejadoras
    function sendData(ev){
        const data = {}
        ev.preventDefault()

        const nombre = formRegistro.querySelector('input#i_nombre')
        const apellido = formRegistro.querySelector('input#i_apellido')
        const aGenero = [...formRegistro.querySelectorAll('[name="gender"]')]
        const movil = formRegistro.querySelector('input#i_movil')
        const mail = formRegistro.querySelector('input#i_mail')
        const usuario = formRegistro.querySelector('input#i_usuario')
        const pwd = formRegistro.querySelector('input#i_pwd')
        const conf_pwd = formRegistro.querySelector('input#i_conf_pwd')
        const nacionalidad = formRegistro.querySelector('select#nacionalidad')
        const pais_provincia = formRegistro.querySelector('#pais_provincia')
        const api_key = formRegistro.querySelector('input#i_api_key')
        const terminos = formRegistro.querySelector('input#terminos')
        const comentarios = formRegistro.querySelector('#comentarios')
        data.nombre = nombre.value
        data.apellido = apellido.value
        data.genero = aGenero.filter(item => item.checked)[0].value
        data.nacionalidad = nacionalidad.value
        data.pais_provincia = pais_provincia.value
        data.movil = movil.value
        data.mail = mail.value
        data.usuario = usuario.value
        data.pwd = pwd.value
        data.conf_pwd = conf_pwd.value
        data.api_key = api_key.value
        data.terminos = terminos.checked
        data.comentarios = comentarios.value
        console.dir(data)
        console.log('Obteniendo Datos', data)
        console.log('Enviando')
        registrar(data)
    }

    function selectPaises_Provincias() {
        // console.dir(nacionalidad.selectedIndex)
        if(nacionalidad.selectedIndex) {
        pais_provincia.innerHTML = templPaises_Provincias.render(nacionalidad.value)
        pais_provincia.parentElement.classList.remove('nodisplay')
        } else {
            pais_provincia.parentElement.classList.add('nodisplay')
        }
    }

    function registrar(data) {
        const users = window.localStorage.getItem(storeUsers)?
        JSON.parse(window.localStorage.getItem(storeUsers)) : []
        users.push(data)
        window.localStorage.setItem(storeUsers, JSON.stringify(users))
    }

    function validarUsuario(){

    }

}

document.addEventListener('DOMContentLoaded', main)