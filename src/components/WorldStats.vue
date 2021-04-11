<template>
    <div id="WorldStats">
        <h2>World Statistics</h2>
        <div id="buttons">
            <button v-on:click="NameSort()">Sort by Contry</button>
            <button v-on:click="TotalCasesSort()">Sort by Total Cases (desc)</button>
            <button v-on:click="RecoverySort()">Sort by Percentage of Recovery (asc)</button>
        </div>
        <div id="worldStatsTable">
            <table class="worldstats">
                <thead>
                    <th>Country</th>
                    <th>Total Cases</th>
                    <th>Percentage of Recovery</th>
                    <th>Percentage of Death</th>
                </thead>
                <tbody>
                    <tr v-for="(z, pos) in data" :key="pos" v-bind:class="range(z)">
                        
                        <td>{{z.name}}</td>
                        <td>{{z.totalCases}}</td>
                        <td>{{((z.RecoveryRate) *100).toFixed(2)}}%</td>
                        <td>{{((z.DeathRate)*100).toFixed(2)}}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.worldstats, thead{
    border: 1px solid black ;
    text-align: left;
    font-size: .9em;
}
.good{
    background: green;
}
.bad{
    background: red;
}
.ok{
    background: yellow;
}

</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class WorldStats extends Vue {
    @Prop() readonly data!: any[]

    range(z:any):any{
        if(z.RecoveryRate<0.5){
            return "bad"
        }
        else if(z.RecoveryRate > 0.85){
            return "good"
        }
        else return "ok"
    }


    NameSort(): void{
        this.data.sort(function(a, b){
            var nameA = a.name.toUpperCase()
            var nameB = b.name.toUpperCase()
            if(nameA<nameB) return -1
            else if(nameA>nameB) return 1
            else return 0
        })
    }
    TotalCasesSort():void{
        this.data.sort(function(a, b){
            var nameA = a.totalCases
            var nameB = b.totalCases
            if(nameA>nameB) return -1
            else if(nameA<nameB) return 1
            else return 0
        })
    }
    RecoverySort():void{
        this.data.sort(function(a, b){
            var nameA = a.RecoveryRate
            var nameB = b.RecoveryRate
            if(nameA>nameB) return -1
            else if(nameA<nameB) return 1
            else return 0
        })
    }

}
</script>