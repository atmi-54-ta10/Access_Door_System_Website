<template>
  <div>
    <div class="card-container">
      <v-row class="pt-0 justify-center">
        <v-card
          class="card2"
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
  
        <v-card
          class="card1"
          min-width="300"
          style="background-color: #abd1c6; border-radius:20px;"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Master Availability
              </div>
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
          class="card3"
          min-width="300"
          style="background-color: #abd1c6; border-radius:20px;"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                Tap Count
              </div>
              <v-list-item-title class="text-h5 mb-3">
                <span v-text="tapStatus"></span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img :src="require('@/assets/tapcard.png')"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-row>
    </div>
  
    <div class="report">
      <v-row class="pt-15 justify-center">
        <v-card class="suhu1" style="background-color: #abd1c6; border-radius:20px; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="card-text">Panel Box Temperature</div>
          <div class="card-center" style="font-size: xx-large; font-weight: bold">{{ panelTemperature }}</div>
          <div class="historysuhu">
            <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="white-text">{{ time }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
          </div>
          <v-btn class="btn" color="#0c7e78" dark to="/temperature">View Details</v-btn>
        </v-card>
  
        <v-card class="suhu2" style="background-color: #abd1c6; border-radius:20px; height: 350px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="card-text1">EM Lock Temperature</div>
          <div class="card-center" style="font-size: xx-large; font-weight: bold;">{{ emLockTemperature }}</div>
          <div class="historysuhu">
            <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="white-text">{{ time }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-divider></v-divider>
          </div>
          <v-btn class="btn1" color="#0c7e78" dark to="/temperature">View Details</v-btn>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<style>
.card1, .card2, .card3 {
  margin-inline: 3vh;
  margin-block: 5vh;
  justify-content: center;
}
.card-container {
  margin-block: 5vh;
  margin-bottom: 1vh;
}
.suhu1, .suhu2 {
  max-height: 46vh;
  width: 40vh;
  padding-top: 5vh;
  padding-bottom: 2vh;
  margin-inline: 8vh;
  margin-block: 2vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn, .btn1 {
  width: 200px;
  margin-top: auto;
  margin-bottom: 1vh;
  border-radius: 20px;
}
.card-text {
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 450;
}
.card-text1 {
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 450;
}
.card-center {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.historysuhu {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .card-container {
    margin-block: 2vh;
    margin-bottom: 1vh;
  }
  .card {
    margin: 1vh;
  }
}
</style>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    masterAdminStatus: '',
    doorStatus: '',
    tapStatus: '',
    panelTemperature: '',
    emLockTemperature: '',
    time:'',
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const response2 = await this.$api.get('/master/status')
        const response3 = await this.$api.get('/door/status')
        const response4 = await this.$api.get('/temp/')
        this.tapStatus = response3.data['tap_card'];
        this.masterAdminStatus = response2.data['status'];
        this.panelTemperature = response4.data['panel_temp'];
        this.emLockTemperature = response4.data['emlock_temp'];
        let date = new Date(response4.data['time']).toDateString()
        let time1 = new Date(response4.data['time']).toLocaleTimeString("en-US", {
                  hour12: 0,
                })
        this.time =  date +" " + time1;
        if (response3.data['lock'] == 1){
          this.doorStatus = "Locked"
        }
        else{ 
          this.doorStatus = "Unlock"
        }
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>
 