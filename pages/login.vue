<template>
  <v-app style="background-color: #004643;">
    <v-app-bar app dark color="#abd1c6">
      <div class="button">   
        <v-btn text rounded href="/landing" color="#004643" dark style="margin-left: 2vh;"> Home </v-btn>
        <v-btn text rounded href="/about" color="#004643" dark style="margin-left: 2vh;"> About </v-btn>
        <v-btn text rounded href="/profile" color="#004643" dark style="margin-left: 2vh;"> Profile </v-btn>
      </div>
    </v-app-bar>
    <v-container>
      <v-card width="450" height="545" class="mx-auto" style="border-radius: 20px;">
        <v-img
          height="270px"
          :src="require('@/assets/es1.jpg')"
          title-align="center"
          style="opacity: 60%; display: flex; align-items: center; justify-content: center;"
        >
          <div style="text-align: center; font-weight: bolder; font-size: x-large; color: white;">
            Welcome, Please Login!
          </div>
        </v-img>
        <v-card-text class="mt-5">
          <v-text-field
            label="Username"
            prepend-icon="mdi-account-circle"
            v-model="username"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="password"
          />
        </v-card-text>

        <v-card-actions style="justify-content: center;">
          <v-btn color="#0c7e78" dark @click="login" style="width: 120px; border-radius: 50px;"> Login </v-btn>
          <div style="text-align: center; margin-inline: 3vh; font-weight: bold;">
            or
          </div>
          <v-btn color="#0c7e78" dark href="/guest" style="width: 120px; border-radius: 50px;"> Guest </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline" style="font-weight: bold;">Information</v-card-title>
        <v-card-text>
          <p style="color: rgb(0, 0, 0); font-size: 1.0rem;">
            {{ message }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style>
.mx-auto {
  margin-top: 15vh;
  border-radius: 20px;
}
.button {
  margin-left: auto;
  margin-right: auto;
}
.app {
  background-color: #004643;
}
.text-center {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import Style from '../layouts/style.vue';

export default {
  layout: 'empty',
  data() {
    return {
      show1: false,
      showPassword: false,
      username: '',
      password: '',
      dialog: false,
      message: '',
      userinfo: null,
    }
  },
  mounted() {
    const userInfo = localStorage.getItem('user_Info');
    if (userInfo) {
      this.userinfo = JSON.parse(userInfo);
    }
  },
  methods: {
    async login() {
      if (this.username === '' || this.password === '') {
        this.message = 'Please enter both Username and Password.';
        this.dialog = true;
        this.username = '';
        this.password = '';
      } 
      else {
        try {
          const response = await this.$api.post("/user/log_in", {
            username: this.username,
            password: this.password,
          });
          // console.log(response.status)
          if (response.status == 200) {
            localStorage.setItem(
              'user_Info',
              JSON.stringify(response.data)
            );
            this.$auth.setUserToken(response.data.token);
            this.message = "Login Successful!";
            this.dialog = true;
            setTimeout(() => {
              this.dialog = false;
              this.$router.push('/dashboard');
            }, 3000);
          } 
          else {
            this.message = "You do not have permission to access this website.";
            this.dialog = true;
          }
          this.username = '';
          this.password = '';
        } catch (error) {
          console.error("Error during login:", error);
          this.message = "An error occurred during login.";
          this.dialog = true;
        }
      }
    },
    closeDialog() {
      this.dialog = false;
    },
  },
}
</script>
