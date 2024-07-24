<template>
    <div>
      <div class="cardhello">
        <v-card class="card" style="margin-top: 5vh; background-color: #abd1c6;">
          <v-card-text>
            <p class="text-h6 text--primary" style="margin-bottom: 0vh;">
              Welcome, {{ userRole }}.
            </p>
          </v-card-text>
        </v-card>
      </div>
  
      <div class="aboutta">
        <v-card class="mx-auto" style="margin-top: 5vh; background-color: #abd1c6;">
          <v-card-text>
            <p class="text-h4 text--primary">Specifications Of Our Project</p>
            <div class="specification-text">
              This system has a specification where the input voltage used is 220VAC, which is the standard voltage for electronic devices. The dimensions of the panel box are 280 x 260 x 100 mm, providing enough space to neatly accommodate all internal components.<br>
              The main controller used is the Raspberry Pi 5 with a 64GB SD card, offering sufficient computational capabilities to run various applications and required sensors. The sensor system implemented consists of a No Touch Sensor and RFID, allowing for touchless detection and identification based on radio frequency identification. For user interface, the system is equipped with two monitors: a 7-inch Waveshare Monitor and a 14-inch LG Monitor, providing flexibility in displaying information and control.<br>
              The power supply used is 12 Volts, ensuring that all components receive a stable power supply that meets their operational needs. This specification is designed to ensure that the system can operate efficiently, reliably, and according to the specific needs of the targeted application.
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </template>
  
  <style>
  .mx-auto {
    width: auto; /* Sesuaikan lebar dengan konten */
    height: auto; /* Sesuaikan tinggi dengan konten */
  }
  .card {
    width: auto;
    height: auto;
    display: inline-block;
  }
  .specification-text {
    text-align: justify;
    font-size: 20px; /* Sesuaikan ukuran teks sesuai kebutuhan Anda */
    line-height: 1.5; /* Menambahkan spasi antar baris agar lebih terbaca */
    color: #000000; /* Warna teks, bisa disesuaikan */
    margin-top: 30px; /* Menambahkan jarak atas */
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        userRole: ''
      };
    },
    mounted() {
      this.getUserRole();
    },
    methods: {
      getUserRole() {
        const user = JSON.parse(localStorage.getItem('user_Info'));
        if (user && user.role) {
          this.userRole = user.role;
        } else {
          this.userRole = 'Guest'; // Default role if no user data
        }
      }
    }
  };
  </script>
  