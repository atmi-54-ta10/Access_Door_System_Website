<template>
  <v-app style="background-color: #004643;">
    <v-app-bar app dark color="#abd1c6">
      <div class="button">
        <v-btn text rounded href="/landing" color="#004643" dark style="margin-left: 2vh;"> Home </v-btn>
        <v-btn text rounded href="/about" color="#004643" dark style="margin-left: 2vh;"> About </v-btn>
        <v-btn text rounded href="/profile" color="#004643" dark style="margin-left: 2vh;"> Profile </v-btn>
      </div>
    </v-app-bar>

    <div class="aboutta">
      <v-card
        class="mx-auto"
        style="margin-block: 22vh; margin-left: 15vh; margin-right: 15vh; border-radius: 25px; background-color: #abd1c6;"
      >
        <v-card-text>
          <p class="text-h6 text--primary" style="font-weight: bolder;">
            Development of a Raspberry Pi-Based Door Access System with Dual Frequency RFID
          </p>
          <div class="text--primary justified-text" style="font-weight:500;">
            <p>
              Development of a Raspberry Pi-Based Door Access System with Dual Frequency RFID. The Access Door System that we developed in this Final Project is based on the Raspberry Pi which functions as the main server for managing door access, monitoring temperature, and carrying out various other functions. This system is designed to provide full control and ease of use for users. The Raspberry Pi was chosen because of its reliable capabilities as a control center that can process and carry out various complex functions efficiently.
            </p>
            <p>
              In this system, the Raspberry Pi not only acts as a main server but also as a device that displays information and status operational via the Waveshare screen and monitor screen located on the lab door. This screen makes it easy to monitor directly on site, providing real-time information about lab conditions, the whereabouts of the lab master, and what lab section is in practice. This integration makes the system more user-friendly and informative for users who are at the location. 
            </p>
            <p>
              Apart from the monitor screen on the door, the system can be accessed via the website and Android application. Users can open doors, monitor temperatures, and perform other functions from anywhere using their devices. This website and android application were developed to provide an intuitive and responsive interface, ensuring a smooth and efficient user experience. This project uses an API as communication between the client and the database.
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<style>
.button {
  margin-left: auto;
  margin-right: auto;
}
.mx-auto {
  width: 121vh;
  margin-left: 10vh;
  margin-right: 10vh;
}
.justified-text p {
  text-align: justify;
}
</style>

<script>
import axios from "axios";

export default {
  auth: false,
  layout: 'empty',
  mounted() {
    // Force reflow to address any layout issues on navigation
    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
  },
  data() {
    return {};
  },
};
</script>
 