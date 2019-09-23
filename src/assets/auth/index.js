const PROTOCOLO = 'https://'
const HOST = location.hostname == ['localhost', '127.0.0.1'] ? 'localhost' : 'www.phoenixserver.ml' 
const PORT = location.port == ['8080','8081'] ?':4001' : ':443'
const URL = HOST+PORT
const LOGIN_URL = PROTOCOLO+URL+"/api/login"
const SIGNIN_URL = PROTOCOLO+URL+"/api/signin"

export default {
  // Datos de usuario local
  user:{
    id: Number.parseInt(localStorage.getItem('id_token')),
    name: localStorage.getItem('v_username'),
    email: localStorage.getItem('v_email'),
    authenticated: !!localStorage.getItem('id_token')
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
    // Limpiamos los datos locales almacenados
    localStorage.removeItem('id_token')
    localStorage.removeItem('v_username')
    localStorage.removeItem('v_email')
    localStorage.removeItem('token')
    // window.userToken = null
    location.reload()
  }
}
