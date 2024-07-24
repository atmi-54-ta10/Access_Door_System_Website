<template>
  <v-app style="background-color: #004643;">
    <v-app-bar app dark color="#abd1c6">
      <div class="button">
        <v-btn text rounded href="/landing" color="#004643" dark style="margin-left: 2vh;"> Home </v-btn>
        <v-btn text rounded href="/about" color="#004643" dark style="margin-left: 2vh;"> About </v-btn>
        <v-btn text rounded href="/profile" color="#004643" dark style="margin-left: 2vh;"> Profile </v-btn>
      </div>
    </v-app-bar>

    <v-row class="about d-flex justify-center">
      <v-col cols="12" md="3" class="d-flex justify-center">
        <v-card class="card1" style="background-color: #abd1c6;">
          <v-img class="white--text align-end" height="210px" :src="require('@/assets/raa.jpeg')">
          </v-img>
          <v-card-subtitle style="font-weight: bold;">
            Agustinus Raka Adiprasetyo
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>
              <div>NIM :  2021-2-003</div>
              <div>Prodi  :  Mechatronics Engineering</div>
              <div>Jobdesk : Electrical and Mechanic</div>
            </div>
            <div class="mt-5 d-flex justify-center">
              <a href="https://www.instagram.com/rakasamsoe?igsh=dmo0ZXZjOW83dW5w" target="_blank">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <v-icon style="margin-left: 2vh;">mdi-linkedin</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="d-flex justify-center">
        <v-card class="card1" style="background-color: #abd1c6;">
          <v-img class="white--text align-end" height="210px" :src="require('@/assets/fahan.jpeg')">
          </v-img>
          <v-card-subtitle style="font-weight: bold;">
            Farhan Satria Ardhi
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>
              <div>NIM  : 2021-2-022</div>
              <div>Prodi  : Mechatronics Engineering</div>
              <div>Jobdesk : Raspberry Pi Server (C)</div>
            </div>
            <div class="mt-5 d-flex justify-center">
              <a href="https://www.instagram.com/fsardhi?igsh=MWg5MGJjYWI1MmZ2Yg==">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <v-icon style="margin-left: 2vh;">mdi-linkedin</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="d-flex justify-center">
        <v-card class="card1" style="background-color: #abd1c6;">
          <v-img class="white--text align-end" height="210px" :src="require('@/assets/maio.jpeg')">
          </v-img>
          <v-card-subtitle style="font-weight: bold;">
            Mario Putra Wibawa
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>
              <div>NIM  : 2021-2-030</div>
              <div>Prodi  : Mechatronics Engineering</div>
              <div>Jobdesk : Website</div>
            </div>
            <div class="mt-5 d-flex justify-center">
              <a href="https://www.instagram.com/iiioooxx__?igsh=MXR5NzFkdTI0dWlh">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <v-icon style="margin-left: 2vh;">mdi-linkedin</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="d-flex justify-center">
        <v-card class="card1" style="background-color: #abd1c6;">
          <v-img class="white--text align-end" height="210px" :src="require('@/assets/pipi.png')">
          </v-img>
          <v-card-subtitle style="font-weight: bold;">
            Pipin Wanodia
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>
              <div>NIM  : 2021-2-038</div>
              <div>Prodi  : Mechatronics Engineering</div>
              <div>Jobdesk : Android App</div>
            </div>
            <div class="mt-5 d-flex justify-center">
              <a href="https://www.instagram.com/pipinwanodiaa?igsh=MW03NDZlcXZ4aG53dQ==">
                <v-icon>mdi-instagram</v-icon>
              </a>
              <v-icon style="margin-left: 2vh;">mdi-linkedin</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style>
.button {
  margin-left: auto;
  margin-right: auto;
}

.about {
  margin-block: 23vh;
  margin-inline: 1vh;
}

.card1 {
  border-radius: 15px;
  width: 270px;
  height: 390px;
  background-color: #abd1c6;
}

@media (max-width: 600px) {
  .about {
    margin-block: 10vh;
  }
}
</style>

<script>
import axios from "axios";
export default {
  auth: false,
  layout: 'empty',
  data() {
    return {};
  },
};
</script>
