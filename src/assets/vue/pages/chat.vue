<template>
  <f7-page>
    <f7-navbar title="Phoenix" back-link=""></f7-navbar>

    <f7-messagebar
      :placeholder="placeholder"
      ref="messagebar"
      :attachments-visible="attachmentsVisible"
      :sheet-visible="sheetVisible"
      :value="messageText"
      @input="messageText = $event.target.value"
    >
      <f7-link
        icon-ios="f7:camera_fill"
        icon-aurora="f7:camera_fill"
        icon-md="material:camera_alt"
        slot="inner-start"
        @click="sheetVisible = !sheetVisible"
      ></f7-link>
      <f7-link
        icon-ios="f7:arrow_up_round_fill"
        icon-aurora="f7:arrow_up_round_fill"
        icon-md="material:send"
        slot="inner-end"
        @click="sendMessage"
      ></f7-link>
      <f7-messagebar-attachments>
        <f7-messagebar-attachment
          v-for="(image, index) in attachments"
          :key="index"
          :image="image"
          @attachment:delete="deleteAttachment(image)"
        ></f7-messagebar-attachment>
      </f7-messagebar-attachments>
      <f7-messagebar-sheet>
        <f7-messagebar-sheet-image
          v-for="(image, index) in images"
          :key="index"
          :image="image"
          :checked="attachments.indexOf(image) >= 0"
          @change="handleAttachment"
        ></f7-messagebar-sheet-image>
      </f7-messagebar-sheet>
    </f7-messagebar>

    <f7-messages ref="messages">
      <f7-messages-title>
        <b>Martes, Dic 31,</b> 12:00
      </f7-messages-title>
      <f7-message
        v-for="(message, index) in messagesData"
        :key="index"
        :type="isMyMSJ(message)"
        :image="message.image"
        :name="message.name"
        :avatar="message.avatar"
        :first="isFirstMessage(message, index)"
        :last="isLastMessage(message, index)"
        :tail="isTailMessage(message, index)"
      >
        <span slot="text" v-if="message.text" v-html="message.text"></span>
      </f7-message>
      <f7-message
        v-if="typingMessage"
        type="received"
        :typing="true"
        :first="true"
        :last="true"
        :tail="true"
        :header="`${typingMessage.name} is typing`"
        :avatar="typingMessage.avatar"
      ></f7-message>
    </f7-messages>
  </f7-page>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import Auth from '../../auth'
import {Socket} from 'phoenix-socket'

export default {
  components: {},
  data() {
    return {
       mensaje:{
        // text: "hola mundo",
        // userId: 1,
        // name: "Jesus Velasquez",
        content: "hola mundo",
        from_id: 1,
        conversation_id: 1
      },
      attachments: [],
      sheetVisible: false,
      typingMessage: null,
      messageText: "",
      messagesData: [
        // {
        //   userId: 1,
        //   type: "sent",
        //   text: "Hi, Kate"
        // },
        // {
        //   userId: 1,
        //   type: "sent",
        //   text: "How are you?"
        // },
        // {
        //   name: "Kate",
        //   type: "received",
        //   text: "Hi, I am good!",
        //   avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
        // },
        // {
        //   name: "Blue Ninja",
        //   type: "received",
        //   text: "Hi there, I am also fine, thanks! And how are you?",
        //   avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg"
        // },
        // {
        //   userId: 1,
        //   type: "sent",
        //   text: "Hey, Blue Ninja! Glad to see you ;)"
        // },
        // {
        //   userId: 1,
        //   type: "sent",
        //   text: "Hey, look, cutest kitten ever!"
        // },
        // {
        //   userId: 1,
        //   type: "sent",
        //   image: "https://cdn.framework7.io/placeholder/cats-200x260-4.jpg"
        // },
        // {
        //   userId: 1,
        //   name: "Kate",
        //   type: "received",
        //   text: "Nice!",
        //   avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
        // },
        // {
        //   userId: 1,
        //   name: "Kate",
        //   type: "received",
        //   text: "Like it very much!",
        //   avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
        // },
        // {
        //   name: "Blue Ninja",
        //   type: "received",
        //   text: "Awesome!",
        //   avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg"
        // }
      ],
      images: [
        "https://cdn.framework7.io/placeholder/cats-300x300-1.jpg",
        "https://cdn.framework7.io/placeholder/cats-200x300-2.jpg",
        "https://cdn.framework7.io/placeholder/cats-400x300-3.jpg",
        "https://cdn.framework7.io/placeholder/cats-300x150-4.jpg",
        "https://cdn.framework7.io/placeholder/cats-150x300-5.jpg",
        "https://cdn.framework7.io/placeholder/cats-300x300-6.jpg",
        "https://cdn.framework7.io/placeholder/cats-300x300-7.jpg",
        "https://cdn.framework7.io/placeholder/cats-200x300-8.jpg",
        "https://cdn.framework7.io/placeholder/cats-400x300-9.jpg",
        "https://cdn.framework7.io/placeholder/cats-300x150-10.jpg"
      ],
      people: [
        {
          name: "Kate Johnson",
          avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
        },
        {
          name: "Blue Ninja",
          avatar: "https://cdn.framework7.io/placeholder/people-100x100-7.jpg"
        }
      ],
      answers: [
        "Yes!",
        "No",
        "Hm...",
        "I am not sure",
        "And what about you?",
        "May be ;)",
        "Lorem ipsum dolor sit amet, consectetur",
        "What?",
        "Are you sure?",
        "Of course",
        "Need to think about it",
        "Amazing!!!"
      ],
      socket: '',
      channel: '',
      responseInProgress: false
    };
  },
  computed: {
    attachmentsVisible() {
      const self = this;
      return self.attachments.length > 0;
    },
    placeholder() {
      const self = this;
      return self.attachments.length > 0 ? "Add comment or Send" : "Message";
    },
    ...mapGetters(
      ['getCurrentUser', 'getSocket']
    )
  },
  mounted() {
    let dataDB = []
    const self = this
    // Cargamos los mensajes de la conversacion PHOENIX
    this.axios.get('https://'+Auth.URL+'/api/messages').then(res => {
      // Recorremos cada uno de los mensajes de la DB (element)
      res.data.data.forEach(element => {
        // Buscamos el usuario segun el userId del mensaje
        this.axios.get('https://'+Auth.URL+'/api/users/'+element.userId).then(result => {
          // Creamos un obj person con el nombre y el avatar del usuario
          let person = {
            name: result.data.data.username,
            avatar: "/logo.png"
            // avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
          }
          // unimos el nombre y el avatar al mensaje de la DB
          element.name = person.name
          element.avatar = person.avatar
          dataDB.push(element)
        })
      });
      console.log(dataDB);
      
      self.messagesData = dataDB
    }).catch(error => {
      console.log("Ha ocurrido un ERROR al extraer los datos del SERVIDOR");
      console.log(error);
    })
    self.$f7ready(() => {
      self.messagebar = self.$refs.messagebar.f7Messagebar;
      self.messages = self.$refs.messages.f7Messages;
    })
    self.socket = self.getSocket
    self.socket.connect()
    self.channel = self.socket.channel("conversation:lobby", {})

    self.channel.on("new_msg", payload => {
      self.messagesData.push(payload.msj);
      console.log(payload);
      console.log(self.messagesData);
    })

    self.channel.join()
      .receive("ok", resp => { console.log("Joined Phoenix successfully", resp) })
      .receive("error", resp => { console.log("Unable to join Phoenix", resp) })
  },
  methods: {
    isMyMSJ(msj){
      if (this.getCurrentUser.id === msj.userId ) {
        delete msj.name
        delete msj.avatar
        return "sent" 
      }
      return "received"
      
    },
    isFirstMessage(message, index) {
      const self = this;
      const previousMessage = self.messagesData[index - 1];
      if (message.isTitle) return false;
      if (
        !previousMessage ||
        previousMessage.type !== message.type ||
        previousMessage.name !== message.name
      )
        return true;
      return false;
    },
    isLastMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (
        !nextMessage ||
        nextMessage.type !== message.type ||
        nextMessage.name !== message.name
      )
        return true;
      return false;
    },
    isTailMessage(message, index) {
      const self = this;
      const nextMessage = self.messagesData[index + 1];
      if (message.isTitle) return false;
      if (
        !nextMessage ||
        nextMessage.type !== message.type ||
        nextMessage.name !== message.name
      )
        return true;
      return false;
    },
    deleteAttachment(image) {
      const self = this;
      const index = self.attachments.indexOf(image);
      self.attachments.splice(index, 1)[0]; // eslint-disable-line
    },
    handleAttachment(e) {
      const self = this;
      const index = self
        .$$(e.target)
        .parents("label.checkbox")
        .index();
      const image = self.images[index];
      if (e.target.checked) {
        // Add to attachments
        self.attachments.unshift(image);
      } else {
        // Remove from attachments
        self.attachments.splice(self.attachments.indexOf(image), 1);
      }
    },
    sendMessage() {
      const self = this;
      const text = self.messageText.replace(/\n/g, "<br>").trim();
      const messagesToSend = [];
      let mensajeAEnviar = {}
      self.attachments.forEach(attachment => {
        messagesToSend.push({
          image: attachment
        });
        mensajeAEnviar.image = attachment
      });
      if (text.length) {
        const person = {
          name: self.getCurrentUser.username,
          avatar: "https://cdn.framework7.io/placeholder/people-100x100-9.jpg"
        }
        // self.typingMessage = {
        //   name: person.name,
        //   avatar: person.avatar
        // }
        messagesToSend.push({
          text,
          name: person.name,
          avatar: person.avatar,
          userId: self.getCurrentUser.id
        })

        let datos = {
          text,
          from_id: self.getCurrentUser.id,
          conversation_id: 1,
          content: text,
          name: person.name,
          avatar: person.avatar,
          userId: self.getCurrentUser.id
        }

        mensajeAEnviar = {...datos}
      }

      if (messagesToSend.length === 0) {
        return;
      }

      // VALIDAR LONGITUD DE -> mensajeAEnviar <- OJO CON ESTO !!

      // Reset attachments
      self.attachments = [];
      // Hide sheet
      self.sheetVisible = false;
      // Clear area
      self.messageText = "";
      // Focus area
      if (text.length) self.messagebar.focus();
      // Send message
      // self.messagesData.push(...messagesToSend);
     
      self.channel.push("new_msg", {msj: mensajeAEnviar})

      // Mock response
      // if (self.responseInProgress) return;
      // self.responseInProgress = true;
      // setTimeout(() => {
      //   const answer =
      //     self.answers[Math.floor(Math.random() * self.answers.length)];
      //   const person =
      //     self.people[Math.floor(Math.random() * self.people.length)];
      //   self.typingMessage = {
      //     name: person.name,
      //     avatar: person.avatar
      //   };
      //   setTimeout(() => {
      //     self.messagesData.push({
      //       text: answer,
      //       type: "received",
      //       name: person.name,
      //       avatar: person.avatar
      //     });
      //     self.typingMessage = null;
      //     self.responseInProgress = false;
      //   }, 4000);
      // }, 1000);
    }
  }
};
</script>