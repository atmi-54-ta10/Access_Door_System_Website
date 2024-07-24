<template>
  <div class="card-container">
    <v-data-table
      :headers="headers"
      :items="name"
      :items-per-page="10"
      sort-by="id_number"
      class="elevation-1"
      style="background-color: #abd1c6; border-radius: 15px"
    >
      <template v-slot:top>
        <v-toolbar style="background-color: #abd1c6" flat>
          <v-toolbar-title>Datalog</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            style="border-radius: 20px;"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#0c7e78" dark class="mb-2" v-bind="attrs" v-on="on">
                Export Data
                <v-icon right dark>mdi-file-download</v-icon>
              </v-btn>
            </template>
            <v-list dark style="background-color:#0c7e78;">
              <v-list-item @click="ExportDataCSV('csv')">Export as CSV</v-list-item>
              <v-list-item @click="ExportDataPDF('pdf')">Export as PDF</v-list-item>
              <v-list-item @click="ExportDataXCL('excel')">Export as Excel</v-list-item>
            </v-list>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
}
.v-data-table {
  height: 650px;
  width: 1300px;
  margin-top: 50px;
  margin-bottom: 30px;
  margin-left: 30px;
  margin-right: 30px;
  overflow:auto;
}
</style>

<script>
import axios from 'axios'
export default {
  data: () => ({
    headers: [
      {
        text: 'Date',
        align: 'start',
        sortable: false,
        value: 'date',
      },
      { text: 'Time', value: 'time' },
      { text: 'Name', value: 'name' },
      { text: 'Job', value: 'job' },
      { text: 'Platform', value: 'platform' },
      { text: 'Action', value: 'action' },
    ],
    name: [],
    dialog:false,
    editedIndex: -1,
    editedItem: {
      name: '',
      job: '',
      platform: '',
      action: '',
      time: '',
      date:'',
    },
    defaultItem: {
      name: '',
      job: '',
      platform: '',
      action: '',
      time: '',
      date: '',
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.fetchData()
  },

  methods: {
    close() {
      this.dialog = false;
    },
    async fetchData() {
      try {
        const response = await this.$api.get('/action/list')
        const data = response.data
        let date_time;
        const records = data.map(item => ({
                date: new Date(item.time).toDateString(),
                time: new Date(item.time).toLocaleTimeString("en-US", {
                    hour12: 0,
                  }),
                name: item.name,
                platform: item.platform,
                job: item.job,
                action: item.action
            }));
        this.name = records
      } catch (error) {
        console.error(error)
      }
    },
    
    async ExportDataCSV() {
      try {
        const date_now = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
          dateStyle: "medium",
        });
        const response = await this.$api.get('/action/csv', {
          responseType: 'blob' // Menggunakan responseType 'blob' untuk mengunduh file
        });
        // Membuat objek URL dari data blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Membuat elemen <a> sementara untuk mengunduh file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Data Logging Report ${date_now}.csv`); // Sesuaikan dengan nama file yang Anda ingin unduh
        document.body.appendChild(link);
        link.click();
        // Membersihkan objek URL setelah pengunduhan selesai
        this.dialog = false;
      } catch (error) {
        console.error('Error exporting data:', error);
      }
    },
    async ExportDataPDF() {
      try {
        const date_now = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
          dateStyle: "medium",
        });
        const response = await this.$api.get('/action/pdf', {
          responseType: 'blob' // Menggunakan responseType 'blob' untuk mengunduh file
        });
        // Membuat objek URL dari data blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Membuat elemen <a> sementara untuk mengunduh file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Data Logging Report ${date_now}.pdf`); // Sesuaikan dengan nama file yang Anda ingin unduh
        document.body.appendChild(link);
        link.click();
        // Membersihkan objek URL setelah pengunduhan selesai
        this.dialog = false;
      } catch (error) {
        console.error('Error exporting data:', error);
      }
    },
    async ExportDataXCL() {
      try {
        const date_now = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
          dateStyle: "medium",
        });
        const response = await this.$api.get('/action/excel', {
          responseType: 'blob' // Menggunakan responseType 'blob' untuk mengunduh file
        });
        // Membuat objek URL dari data blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Membuat elemen <a> sementara untuk mengunduh file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Data Logging Report ${date_now}.xlsx`); // Sesuaikan dengan nama file yang Anda ingin unduh
        document.body.appendChild(link);
        link.click();
        // Membersihkan objek URL setelah pengunduhan selesai
        // window.URL.revokeObjectURL(url);
        this.dialog = false;
      } catch (error) {
        console.error('Error exporting data:', error);
      }
    },
  },
}
</script>
