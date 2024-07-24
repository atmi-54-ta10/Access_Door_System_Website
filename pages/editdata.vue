<template>
  <div>
    <v-dialog  v-model="editDialog" width="500px">
      <v-card style="background-color: #abd1c6;">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="editItem.job"
                  :items="['Student', 'Instructor','Staff','Other']"
                  label="Job"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  v-model="editItem.id_number"
                  label="ID Number"
                  outlined
                  counter="8"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  v-model="editItem.name"
                  label="Name"
                  outlined
                  counter="16"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#0c7e78" dark class="mb-2" @click="closeEditDialog">
            Cancel
          </v-btn>
          <v-btn color="#0c7e78" dark class="mb-2" @click="saveEditDialog">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="name"
      sort-by="noinduk"
      class="elevation-1"
      style="background-color: #abd1c6; border-radius:15px;"
    >
      <template v-slot:top>
        <v-toolbar style="background-color: #abd1c6" flat>
          <v-toolbar-title>List Data User</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px" style="border-radius: 20px;">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#0c7e78" dark class="mb-2" @click="addData">
                Add Data
              </v-btn>
            </template>
            <v-card style="background-color: #abd1c6;">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="8" md="6">
                      <v-select
                        v-model="editedItem.role"
                        :items="['admin', 'guest']"
                        label="Role"
                        outlined
                        :disabled="isadmin"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-select
                        v-model="editedItem.job"
                        :items="['Student', 'Instructor','Staff','Other']"
                        label="Job"
                        outlined
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                        v-model="editedItem.username"
                        label="Username"
                        outlined
                        counter="16"
                        required
                        :disabled="isGuestRole"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        outlined
                        counter="16"
                        required
                        :disabled="isGuestRole"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        outlined
                        counter="16"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8" md="6">
                      <v-text-field
                        v-model="editedItem.id_number"
                        label="ID Number"
                        outlined
                        counter="8"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#0c7e78" dark class="mb-2 ml-5" @click="reset"> Clear </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="#0c7e78" dark class="mb-2 mr-3" @click="close"> Cancel </v-btn>
                <v-btn color="#0c7e78" dark class="mb-2 mr-5" @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog untuk action delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" style="background-color: #abd1c6;">Are you sure you want to delete this data?</v-card-title>
              <v-card-actions style="background-color: #abd1c6;">
                <v-spacer></v-spacer>
                <v-btn color="#0c7e78" dark class="mb-2" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="#0c7e78" dark class="mb-2" @click="delete_data"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Dialog untuk action add card -->
          <v-dialog v-model="dialogaddcard" max-width="400px">
            <v-card>
              <v-card-title class="text-h5" style="background-color: #abd1c6;">
                <p style="margin-left: 10vh;">Add a new card?</p>
              </v-card-title>
              <v-card-actions style="background-color: #abd1c6;">
                <v-spacer></v-spacer>
                <v-btn color="#0c7e78" dark class="mb-2" @click="addCard"
                  >Add Card</v-btn
                >
                <v-btn color="#0c7e78" dark class="mb-2" @click="closeAddCardDialog">
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="duplicateDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" style="background-color: #abd1c6;">
                Data 
              </v-card-title>
              <v-card-actions style="background-color: #abd1c6;">
                <v-spacer></v-spacer>
                <v-btn color="#0c7e78" dark class="mb-2" @click="closeDuplicateDialog">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
                <v-btn color="#0c7e78" dark class="mb-2" @click="closeConfirmationDialog">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editpensil(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon small @click="addcard(item)"> mdi-account-card </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.v-data-table {
  height: 650px;
  margin-top: 70px;
  margin-bottom: 50px;
  margin-left: 40px;
  margin-right: 40px;
  overflow:auto;
}
</style>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    show1: false,
    duplicateDialog: false,
    disabledAdmin: false,
    openDialog: false,  
    dialogDelete: false,
    dialogaddcard: false,
    showPassword: true,
    editDialog: false,
    job:['student','instructor','staff','other'],
    selectedRole: '',
    message: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Job', value: 'job' },
      { text: 'ID Number', value: 'id_number' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    name: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      job: '',
      id_number: '',
      role: '',
      username: '',
      password: '',
      card: '0',
    },
    editItem: {
      id:"",
      name: '',
      job: '',
      id_number: '',
    },
    defaultItem: {
      name: '',
      job: '',
      id_number: '',
      role: '',
      username: '',
      password: '',
      card: '0',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Data' : 'Edit Item'
    },

    isGuestRole() {
      return this.editedItem.role === 'guest'
    },
    isadmin(){
      if (JSON.parse(localStorage.user_Info).role === 'admin'){
        this.editedItem.role = 'guest'
      }
      //kalau terdeteksi sebagai admin maka akan terdisable
      return JSON.parse(localStorage.user_Info).role === "admin"
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogaddcard(val) {
      val || this.close1()
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    closeAddCardDialog() {
      this.dialogaddcard = false;
    },

    closeConfirmationDialog() {
      this.openDialog = false;
    },
    closeDuplicateDialog() {
      this.duplicateDialog = false;
    },
    async fetchData() {
      // console.log(localStorage.user_Info)
      try {
        const response = await this.$api.get(
          '/user/list_user'
        )
        this.name = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addData() {
      this.defaultItem = {
      name: '',
      job: '',
      id_number: '',
      role: '',
      username: '',
      password: '',
      card: '0',
    };
    this.dialog = true;
    },
    editpensil(item) {
      this.editedIndex = this.name.indexOf(item)
      this.editItem = Object.assign({}, item)
      this.editItem.id = item._id 
      // console.log(this.editItem)
      this.editDialog = true
      // console.log(item._id)
    },

    deleteItem(item) {
      this.editedIndex = this.name.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editItem.id = item._id 
      this.dialogDelete = true
    },
    addcard(item) {
      this.editedIndex = this.name.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editItem.id = item._id 
      this.dialogaddcard = true 
    },

    close1() {
      this.openDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeEditDialog() {
      this.editDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    //Untuk memasukkan data yang baru
    async save() {
      try {
        const response = await this.$api.get('/user/check_duplicate', {
          params: {
            name: this.editedItem.name,
            username: this.editedItem.username,
            password: this.editedItem.password,
          }
        });

        if (response.data.exists) {
          this.duplicateDialog = true;
        } else {
          const response = await this.$api.post(
            '/user/add_data',
            {
              name: this.editedItem.name,
              job: this.editedItem.job,
              id_number: this.editedItem.id_number,
              role: this.editedItem.role,
              username: this.editedItem.username,
              password: this.editedItem.password,
              card: '0',
            }
          )
          this.close()
          this.fetchData()
        }
      } catch (error) {
        console.error(error)
      }
    },
    //Save untuk data yang sudah di edit
    async saveEditDialog() {
      try {
        const response = await this.$api.put(
          '/user/'+ this.editItem.id,
          {
            name: this.editItem.name,
            job: this.editItem.job,
            id_number: this.editItem.id_number,
          }
        )
        this.editDialog = false
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    //Untuk menghapus data
    async delete_data() {
      try {
        const response = await this.$api.delete(
          '/user/'+ this.editItem.id)
        this.dialogDelete = false
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    async addCard() {
      try { 
        this.message = "Attach RFID Card to RFID Reader"
        this.openDialog = true
        // console.log(this.editItem.id)
        await this.$api.post('/user/add_card/' + this.editItem.id)
        .then((res)=>{
          this.message = response.data['message']
        })
        .catch((error) => {
        this.message = error.response.data['message']
        console.error('Error while add card in')
      })
        this.fetchData()
      } 
      catch (error) {
        this.message = error.response.data['message']
        console.error('Error while add card in')
        this.fetchData()
      }
    },
    reset() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    initialize() {},
  },
}
</script>
