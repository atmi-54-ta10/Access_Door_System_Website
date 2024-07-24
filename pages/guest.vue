<template>
  <div>
    <div class="card-container1">
      <v-row class="pt-0 justify-center">
      <v-card class="card1" max-width="400" outlined style="background-color: #abd1c6; border-radius: 20px">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">Master Availability</div>
            <v-list-item-title class="text-h5 mb-3">
              <span v-text="masterAdminStatus"></span>
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
    min-width="300"
    style="background-color: #abd1c6; border-radius:20px;"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Door Status
        </div>
        <v-list-item-title class="text-h5 mb-3">
          <span v-text="doorStatus"></span>
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
          <v-card class="rounded-card" width="300" height="290" flex>
            <v-img class="center-img" width="300" height="290" style="margin: auto; border-radius: 0;" @click="open_door" 
            :src="require('@/assets/OPEN_DOOR.png')"></v-img>
            <v-card-text class="text-xs-center">
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="openDialog" width="320px">
        <v-card>
          <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
            <v-card-text>
              <p style="color: rgb(0, 0, 0); font-size: 1.5rem; font-weight: bold;">{{ message }}</p>
            </v-card-text>
          </v-card-title>
          <v-card-actions style="background-color: #abd1c6;">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="close">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  auth: 'guest',
  data() {
    return {
      openDialog: false,
      masterAdminStatus: '',
      doorStatus: '',
      message: ''
    };
  },
  methods: {
    async fetchData() {
      try {
        const response2 = await this.$api.get('/master/status');
        const response3 = await this.$api.get('/door/status')
        // console.log(response2.data);
        this.masterAdminStatus = response2.data.status;
        if (response3.data['lock'] == 1){
          this.doorStatus = "Locked"
        }
        else{ 
          this.doorStatus = "Unlocked"
          
        }
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.openDialog = false;
    },
    open_door() {
      this.$api
        .put('/door/opens', { name: "Guest", job: "Other",platform: "Website" })
        .then((response) => {
          // console.log(response.data.message);
          this.message = response.data.message;
          this.openDialog = true;
        })
        .catch((error) => {
          this.message = error.response.data.message;
          this.openDialog = true;
          console.error("Error while opening door:", error);
        });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.card1, .card2{
    margin-inline: 3vh;
    margin-block:4vh;
    justify-content: center;
  }
.rounded-card {
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
  background-color: #abd1c6;
}
.card-container1 {
  margin-block: 5vh;
  margin-bottom:1vh;
}
.card-container {
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 1vh;
  margin-left: 5vh;
  margin-right: 5vh;
}
</style>
