<template>
  <v-row class="contain">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card color="#abd1c6" light ref="form" style="border-radius: 20px;">
        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :error-messages="errorMessages"
            label="Username"
            outlined
            required
          ></v-text-field>
          <v-text-field
            ref="name"
            v-model="name"
            label="Name"
            counter="25"
            outlined
            required
          ></v-text-field>
          <v-text-field
            ref="lab"
            v-model="lab"
            label="Laboratorium"
            outlined
            required
          ></v-text-field>
          <v-autocomplete
            ref="job"
            v-model="job"
            :items="job1"
            label="Job"
            outlined
            required
          ></v-autocomplete>
          <v-text-field
            ref="section"
            v-model="section"
            label="Section"
            outlined
            required
          ></v-text-field>
          <v-autocomplete
            ref="status"
            v-model="status"
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
            dark class="mb-2 mr-2"
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
        width="350"
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
    </v-card>

    <!-- Dialog message from server -->
    <v-dialog v-model="openDialog" width="350px">
      <v-card>
        <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
          <v-card-text>
            <p
              style="
                color: rgb(0, 0, 0);
                font-size: 1.2rem;
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
        <v-card-text style="background-color: #abd1c6;">
          <v-text-field
            v-model="oldPassword"
            label="Old Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            label="New Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions style="background-color: #abd1c6;">
          <v-spacer></v-spacer>
          <v-btn color="#0c7e78" dark class="mb-2" @click="closeEditDialog">
            Cancel
          </v-btn>
          <v-btn color="#0c7e78" dark class="mb-2" @click="changePassword">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Success dialog -->
    <v-dialog v-model="successDialog" width="360px">
      <v-card>
        <v-card-title class="headline" primary-title style="background-color: #abd1c6;">
          <v-card-text>
            <p
              style="
                color: rgb(0, 0, 0);
                font-size: 1.2rem;
                font-weight: bold;
              "
            >
              {{ successMessage }}
            </p>
          </v-card-text>
        </v-card-title>
        <v-card-actions style="background-color: #abd1c6;">
          <v-spacer></v-spacer>
          <v-btn color="#0c7e78" dark class="mb-2" @click="closeSuccessDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style>
.mx-auto {
  border-radius: 50px;
  margin-top: 15vh;
  margin-bottom: auto;
}
.contain {
  margin-block: 5vh;
  margin-inline: 0vh;
}
</style>

<script>
import axios from "axios";
export default {
  data: () => ({
    show1: false,
    edit: '',
    status1: ['Available', 'Unavailable'],
    job1: ['Student', 'Instructor', 'Staff', 'Other'],
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
    successDialog: false,
    successMessage: '',
  }),

  computed: {
    form() {
      return {
        username: this.username,
        name: this.name,
        lab: this.lab,
        job: this.job,
        section: this.section,
        status: this.status,
      };
    },
  },

  watch: {
    username() {
      this.errorMessages = ''
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const response = await this.$api.get('/master/');
        this.username = response.data.username;
        this.name = response.data.name;
        this.lab = response.data.lab;
        this.job = response.data.job;
        this.section = response.data.section;
        this.status = response.data.status;
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.openDialog = false;
    },
    openChangePasswordDialog() {
      this.changePasswordDialog = true;
    },
    async changePassword() {
      try {
        const response = await this.$api.put('/master/pw', {
          password: this.oldPassword,
          new_password: this.newPassword,
        });
        this.successMessage = "Password changed successfully";
        this.successDialog = true;
        this.closeChangePasswordDialog();
      } catch (error) {
        console.error('Error changing password:', error);
      }
    },
    closeChangePasswordDialog() {
      this.changePasswordDialog = false;
      // Reset password fields
      this.oldPassword = '';
      this.newPassword = '';
    },
    closeEditDialog() {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeSuccessDialog() {
      this.successDialog = false;
    },
    async submit() {
      try {
        const response = await this.$api.put('/master/edit', {
          username: this.username,
          name: this.name,
          lab: this.lab,
          job: this.job,
          section: this.section,
          status: this.status,
        });
        this.successMessage = "Settings updated successfully";
        this.successDialog = true;
        this.fetchData();
      } catch (error) {
        console.error(error);
      }
    },

    async card_in() {
      this.message = "Attach Your RFID Card to RFID Reader"
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
          // console.log('Errror')
          console.error('Error while add card in')
        })
      this.fetchData()
    },
    async card_out() {
      this.message = "Attach YourRFID Card to RFID Reader"
      this.openDialog = true
      await this.$api
        .post('/master/card_out', {
          platform: 'website',
        })
        .then((response) => {
          // console.log(response.data['message'])
          this.message = response.data['message']
        })
        .catch((error) => {
          this.message = error.response.data['message']
          // console.log('Errror')
          console.error('Error while add card out')
        })
      this.fetchData()
    },
  },
}
</script>
