<template>
  <f7-page>
    <!-- Barra de navegacion -->
    <f7-navbar back-link="">
      <f7-nav-title>Todos los Contactos</f7-nav-title>
      <!-- Buscar contactos -->
      <f7-nav-right>
        <f7-link class="searchbar-enable" data-searchbar=".searchbar-demo" icon="fas fa-search"></f7-link>
      </f7-nav-right>
      <f7-searchbar class="searchbar-demo" search-container=".search-list" search-in=".item-title" placeholder="Buscar..." :value="contacto" @input="contacto = $event.target.value" clear-button expandable></f7-searchbar>
    </f7-navbar>
    <!-- Contacto no existente -->
    <f7-list class="searchbar-not-found no-margin-top">
      <f7-list-item >No se encontró '{{ contacto }}'</f7-list-item>
    </f7-list>
    <!-- Lista de todos los contactos -->
    <f7-list class="search-list searchbar-found no-margin-top">
      <f7-list-item v-for="contacto in contactos" :title="contacto.username" :key="contacto.id" > 
        <!-- Boton añadir contacto -->
        <f7-link icon="fas fa-plus-circle" color="blue" @click="agregarContacto(contacto.id)"></f7-link>
        <!-- Boton eliminar contacto -->
        <!-- <f7-link icon-f7="delete_round_fill" color="red"></f7-link> -->
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
// import auth from '../auth'
export default {
  data() {
    return {
      contacto:'',
      contactos: [{id: 1, username: "Nombre Apellido", email: "correo@gmail.com"}]
    };
  },
  methods: {
    agregarContacto: (id) =>{
      console.log(this.$store);
      
      var id_user_from = auth.user.id
      console.log(id_user_from, id);
    }
  },
  mounted() {
    // Listar contactos del servidor
    this.axios.post('https://www.phoenixserver.ml/api/listarUsuarios').then(res => {
      // Estamos enviando el Password_hash, dar formato y limitar la carga de usuarios a 50,
      // O automatizar la carga de usuarios por scroll >>>> framework7 lo hace..!
      this.contactos = res.data.data //<<<<<<<<<<<<<<<<<<<<<
      // ///////////////////////////////////////////////////
      // this.contactos.push({id: 7, username: "Aida Pernia", email: "aida@gmail.com"}) 
    }).catch(error => {
      console.log("Ha ocurrido un ERROR al extraer los datos del SERVIDOR");
      console.log(error);
    })
  }
};
</script>

<style scoped>
</style>
