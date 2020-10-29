import { templPaises_Provincias } from '../templates/paises_provincias.js'
import { templHeader } from '../templates/header.js'
import { templFooter } from '../templates/footer.js'

function main() {

    // Encabezado
    var contador = 0
    const posicion = window.location.pathname.lastIndexOf('/') + 1
    const page = window.location.pathname.slice(posicion)
    document.querySelector('header').innerHTML = templHeader.render(page)

    // Footer
    document.querySelector('footer').innerHTML= templFooter.render()


    const storeUsers = 'usuarios'
    

    // Formularios
    const formRegistro = document.querySelector('#f_registro')
    const formLogin = document.querySelector('#f_login')
    const formUsuario = document.getElementById('#f_usuario')

    // Botones
    const btnMovies = document.querySelector('#b_movies')
    const btnPrev = document.querySelector('#prev')
    const btnNext = document.querySelector('#next')

    // Definicion de manejadores de eventos
    if(formRegistro){
    formRegistro.addEventListener('submit', registro)
        if(nacionalidad){
            nacionalidad.addEventListener('change', selectPaises_Provincias)
        }
    }

    if (formLogin){
        formLogin.addEventListener('submit', acceder)

    }


    if (formUsuario){
        formUsuario.addEventListener('load', obtenerPeliculas)

    }

    if(btnMovies){
        btnMovies.addEventListener('click', obtenerPeliculas)
        btnNext.addEventListener('click', nextPelicula)
        btnPrev.addEventListener('click', prevPelicula)
    }

    function acceder(ev1){
        const data1 = {}
        ev1.preventDefault()

        const usuarioLogin = formLogin.querySelector('input#usuario')
        const pwdLogin = formLogin.querySelector('input#pwd')
        data1.usuario = usuarioLogin.value
        data1.pwd = pwdLogin.value


        const usuarios = window.localStorage.getItem(storeUsers) ?
        JSON.parse(window.localStorage.getItem(storeUsers)) : []
        console.log(usuarios)
        login(usuarios,data1)
        
    }

    function login(users,data){

        let usuarioEncontrado = users.find(
            item => item.usuario.toUpperCase() == data.usuario.toUpperCase()
        )
        console.log(users)

        if(!usuarioEncontrado){
            console.log('usuario no encontrado')
        }
        else if(usuarioEncontrado.pwd == data.pwd){
            console.log('usuario y password correctos!')
            window.location = 'usuario.html'
        }
        else {
            console.log('Usuario y password incorrectos!')
        }
    }

    // Funciones manejadoras
    function registro(ev){
        
        const data2 = {}
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
        data2.nombre = nombre.value
        data2.apellido = apellido.value
        data2.genero = aGenero.filter(item => item.checked)[0].value
        data2.nacionalidad = nacionalidad.value
        data2.pais_provincia = pais_provincia.value
        data2.movil = movil.value
        data2.mail = mail.value
        data2.usuario = usuario.value
        data2.pwd = pwd.value
        data2.conf_pwd = conf_pwd.value
        data2.api_key = api_key.value
        data2.terminos = terminos.checked
        data2.comentarios = comentarios.value
        console.dir(data2)
        console.log('Obteniendo Datos Registro', data2)
        console.log('Enviando')
        registrar(data2)
        // window.location = 'usuario.html'
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
        

        let findUsuario = users.find( item => item.usuario.toUpperCase() == data.usuario.toUpperCase())
        let findEmail = users.find( item => item.mail.toUpperCase() == data.mail.toUpperCase())

        if(data.pwd != data.conf_pwd){
            document.querySelector('p#msg').innerHTML= 'por favor confirmar la clave correctamente '
        } else if(findUsuario){ 
            document.querySelector('p#msg').innerHTML='El usuario ya ha sido registrado'
        } else if(findEmail){
            document.querySelector('p#msg').innerHTML='El email ya ha sido registrado'
        }
        else {
            users.push(data)
            window.localStorage.setItem(storeUsers, JSON.stringify(users))
            window.location = 'usuario.html'
        }
        
    }

    function obtenerPeliculas(){

        const clave  = '4b8423640b4850205df677351b0bb1d7'
        const page = '1'
        let url ='https://api.themoviedb.org/3/movie/now_playing?'
        url += 'api_key=' + clave +'&' + 'page=' + page
        
        fetch(url)
            .then(resp => {
                console.log(resp)
                if(resp.status <200 || resp.status >=300){
                    console.log(resp.statusText)
                    throw new Error('HTTP Error' + resp.status)
                }
                return resp.json()
        })
        .then(data => procesarPeliculas(data))
        .catch(error => alert(error.message))
    }

    function procesarPeliculas(data,contador){
        console.dir(data.results)
        let start = (contador -1)* 4
        let end = contador * 4
        console.log(`start ${start} / end ${end} / contador ${contador}`)
        const first_four= data.results.slice(start,end)

        let html=''
        first_four.forEach(element => {
            html += `
            <img src="https://image.tmdb.org/t/p/original/${element.poster_path}" alt="">
            `
        })

        document.querySelector('section.items').innerHTML= html
        document.querySelector('section.prev').classList.remove('nodisplay')
        document.querySelector('section.next').classList.remove('nodisplay')
    }

    function nextPelicula(ev2){
        console.log(ev2)
        if (ev2.type == 'click'){
            contador+=1
        }
        console.log(`next ${contador}`)

        let url ='https://api.themoviedb.org/3/movie/now_playing?api_key=4b8423640b4850205df677351b0bb1d7&language=en-US&page=2'
        
        fetch(url)
            .then(resp => {
                console.log(resp)
                if(resp.status <200 || resp.status >=300){
                    console.log(resp.statusText)
                    throw new Error('HTTP Error' + resp.status)
                }
                return resp.json()
        })
        .then(data => procesarPeliculas(data,contador))
        .catch(error => alert(error.message))
    }

    function prevPelicula(ev2){
        console.log(ev2)
        if (ev2.type == 'click'){
            contador-=1
        }
        console.log(`prev ${contador}`)

        let url ='https://api.themoviedb.org/3/movie/now_playing?api_key=4b8423640b4850205df677351b0bb1d7&language=en-US&page=2'

        fetch(url)
            .then(resp => {
                console.log(resp)
                if(resp.status <200 || resp.status >=300){
                    console.log(resp.statusText)
                    throw new Error('HTTP Error' + resp.status)
                }
                return resp.json()
        })
        .then(data => procesarPeliculas(data,contador))
        .catch(error => alert(error.message))
    }

    function conectarAPI(){
        const clave  = document.querySelector('#api_key').value

        let url ='https://api.themoviedb.org/3/movie/now_playing?api_key=4b8423640b4850205df677351b0bb1d7&language=en-US&page=2'

        fetch(url)
            .then(resp => {
                console.log(resp)
                if(resp.status <200 || resp.status >=300){
                    console.log(resp.statusText)
                    throw new Error('HTTP Error' + resp.status)
                }
                return resp.json()
        })
        .then(data => procesarPeliculas(data))
        .catch(error => alert(error.message))
    }


    
    
}

document.addEventListener('DOMContentLoaded', main)