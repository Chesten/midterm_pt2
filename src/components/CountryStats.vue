<template>
    <div id="Country Stats">
        <div id="dropDownSearch">

        </div>
        <h2>Trends in {{country}}</h2>
        <div id="buttons">

        </div>
        <div id="countryStatsTable">
            <table class="display">
                <thead>
                    <td>Date</td>
                    <td>Critical</td>
                    <td>Deaths</td>
                    <td>Death Ration</td>
                    <td>Recover</td>
                    <td>Recovery Ration</td>
                    <td>Total Cases</td>
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
            
        </div>
    </div>
</template>

<style>
.display, thead{
    border: 1px solid black ;
    
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CountryStats extends Vue {
    @Prop() readonly country!:string;
    @Prop() readonly data!: any;
}
</script>