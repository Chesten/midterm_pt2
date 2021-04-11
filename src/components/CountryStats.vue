<template>
    <div id="Country Stats">
        <div id="dropDownSearch">

        </div>
        <h2>Trends in {{country}}</h2>
        <div id="buttons">
            <button v-on:click="YearSearch()">Get Yearly Data</button>
            <button  v-on:click="MonthSearch()">Get Monthly Data</button>
            <button v-on:click="WeekSearch()" >Get Weekly Data</button>
        </div>
        <div id="countryStatsTable">
            <table class="display">
                <thead>
                    <th>Date</th>
                    <th>Critical</th>
                    <th>Deaths</th>
                    <th>Death Ration</th>
                    <th>Recover</th>
                    <th>Recovery Ration</th>
                    <th>Total Cases</th>
                </thead>
                <tbody>
                    <tr v-for="(z, pos) in data" :key="pos">
                        <td>{{z.date}}</td>
                        <td>{{z.critical}}</td>
                        <td>{{z.deaths}}</td>
                        <td>{{z.death_ratio.toFixed(2)}}</td>
                        <td>{{z.recovered}}</td>
                        <td>{{z.recovery_ratio.toFixed(2)}}</td>
                        <td>{{z.total_cases}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="countryStatsGraph">
            <ApexChart type="line" height="350" :options="{
                stroke: {
                    curve: 'straight'
                },
                zoom: {
                    enabled: false
                },
                dataLabels: {
                 enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                 text: 'Country Graph',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: this.date,
                }
            }" 
            :series="[{data: this.case,
                          name: 'cases', }]"></ApexChart>
        </div>
    </div>
</template>

<style>
.display, thead{
    border: 1px solid black ;
    text-align: left;
    font-size: .9em;
}
tr:nth-child(even) {background:blue}
tr:nth-child(odd) {background:coral}

</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import axios, {AxiosResponse} from "axios";
import ApexChart from "vue-apexcharts";

@Component({
    components: {ApexChart}, 
    
    }
)
export default class CountryStats extends Vue {
    @Prop() readonly country!:string;
    private data: any[] = [];
   

    private date: any[] =[]
    private case: string[] =[]
    private prevCont=""
    


    changeCont(): void{
        if(this.country==""){
            console.log("status Vue country not got")
        }
        else if(this.country!=this.prevCont){
            this.prevCont = this.country
            this.WeekSearch()
        }    

    }

    fillDate(): void{
        this.date.splice(0)
        this.data.forEach(e => {  
           this.date.push(e.date)
        }); 
        this.date.reverse()
    }
    fillCase(): void {
        this.case.splice(0)
        this.data.forEach(e => {
           this.case.push(e.total_cases)
        }); 
        this.case.reverse()
    }

    YearSearch(): void{
      const options = {
        url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/year',
        params: {region: this.country},
        headers: {
          'x-rapidapi-key': '098711bbdfmsh21dcfd23d779303p10951bjsnce5d1aafb119',
          'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
      };

      axios.request(options).then((response)=>{
        this.data.splice(0)
        
        console.log(response.data.data);
          
        for(let[key, value] of Object.entries(response.data.data)) {
          var obj = JSON.parse(JSON.stringify(value))
          this.data.push({
            date: key, 
            critical: obj.critical,
            deaths: obj.deaths,
            death_ratio: obj.death_ratio,
            recovered: obj.recovered,
            recovery_ratio: obj.recovery_ratio,
            total_cases: obj.total_cases,
        })
        }
        this.fillDate();
        this.fillCase();

      })
    }
    MonthSearch(): void{
      const options = {
        url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/month',
        params: {region: this.country},
        headers: {
          'x-rapidapi-key': '098711bbdfmsh21dcfd23d779303p10951bjsnce5d1aafb119',
          'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
      };

      axios.request(options).then((response)=>{
        this.data.splice(0)
        
        console.log(response.data.data);
          
        for(let[key, value] of Object.entries(response.data.data)) {
          var obj = JSON.parse(JSON.stringify(value))
          this.data.push({
            date: key, 
            critical: obj.critical,
            deaths: obj.deaths,
            death_ratio: obj.death_ratio,
            recovered: obj.recovered,
            recovery_ratio: obj.recovery_ratio,
            total_cases: obj.total_cases,
        })
        }
        
        this.fillDate();
        this.fillCase();
      })
    }
    WeekSearch(): void{
      const options = {
        url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/week',
        params: {region: this.country},
        headers: {
          'x-rapidapi-key': '098711bbdfmsh21dcfd23d779303p10951bjsnce5d1aafb119',
          'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
      };

      axios.request(options).then((response)=>{
        this.data.splice(0)
        
        console.log(response.data.data);
          
        for(let[key, value] of Object.entries(response.data.data)) {
          var obj = JSON.parse(JSON.stringify(value))
          this.data.push({
            date: key, 
            critical: obj.critical,
            deaths: obj.deaths,
            death_ratio: obj.death_ratio,
            recovered: obj.recovered,
            recovery_ratio: obj.recovery_ratio,
            total_cases: obj.total_cases,
        })
        }
        
        this.fillDate();
        this.fillCase();
      })
    }
}



</script>