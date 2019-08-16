<template>
  <f7-page>
    <f7-list class="no-margin-vertical">
      <f7-list-item class="padding-vertical" :title="nombreUsuario" :footer="correoUsuario" link="/about/" panel-close> 
        <img src="https://placeimg.com/80/80/people/1" slot="media" style="width: 40px; height: 40px; border-radius: 50%" >
      </f7-list-item>
    </f7-list>
    <f7-block-header>Ajustes {{ getUserName }} {{  }} </f7-block-header>
    <f7-list>
      <!-- Cerrar Sesion -->
      <f7-link @click="Salir" text-color="red" class="item-divider">Cerrar Sesión</f7-link>
      <!-- <f7-list-item link="/about/" title="About" panel-close></f7-list-item> -->
      <!-- <f7-list-item link="/form/" title="Form" panel-close></f7-list-item> -->
    </f7-list>
    <!-- <f7-block>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
      <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
    </f7-block> -->
  </f7-page>
</template>
<script>
import Auth from '../../auth'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      nombreUsuario: localStorage.getItem("v_username"),
      correoUsuario: ''
    }
  },
  methods:{
    Salir: () => {
      Auth.signOut(this)
      location.reload()
    },
    ...mapActions(['setUser'])
  },
  computed: {
    // OBJETO: usuario actual
    mi(){
      return localStorage.getItem('id_token')
    },
    ...mapGetters(['getUserName'])
    

  },
  created(){
    console.log(localStorage.getItem('id_token'));
    this.getUserName
    
  }
};
</script>
