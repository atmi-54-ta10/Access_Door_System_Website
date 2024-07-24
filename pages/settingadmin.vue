<template>
    <div class="contain">
      <v-row class="pt-10 pb-10 justify-center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card color="#abd1c6" light ref="form" width="100vh" style="border-radius: 20px;">
            <v-card-text>
              <v-text-field
                v-model="editItem.name"
                label="Name"
                counter="25"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="editItem.id_number"
                label="ID Number"
                counter="8"
                outlined
                required
              ></v-text-field>
              <v-autocomplete
                v-model="editItem.job"
                :items="job1"
                label="Job"
                outlined
                required
              ></v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#0c7e78"
                dark class="mb-2"
                @click="updatedata"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      
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
      </v-row>
    </div>
    </template>

    <style>
    .contain{
      margin-top: 15vh;
      margin-left: 5vh;
      margin-right: 5vh;
    }
    .mx-auto{
      border-radius: 50px;
      margin-top: 2vh;
      margin-bottom:auto;
    }
    </style>

<script>
import axios from "axios";
export default {
  data: () => ({
    edit: '',
    job1:['Student','Instructor','Staff','Other'],
    errorMessages: '',
    message: '',
    openDialog: false,
    editItem: {
      id:"",
      name: '',
      job: '',
      id_number: '',
    },
  }),

  computed: {
    form () {
      return {
        name: this.editItem.name,
        job: this.editItem.job,
        id_number: this.editItem.id_number
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
    async fetchData() {

      try {
        const response = await this.$api.get('/user/')
        this.editItem.name = response.data.name
        this.editItem.job = response.data.job
        this.editItem.id_number = response.data.id_number
        // console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    close() {
    this.openDialog = false
  },
    async updatedata () {
      try {
        const response = await this.$api.put(
          '/user/',
          {
            name: this.editItem.name,
            job: this.editItem.job,
            id_number: this.editItem.id_number,
          }
        )
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>