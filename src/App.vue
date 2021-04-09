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
            <option v-for="(z, pos) in countyList" :key="pos">{{z.name}}</option>
          </select>
        </div>
    </div>
    <WorldStats></WorldStats>
    <CountryStats v-bind:country="selected" v-bind:data="passList"></CountryStats>
    <ActivityLog></ActivityLog>
    
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
  private passList:any[] = [];

  Search(): void{
    if(this.selected==""){
      console.log("empty, first click")
    }else if(this.selected!==this.previousSelected ){ //search functionality here
      console.log("selected value Changed: " + this.selected)
      this.previousSelected=this.selected;
      const options = {
        url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/week',
        params: {region: this.selected},
        headers: {
          'x-rapidapi-key': '098711bbdfmsh21dcfd23d779303p10951bjsnce5d1aafb119',
          'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
      };

      axios.request(options).then((response)=>{
        this.passList.splice(0)
        
        console.log(response.data.data);
          
        for(let[key, value] of Object.entries(response.data.data)) {
          var obj = JSON.parse(JSON.stringify(value))
          this.passList.push({
            date: key, 
            critical: obj.critical,
            deaths: obj.deaths,
            death_ratio: obj.death_ratio,
            recovered: obj.recovered,
            recovery_ratio: obj.recovery_ratio,
            total_cases: obj.total_cases,
        })
        }
      }).catch(function (error) {
        console.error(error);
      });

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
      this.countyList.splice(0);  // remove old data
      console.log(typeof(response.data.data.regions));
      var temp = Object.keys(response.data.data.regions);
      for(var i=0; i< temp.length; i++){
        //console.log("tmp Country: " + temp[i])
        this.countyList.push({
          name: temp[i], 
          ID: i
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
</style>
