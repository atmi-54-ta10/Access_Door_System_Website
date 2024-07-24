   <template>
    <div>
        <v-app style="background-color: #004643;">
          <!-- Navbar Atas -->
        <v-app-bar app dark color="#abd1c6">
            <div class="button">   
        <v-btn text rounded href="/landing" color="#004643" dark style="margin-left: 2vh;"> Home </v-btn>
        <v-btn text rounded href="/about" color="#004643" dark style="margin-left: 2vh;"> About </v-btn>
        <v-btn text rounded href="/profile" color="#004643" dark style="margin-left: 2vh;"> Profile </v-btn>
            </div>
        </v-app-bar>
        
        <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" class="text-center">
            <v-img
              class="img"
              :src="require('@/assets/12345678.png')"
              contain
            ></v-img>
            <div class="text">
              <p class="title">Welcome to Embedded System Laboratorium</p> 
              <p class="subtitle">مَنْ جَدَّ وَجَدَ<br>Man Jadda wa Jada</p>
              <v-card-actions>
                <v-btn class="buttonlogin" color="#0c7e78" dark href="/login"> Login </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-container>

    </v-app>
    </div>
   </template>

<style>
    .button{
    margin-left: auto;
    margin-right: auto;
  }
  .text{
    color: white;
  }
  .buttonlogin{
    border-radius: 50px;
    width: 250px;
    margin: auto;
  }
  .img{
    /* background-color: blue; */
    margin-top: 7vh;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: auto;
    max-width: 450px;
  }
  .title {
  font-size: xx-large;
  font-weight: bolder;
}
.subtitle {
  margin-left: 1.5vh;
}

@media (max-width: 600px) {
  .img {
    max-width: 100%;
  }
  .title {
    font-size: large;
  }
  .subtitle {
    margin-left: 1vh;
  }
}
</style>


<script>
  import axios from "axios";
  export default {
    auth: false,
    layout: 'empty',
    data() {
      return {
      }
    },
  }
  </script>