<template>
    <!-- App -->
    <f7-app :params="f7params">
        <!-- Barra de estado (mobile) -->
        <f7-statusbar></f7-statusbar>
        <!-- Menu lateral izquierdo -->
        <f7-panel left cover color-theme='deeporange' theme-dark>
            <f7-view url="/menu-lateral/" links-view=".view-main" />
        </f7-panel>
        <!-- Menu lateral derecho -->
        <f7-panel right cover color-theme='deeporange' theme-dark>
            <f7-view url="/panel-left/" links-view=".view-main" />
        </f7-panel>
        <!-- Vista principal -->
        <f7-view url="/" :main="true" class="ios-edges" color-theme='deeporange' theme-dark></f7-view>
    </f7-app>
</template>
<script>
// Import Routes...
import { f7App, f7Panel, f7View, f7Statusbar } from 'framework7-vue';
import routes from './routes.js';

let theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

export default {
    components: {
      f7App,
      f7Panel,
      f7View,
      f7Statusbar,
    },
    data() {
        return {
            f7params: {
                theme,
                routes,
                id: 'io.framework7.testapp',
            }
        }
    },
     on: {
        init: function () {
        console.log('App initialized');
        }
    }
}
</script>