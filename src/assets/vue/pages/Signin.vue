<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <!-- Logo de Phoenix  -->
    <f7-block class="text-align-center">
      <img src="../../images/logo.png" width="130px">
    </f7-block>
    <!-- Titulo -->
    <f7-login-screen-title>Registro de Usuario</f7-login-screen-title>
    <!-- Formulario -->
    <f7-list form>
      <!-- Username -->
      <f7-list-input
        label="Nombre de Usuario"
        type="text"
        placeholder="Nombre de Usuario"
        :value="formSignin.username"
        @input="formSignin.username = $event.target.value"
        outline
        floating-label
        required
        validate
        error-message="Debe ingresar un nombre de usuario"
        autocomplete
        clear-button
      ></f7-list-input>
      <!-- Email -->
      <f7-list-input
        label="Correo Electronico"
        type="email"
        placeholder="Correo Electronico"
        :value="formSignin.email"
        @input="formSignin.email = $event.target.value"
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
        :value="formSignin.password"
        @input="formSignin.password = $event.target.value"
        outline
        floating-label
        required
        validate
        clear-button
      ></f7-list-input>
      <!-- Confirmar Password -->
      <f7-list-input
        label="Confirmar Contraseña"
        type="password"
        placeholder="Confirmar Contraseña"
        :value="formSignin.password_confirmation"
        @input="formSignin.password_confirmation = $event.target.value"
        outline
        floating-label
        required
        validate
        clear-button
      ></f7-list-input>
    </f7-list>
    <!-- Boton Registrarse -->
    <f7-block>
      <f7-button @click="Registrarse" color="deeporange" raised fill round>Registrarse</f7-button>
    </f7-block>
    <!-- Mensajes de Error -->
    <f7-block-title class="text-align-center">{{ error }}</f7-block-title>
    <!-- Links a Inicio de Sesion -->
    <f7-list>
      <f7-block-footer>¿Ya tienes una cuenta?<br> <f7-link href="/">¡Ingresa!</f7-link></f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
// OJO CON ESTO, DEBES CAMBIAR EL NOMBRE
import Auth from '../../auth'

export default {
  data () {
    return {
      formSignin: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      json: [],
      error: ""
    }
  },
  methods: {
    Registrarse: function(e){
      // LOGICA PARA REGISTRAR UN USUARIO
      e.preventDefault();
      const self = this
      const app = self.$f7
      const router = self.$f7router

      if (this.validarCampos()) {
        self.error = ""
        if (this.validarEmail()) {
          self.error = ""
          if (this.validateMinLength()) {
            self.error = ""
            if (this.validateConfirmationPassword()) {
              self.error = ""
              Auth.signin(this, this.formSignin).then((resp) => {
                console.log(resp.status)
                console.log(resp.data)
                console.log(Object.keys(resp))
                router.navigate('/registro-exitoso/')
                console.log('DEBIO IR A REGISTRO_EXITOSO')
              }).catch((error) => {
                app.dialog.alert("OCURRIO UN ERROR, ENTRO POR CATCH");
                self.error = "OCURRIO UN ERROR"
                console.log(Object.keys(error))
                console.log(error)
                console.log(error.request)
                console.log(error.response)
                console.log(error.isAxiosError)
              })
            }else{
              console.log("El password no coincide")
              self.error = "El password no coincide"
              self.json = []
            }
          }else{
            console.log("El password debe tener min 8 characteres")
            self.error = "El password debe tener min 8 characteres"
            self.json = []
          }
        }else{
          console.log("Email invalido")
          self.error = "Email invalido"
          self.json = []
        }

      }else{
          console.log("Campos vacios")
          self.error = "Campos vacios"
          self.json = []
      }
    },
    validarCampos: function() {
      return (this.formSignin.username != "" && this.formSignin.email != "" && this.formSignin.password != "" && this.formSignin.password_confirmation != "") ? true : false
    },
    validarEmail: function() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.formSignin.email)
    },
    validateMinLength(){
      return this.formSignin.password.trim().length > 7 ? true : false
    },
    validateConfirmationPassword(){
      return (this.formSignin.password == this.formSignin.password_confirmation) ? true : false
    }

  }
}
</script>

<style scoped>

</style>
