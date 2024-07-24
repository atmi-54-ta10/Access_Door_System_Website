<template>
    <v-container>
      <div>
        <v-row class="justify-center">
        <v-card
          class="card1"
          max-width="350"
          outlined
          style="background-color: #abd1c6; border-radius:20px;"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Master Availability</div>
              <v-list-item-title class="text-h5 mb-3">
                <span v-text="stat_master"></span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img :src="require('@/assets/admin.png')"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
  
        <v-card
          class="card2"
          max-width="400"
          style="background-color: #abd1c6; border-radius:20px;"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Door Status</div>
              <v-list-item-title class="text-h5 mb-3">
                <span v-text="stat_door"></span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img :src="require('@/assets/door.png')"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-row>
      </div>
  
      <div class="card-container">
        <!-- Open Door Control -->
        <v-row justify="center" class="pt-15">
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card class="rounded-card" width="250" height="240">
              <v-img
                class="center-img"
                width="250"
                height="240"
                style="margin: auto; border-radius: 0"
                @click="open_door"
                :src="require('@/assets/OPEN_DOOR.png')"
              ></v-img>
              <v-card-text class="text-xs-center"> </v-card-text>
            </v-card>
          </v-col>
  
          <!-- Control Lock Door -->
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card class="rounded-card" width="250" height="240">
              <v-img
                class="center-img"
                width="250"
                height="240"
                style="margin: auto; border-radius: 0"
                @click="open_lock"
                :src="require('@/assets/LOCK_DOOR.png')"
              ></v-img>
              <v-card-text class="flex-container"></v-card-text>
            </v-card>
          </v-col>
  
          <!-- Control Unlock Door -->
          <v-col cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card class="rounded-card" width="250" height="240">
              <v-img
                class="center-img"
                width="250"
                height="240"
                style="margin: auto;"
                @click="open_unlock"
                :src="require('@/assets/UNLOCK_DOOR.png')"
              ></v-img>
              <v-card-text class="flex-container"></v-card-text>
            </v-card>
          </v-col>
          
            <!-- All Button Dialog -->
            <v-dialog v-model="openDialog" width="320px">
              <v-card>
                <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
                  <v-card-text>
                    <p
                      style="
                        color: rgb(0, 0, 0);
                        font-size: 1.5rem;
                        font-weight: bold;
                      "
                    >
                      {{ message }}
                    </p>
                  </v-card-text>
                </v-card-title>
                <v-card-actions style="background-color: #abd1c6;">
                  <v-spacer></v-spacer>
                  <v-btn color="#0c7e78" dark class="mb-2" @click="close">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-row>
      </div>
    </v-container>
  </template>
  
  <style scoped>
  .rounded-card {
    border-radius: 50px;
    min-width: 200px;
    background-color: #abd1c6;
  }
  .card1, .card2{
    margin-inline: 5vh;
    margin-block: 7vh;
    }
    .card-container{
      margin-inline: 9vh;
      margin-block: 2vh;
    }
  </style>
  
  <script>
  import axios from "axios";
  import myImage from '../assets/1212.png'
  export default {
    data() {
      return {
        openDialog: false,
        closeDialog: false,
        unlockDialog: false,
        stat_master: '',
        stat_door: '',
        message: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        try {
          const res2 = await this.$api.get(
            '/master/status'
          )
          const res3 = await this.$api.get(
            '/door/status'
          )
          if (res3.data['lock'] == 1) {
            this.stat_door = 'Locked'
          } else {
            this.stat_door = 'Unlocked'
          }
          this.stat_master = res2.data['status']
        } catch (error) {
          console.error(error)
        }
      },
      close() {
        this.openDialog = false
      },
      open_lock() {
        this.$api
          .put('/door/lock', {
            platform: 'Website',
          })
          .then((response) => {
            this.message = response.data['message']
            this.openDialog = true
          })
          .catch((error) => {
            this.message = error.response.data['message']
            this.openDialog = true
            console.error('Error while locking door:', error)
          })
        this.fetchData()
      },
      async open_door() {
        await this.$api
          .put('/door/open', {
            platform: 'Website',
          })
          .then((response) => {
            this.message = response.data['message']
            this.openDialog = true
          })
          .catch((error) => {
            this.message = error.response.data['message']
            this.openDialog = true
            console.error('Error while opening door:')
          })
        this.fetchData()
      },
      async open_unlock() {
        await this.$api
          .put('/door/unlock', {
            platform: 'Website',
          })
          .then((response) => {
            this.message = response.data['message']
            this.openDialog = true
          })
          .catch((error) => {
            this.message = error.response.data['message']
            this.openDialog = true
            console.error('Error while unlock door:')
          })
        this.fetchData()
      },
    },
  }
  </script>
  