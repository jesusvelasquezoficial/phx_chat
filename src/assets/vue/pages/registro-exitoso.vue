<template>
  <f7-page>
    <!-- Barra de navegacion -->
    <f7-navbar>
      <f7-nav-left back-link="Back"></f7-nav-left>
      <f7-nav-title>Registro Exitoso</f7-nav-title>
      <f7-nav-right>
        <f7-link icon="icon-bars" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <!-- bloque de contenido -->
    <f7-block>
      <h3>{{ bienvenida }}</h3>
      <br>
    </f7-block>
    <f7-block>
      <!-- Default back icon -->
      <f7-link href="/" color="black">¡Ingresa!
        <f7-icon icon="icon-back"></f7-icon>
      </f7-link>

      <!-- Some custom icon -->
      <f7-icon icon="icon-home"></f7-icon>
      <!-- //////////////////////////////////////////////// -->
      <f7-icon icon="home"></f7-icon>
      <f7-icon icon="f7:home"></f7-icon>

      <!-- F7 Icons font icon -->
      <f7-icon f7="home"></f7-icon>

      <!-- Material Icons font icon -->
      <f7-icon material="home"></f7-icon>

      <!-- Font Awesome icons font icon -->
      <f7-icon fa="home"></f7-icon>

      <!-- Ionicons icons font icon -->
      <f7-icon ion="home"></f7-icon>

      <!-- F7 icons font icon with custom size and color -->
      <f7-icon f7="home" size="44px" color="blue"></f7-icon>

      <!-- Conditional icon -->
      <f7-icon ios="f7:home" aurora="f7:home" md="material:home"></f7-icon>
    </f7-block>
  </f7-page>
  <!-- <h1>{{ error }}</h1> -->
  <!-- <h1 v-for="data in json">{{ data }}</h1> -->
</template>

<script>
// OJO CON ESTO, DEBERIAS CAMBIAR EL NOMBRE
// import api from '../api'

export default {
  data () {
    return {
      bienvenida: 'Bienvenido su registro fue realizado con EXITO',

      // json: [],
      // error: ""
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>

</style>
