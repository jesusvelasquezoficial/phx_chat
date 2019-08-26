const PROTOCOLO = 'https://'
const PORT = ":4001"
// const HOST = location.hostname == 'localhost' ? "localhost" :'192.168.1.3'
const HOST = location.hostname == 'localhost' ? "localhost" :'192.168.1.7'
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
    localStorage.removeItem('id_token')
    localStorage.removeItem('v_username')
    localStorage.removeItem('v_email')
    localStorage.removeItem('token')
    // window.userToken = null
    location.reload()
  }
}
