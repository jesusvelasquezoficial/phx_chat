<template id="login">
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <!-- Logo de Phoenix  -->
    <f7-block class="text-align-center">
      <img src="../../images/logo.png" width="130px">
    </f7-block>
    <!-- Titulo -->
    <f7-login-screen-title>Inicio de Sesión</f7-login-screen-title>
    <!-- Formulario -->
    <f7-list form>
      <!-- Email -->
      <f7-list-input
        label="Correo Electronico"
        type="email"
        placeholder="Correo Electronico"
        :value="formLogin.email"
        @input="formLogin.email = $event.target.value"
        outline
        floating-label
        required
        validate
        error-message="Debe ingresar un correo electronico"
        autocomplete
        clear-button
      ></f7-list-input>
      <!-- Password -->
      <f7-list-input
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
        :value="formLogin.password"
        @input="formLogin.password = $event.target.value"
        outline
        floating-label
        required
        validate
        clear-button
      ></f7-list-input>
    </f7-list>
    <!-- Boton Ingresar -->
    <f7-block>
      <f7-button @click="Ingresar" color="deeporange" raised fill round>Ingresar</f7-button>
    </f7-block>
    <!-- Mensajes de Error -->
    <f7-block-title class="text-align-center">{{ error }}</f7-block-title>
    <!-- Links a Registro de Usuarios -->
    <f7-list>
      <f7-block-footer>¿Aun no tienes cuenta?<br> <f7-link href="/signin/">¡Registrate!</f7-link></f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
// Funciones de autenticacion
import Auth from '../../auth'
import { mapActions } from 'vuex'


export default {
  components: {},
  data () {
    return {
      formLogin: {
        email: "",
        password: ""
      },
      error: ""
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    Ingresar: function (){
      console.log(this.formLogin.email)
      console.log(this.formLogin.password)
      this.error = ""
      if (this.validarCampos()) {
        if (this.validarEmail()) {
            // enviamos {email, password}, ejecutamos AXIOS y return PROMISE
            this.LOGIN(this.formLogin).then(response => {
              // console.log(response)
              // location.reload()
            }).catch(error => {
              this.error = error
            })
        }else{
          this.error = "Email invalido"
        }
      }else{
        this.error = "Campos vacios"
      }
    },
    validarCampos: function() {
      return (this.formLogin.email != "" && this.formLogin.password != "") ? true : false
    },
    validarEmail: function() {
      var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.formLogin.email)
    }
  },
  mounted(){
    localStorage.removeItem('user');
    localStorage.clear()
  }
}
</script>

<style scoped>

</style>
