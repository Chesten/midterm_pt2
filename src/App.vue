<template>
  <div id="app">
  <div>
        <h1>Covid-19 Dashboard by Chesten VanPelt</h1>
        <p>I confirm that the work submitted for grading is solely mine. While working on this take
            home exam, I neither received nor gave any assistance from/to other human beings. I
            understand that violating this academic honesty may seriously impact my grade for this
            class
        </p>
        <div id="search">
          <span>Select Country</span>
          <select v-model="selected" v-on:click="Search()">
            <option v-for="(z, pos) in WorldStats" :key="pos">{{z.name}}</option>
          </select>
        </div>
    </div >
    <div id="content">
    <WorldStats v-bind:data="WorldStats" :toAppMsg="msg"></WorldStats>
    <CountryStats v-bind:country="selected" :msg="msg"></CountryStats>
    <ActivityLog v-bind:msg="msg" v-on:change="AddtoList()"></ActivityLog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {FirebaseFirestore} from "@firebase/firestore-types"

//vues
import WorldStats from './components/WorldStats.vue';
import CountryStats from './components/CountryStats.vue'
import ActivityLog from './components/ActivityLog.vue'
import axios, {AxiosResponse} from "axios";

@Component({
  components: {
    WorldStats, CountryStats, ActivityLog ,
  },
})
export default class App extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private countyList:any[] = []
  private selected = "";
  private previousSelected = "3";
  private WorldStats:any[] = [];
  public msg = ""

  Search(): void{
    if(this.selected==""){
      console.log("empty, first click")
    }
    else if(this.selected!==this.previousSelected ){ //REPLACE THIS IS SOME TRIGGER TO THE OTHER VIEW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log("selected value Changed: " + this.selected)
      this.previousSelected=this.selected; 

    }else if (this.selected==this.previousSelected){
      console.log("sameValue")
    }
  }
  mounted(): void {
    // Just for debugging, you may delete the following two
    // lines after it is confirmed that this.$appDB is
    // initialized correctly
    console.log("API Key", this.$appDB.app.options_.apiKey);

    const options = {
      url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
      headers: {
        'x-rapidapi-key': '098711bbdfmsh21dcfd23d779303p10951bjsnce5d1aafb119',
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      ////NEW WAY!
      this.WorldStats.splice(0)
      for(let[key, value] of Object.entries(response.data.data.regions)){
        var obj = JSON.parse(JSON.stringify(value))
        this.WorldStats.push({
          name: obj.name, 
          totalCases: obj.total_cases,
          RecoveryRate: obj.recovery_ratio,
          DeathRate: obj.death_ratio
        })
      }

      }).catch(function (error) {
      console.error(error);
    });
  


  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: "world country activity" ;
}
#content> section:nth-child(1){
  grid-area: world;
}
#content> section:nth-child(2){
  grid-area: country;
}
#content> section:nth-child(3){
  grid-area: activity;
}
</style>
