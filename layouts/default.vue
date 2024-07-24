<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer" 
        app 
        floating
        >
            <v-list dense nav color="#abd1c6" style="height: 100vh; display: flex; flex-direction: column;">
                <div>
                    <div style="margin-top: 40px;">
                    <v-list-item link href="/dashboard" divider>
                        <v-list-item-icon color="white">
                            <v-icon color="#004643">mdi-view-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white-text">Dashboard</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-list-item href="/controlling" divider>
                        <v-list-item-icon color="white">
                            <v-icon color="#004643">mdi-door-open</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white-text">Controlling</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-divider></v-divider>
                    <v-list-item link href="/monitoring">
                        <v-list-item-icon color="white">
                            <v-icon color="#004643">mdi-monitor</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white-text">Monitoring</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item link href="/userdata">
                        <v-list-item-icon color="white">
                            <v-icon color="#004643">mdi-database-edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white-text">User Data</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-group color="#004643" v-model="reportOpen" prepend-icon="mdi-clipboard-text-clock">
                        <template v-slot:activator>
                          <v-list-item-content>
                            <v-list-item-title class="white-text">History</v-list-item-title>
                          </v-list-item-content>
                        </template>

                        <v-list-item link href="/datalog">
                            <v-list-item-icon color="white" style="margin-left: 20px;">
                              <v-icon color="#004643">mdi-file-chart-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="white-text">Report</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>

                          <v-list-item link href="/temperature">
                            <v-list-item-icon color="white" style="margin-left: 20px;">
                                <v-icon color="#004643">mdi-thermometer</v-icon>
                              </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="white-text">Temperature Log</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                    </v-list-group>
                    <v-divider></v-divider>
                    <v-list-item link @click="setting">
                        <v-list-item-icon color="white">
                            <v-icon color="#004643">mdi-cog-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="white-text">Setting</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="#abd1c6" fixed dense>
            <v-app-bar-nav-icon @click="drawer = !drawer" color="#004643"></v-app-bar-nav-icon>
            <v-toolbar-title class="white-text">Embedded System Laboratorium</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text @click="logout" style="color: #004643;">
                <v-icon left>mdi-logout</v-icon>
                LOGOUT
            </v-btn>
        </v-app-bar>

        <v-main style="background-color:#004643;">
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<style>
.white-text {
  color: #004643;
}
</style>  

<script>
import axios from "axios";

export default {
    data: () => ({
        drawer: true,
        username: "",
        reportOpen: false,
        role:"",
    }),

    methods: {
    async logout() {
        try {
            await this.$auth.logout();
            this.$router.push('/login');
        } catch (err) {
            console.error(err);
        }
    },
    setting(){
        if (JSON.parse(localStorage.user_Info).role === 'master'){
            this.$router.push('/setting');
        }
        else if (JSON.parse(localStorage.user_Info).role === 'admin'){
            this.$router.push('/settingadmin')
        }

    }
    },

}
</script>
