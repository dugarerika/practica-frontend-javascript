import { templPaises_Provincias } from '../templates/paises_provincias.js'
import { templHeader } from '../templates/header.js'

function main() {

    const posicion = window.location.pathname.lastIndexOf('/') + 1
    const page = window.location.pathname.slice(posicion)
    document.querySelector('header').innerHTML = templHeader.render(page)


    const storeUsers = 'usuarios'
    // Nodos del DOM
    const form = document.querySelector('#f_registro')

    // Definicion de manejadores de eventos
    form.addEventListener('submit', sendData)
    nacionalidad.addEventListener('change', selectPaises_Provincias)

    // Funciones manejadoras
    function sendData(ev){
        const data = {}
        ev.preventDefault()

        const nombre = form.querySelector('input#i_nombre')
        const apellido = form.querySelector('input#i_apellido')
        const aGenero = [...form.querySelectorAll('[name="gender"]')]
        const movil = form.querySelector('input#i_movil')
        const mail = form.querySelector('input#i_mail')
        const usuario = form.querySelector('input#i_usuario')
        const pwd = form.querySelector('input#i_pwd')
        const conf_pwd = form.querySelector('input#i_conf_pwd')
        const nacionalidad = form.querySelector('select#nacionalidad')
        const pais_provincia = form.querySelector('#pais_provincia')
        const api_key = form.querySelector('input#i_api_key')
        const terminos = form.querySelector('input#terminos')
        const comentarios = form.querySelector('#comentarios')
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