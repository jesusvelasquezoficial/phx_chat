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
        info=""
        required
        validate
        error-message="Debe ingresar un correo electronico"
        autocomplete="new-user"
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
        info=""
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
    <f7-block-title>{{ error }}</f7-block-title>
    <!-- Links a Registro de Usuarios -->
    <f7-list>
      <f7-block-footer>¿Aun no tienes cuenta?<br> <f7-link href="/signin/">¡Registrate!</f7-link></f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
// Funciones de autenticacion
import Auth from '../../auth'

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
    Ingresar: function (){
      const self = this
      const app = self.$f7
      const router = self.$f7router
      console.log(self.formLogin.email)
      console.log(self.formLogin.password)
      if (this.validarCampos()) {
        console.log(this.validarCampos())
        self.error = ""
        if (this.validarEmail()) {
            console.log(this.validarEmail())
            self.error = ""
            Auth.login(this, self.formLogin)
            .then((resp) => {
              if (Object.keys(resp.data) != "errors"){
                console.log(resp.status)
                console.log(resp.data)
                console.log(Object.keys(resp))

                window.localStorage.setItem('id_token', resp.data.id)
                window.localStorage.setItem('v_username', resp.data.username)
                window.localStorage.setItem('v_email', resp.data.email)

                // window.userToken = resp.data.user.token
                // localStorage.setItem('token',resp.data.user.token)
                location.reload()
              }else{
                console.log(resp.data.errors)
                self.error = resp.data.errors
              }
              
            }).catch((error) => {
              // network error
              console.log(error.config)
              console.log(error.request)
              console.log(error.response)
              console.log(error.isAxiosError)
              console.log(error.toJSON)
              // app.dialog.alert(err)
              app.dialog.alert("Usted no esta registrador")
              self.error = "Usted no esta registrador"
              console.log(Object.keys(error))
              console.log(error)
            })
        }else{
          self.error = "Email invalido"
        }
      }else{
        self.error = "Campos vacios"
      }
    },
    validarCampos: function() {
      return (this.formLogin.email != "" && this.formLogin.password != "") ? true : false
    },
    validarEmail: function() {
      var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.formLogin.email)
    }
  }

}
</script>

<style scoped>

</style>
