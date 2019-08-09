const PROTOCOLO = 'https://'
const PORT = ":4001"
const HOST = window.location.hostname == 'localhost' ? "localhost" :'10.0.1.7'
const URL = HOST+PORT
// const URL = '192.168.8.107'+PORT
const LOGIN_URL = PROTOCOLO+URL+"/api/login"
const SIGNIN_URL = PROTOCOLO+URL+"/api/signin"

export default {
  // Datos de usuario local
  user:{
    id: Number.parseInt(window.localStorage.getItem('id_token')),
    name: window.localStorage.getItem('v_username'),
    email: window.localStorage.getItem('v_email'),
    authenticated: !!window.localStorage.getItem('id_token')
  },
  // Iniciar Sesion
  login (context, creds, redirect) {
    return context.axios.post(LOGIN_URL, creds)
  },
  // Registrar Usuario
  signin(context, creds, redirect){
    return context.axios.post(SIGNIN_URL, creds)
  },
  // Cerrar Sesion
  signOut(context){
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('v_username')
    window.localStorage.removeItem('v_email')
    window.localStorage.removeItem('token')
    window.userToken = null
    location.reload()
  }
}
