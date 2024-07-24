<template>
  <v-row style="margin-top: 40px; margin-left:40px;">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card color="#abd1c6" light ref="form" style="border-radius: 20px;">
        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || 'This field is required']"
            :error-messages="errorMessages"
            label="Username"
            outlined
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="name"
            :rules="[
              () => !!name || 'This field is required',
              () => !!name && name.length <= 25 || 'Name must be less than 25 characters',
              nameCheck
            ]"
            label="Name"
            counter="25"
            outlined
            required
          ></v-text-field>
          <v-text-field
            ref="lab"
            v-model="lab"
            :rules="[() => !!lab || 'This field is required', nameCheck]"
            label="Laboratorium"
            outlined
            required
          ></v-text-field>
          <v-autocomplete
            ref="job"
            v-model="job"
            :rules="[() => !!job || 'This field is required']"
            :items="job1"
            label="Job"
            outlined
            required
          ></v-autocomplete>
          <v-text-field
            ref="section"
            v-model="section"
            :rules="[() => !!section || 'This field is required']"
            label="Section"
            outlined
            required
          ></v-text-field>
          <v-autocomplete
            ref="status"
            v-model="status"
            :rules="[() => !!status || 'This field is required']"
            :items="status1"
            label="Status"
            outlined
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#0c7e78"
            dark
            class="mb-2"
            @click="openChangePasswordDialog"
          >
            Change Password
          </v-btn>
          <v-btn
            color="#0c7e78"
            dark class="mb-2"
            @click="submit"
          >
            Update Setting
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    
  <!-- Program buat v-card scan card -->
  <v-card
      class="mx-auto"
      width="344"
      color="#abd1c6"
      style="border-radius: 24px;"
  >
  <v-list-item three-line>
    <v-list-item-avatar tile size="150"  style="margin-left: auto; margin-right:auto;">
      <v-img :src="require('@/assets/scan card hitam.png')"></v-img>
    </v-list-item-avatar>
      
  </v-list-item>

  <v-list-item-content>
      <v-list-item-title class="text-xl-h4 text-center" style="font-size: 30px;">
        Scan Card
      </v-list-item-title>
    </v-list-item-content>

  <v-card-actions>
    <v-btn
    rounded
    height="60"
    width="120"
    style="margin-left: auto; margin-right:auto; margin-top: 15px; margin-bottom:10px;"
    color="#0c7e78"
    dark
    @click="card_in"
  >
    Card In
  </v-btn>
  <v-btn
      rounded
      height="60"
      width="120"
      style="margin-left: auto; margin-right:auto; margin-top: 15px; margin-bottom:10px;"
      color="#0c7e78"
      dark
      @click="card_out"
  >
      Card Out
  </v-btn>
  </v-card-actions>
  <!-- Dialog add card -->
</v-card>
<!-- Dialog message from server -->
<v-dialog v-model="openDialog" width="400px">
  <v-card>
    <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
      <v-card-text>
        <p
          style="
            color: rgb(0, 0, 0);
            font-size: 1.3rem;
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
<v-dialog v-model="changePasswordDialog" width="400px">
<v-card>
  <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
    <span class="text-lg">Change Password</span>
  </v-card-title>
  <v-card-text>
    <v-text-field
      v-model="oldPassword"
      label="Old Password"
      type="password"
      outlined
      required
    ></v-text-field>
    <v-text-field
      v-model="newPassword"
      label="New Password"
      type="password"
      outlined
      required
    ></v-text-field>
  </v-card-text>
  <v-card-actions style="background-color: #abd1c6;">
    <v-spacer></v-spacer>
    <v-btn color="#0c7e78" dark class="mb-2" @click="changePassword">Change</v-btn>

  </v-card-actions>
</v-card>
</v-dialog>

  </v-row>
</template>

<style>
.mx-auto{
  border-radius: 50px;
  margin-top: auto;
  margin-bottom:auto;
}
</style>

<script>
import axios from "axios";
export default {
  data: () => ({
      edit: '',
    status1: ['Available', 'Unavailable'],
    job1:['Student','Instructor','Staff','Other'],
    errorMessages: '',
    username: '',
    name: '',
    lab: '',
    job: '',
    section: '',
    status: '',
    formHasErrors: false,
    message: '',
    openDialog: false,
    oldPassword: '',
    newPassword: '',
    changePasswordDialog: false,
  }),

  computed: {
    form () {
      return {
        username: this.username,
        name: this.name,
        lab: this.lab,
        job: this.job,
        section: this.section,
        status: this.status,
      }
    },
  },

  watch: {
    username () {
      this.errorMessages = ''
    },
  },
  created() {
      this.fetchData()
    },

  methods: {
      async fetchData(){
          try{
              const response = await this.$api.get('/master/')
              this.username = response.data.username;
              this.name = response.data.name;
              this.lab = response.data.lab;
              this.job = response.data.job;
              this.section = response.data.section;
              this.status = response.data.status;
          } catch (error) {
      console.error(error)
    }
    },
      nameCheck () {
      this.errorMessages = this.name && !this.username
        ? `Hey! I'm required`
        : ''

      return true
    },
    close() {
    this.openDialog = false
  },
  openChangePasswordDialog() {
  this.changePasswordDialog = true;
},
async changePassword() {
  try {
    const response = await this.$api.put('/master/pw', {
      password: this.oldPassword,
      new_password: this.newPassword
    });
    // Handle success response
    this.closeChangePasswordDialog();
  } catch (error) {
    console.error('Error changing password:', error);
    // Handle error response
  }
},
closeChangePasswordDialog() {
  this.changePasswordDialog = false;
  // Reset password fields
  this.oldPassword = '';
  this.newPassword = '';
},
    async submit () {
      try {
      const response = await this.$api.put('/master/edit',
        {
          username: this.username,
          name: this.name,
          lab: this.lab,
          job: this.job,
          section: this.section,
          status: this.status
        }
      )
      this.close()
      this.fetchData()
    } catch (error) {
      console.error(error)
    }
    },
    
    async card_in() {
      this.message = "Attach RFID Card to RFID Reader"
      this.openDialog = true
    await this.$api
      .post('/master/card_in', {
        platform: 'website',
      })
      .then((response) => {
        this.message = response.data['message']
      })
      .catch((error) => {
        this.message = error.response.data['message']
        console.log('Errror')
        console.error('Error while add card in')
      })
    this.fetchData()
  },
  async card_out() {
    this.message = "Attach RFID Card to RFID Reader"
      this.openDialog = true
    await this.$api
      .post('/master/card_out', {
        platform: 'website',
      })
      .then((response) => {
        console.log(response.data['message'])
        this.message = response.data['message']
      })
      .catch((error) => {
        this.message = error.response.data['message']
        console.log('Errror')
        console.error('Error while add card out')
      })
    this.fetchData()
  },
  },
}
</script>