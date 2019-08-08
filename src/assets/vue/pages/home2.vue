<template>
  <f7-page>
    <!-- Barra de navegacion -->
     <f7-navbar>
      <f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>
      <div class="title">Chats</div>
      <f7-nav-right>
        <f7-link
          class="searchbar-enable"
          data-searchbar=".searchbar-components"
          icon="fas fa-search"
        ></f7-link>
      </f7-nav-right>
      <f7-searchbar
        class="searchbar-components"
        search-container=".components-list"
        search-in="a"
        expandable
      ></f7-searchbar>
      <f7-link href="/contactos/" icon="fas fa-user-plus"></f7-link>
    </f7-navbar>
    <!-- Conversacion no existente -->
    <f7-list class="searchbar-not-found" media-list>
      <f7-list-item title="No existe"></f7-list-item>
    </f7-list>
    <!-- Lista de conversaciones -->
    <f7-list class="components-list searchbar-found no-margin-top text-align-left">
      <f7-list-item link="/chat/" title="Jesus Velasquez" footer="esto es un mensaje de prueba." badge="5" badge-color="green">
        <img src="https://placeimg.com/80/80/people/1" style="width: 40px; height: 40px; border-radius: 50%" slot="media" border-color="white">
      </f7-list-item>
      <f7-list-item link="/chat/" title="Fernando Agreda" footer="esto es un mensaje de prueba." badge="2" badge-color="green">
        <img src="https://placeimg.com/80/80/people/2" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
      </f7-list-item>
      <f7-list-item link="/chat/" title="Jairo Moncada" footer="esto es un mensaje de prueba." badge="8" badge-color="green">
        <img src="https://placeimg.com/80/80/people/3" style="width: 40px; height: 40px; border-radius: 50%" slot="media">
      </f7-list-item>
      <f7-list-item link="/contactos/" title="Todos los Contactos"></f7-list-item>
      <f7-list-item link="/registro-exitoso/" title="Registro Exitoso"></f7-list-item>
    </f7-list>
    <!-- Cerrar Sesion -->
    <f7-list>
      <f7-link @click="Salir" fill   text-color="red" class="item-divider">Cerrar Sesión</f7-link>
    </f7-list>
  </f7-page>
  <!-- Mensajes de objetos JSON -->
  <!-- <div class="">
    <h1>{{ error }}</h1>
    <h1 v-for="msj in json">{{ msj }}</h1>
  </div> -->
</template>

<script>
// Api para conectarse al servidor
// import api from '../api'
// Funciones de autenticacion
// import auth from '../auth'

export default {
  components: {},
  data () {
    return {
      titulo: 'Bienvenido su ingreso fue realizado con EXITO',
      username: "Nombre Apellido",
      nombreContato: '',
      contacto: {
          id: '',
          email: '',
          nombre: '',
          mostrar: false
      },
      json: [],
      error: ""
    }
  },
  methods:{
    // funcion para buscar contactos
    buscarContacto:function() {
      const self = this
      api.getContacto(self.nombreContato)
      .then(function(data) {
        if(Object.keys(data) != "errors"){
          console.log(data)
          self.contacto.id = data.data.id
          self.contacto.email = data.data.email
          self.contacto.nombre = data.data.username
          self.contacto.mostrar = true
        }else{
          self.contacto.mostrar = false
          // self.error = data.errors
          self.error = "Usuario no encontrado"
        }
      }).catch(errors => {
        self.contacto.mostrar = false
        console.log(errors)
        self.error = "Usuario no encontrado"
        // self.error = errors

      })
    },
    Salir: () => {
      auth.signOut(this)
      location.reload()
    }
  }

}
</script>

<style scoped>
  .nav{
    background: black;
    color: white;
  }
  .img{
    border-radius: 200px;
    vertical-align: middle;
    width: 50px;
  }
  .menu{
    padding: 10px;
    text-decoration: none;
    color: white;
    margin: 0px 20px;
  }
  .btnConversacion{
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
</style>
