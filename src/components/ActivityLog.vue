<template>
    <div id="ActivityLog">
        <h2>Activity Log</h2>
        <div id="list">
            <ul >
                <li><b>Selecting a country from the dropDown will change the 
                 name at the title of "Trends in..", but you need to click on what
                kind of data you want for it to display in the table and the graph </b></li>
                <li>Not implemented due to not knowing how to send data 
                back and forth between all the components.</li>
                <li>I can bind data from app to the components, but 
                was having trouble going the other way.</li>
                <li>In this Component, but also with the "countryStatus" 
                Component, I was having an issue trying to make a function
                call either through props, or having a "watcher" on the 
                data so it would trigger the function when the prop changes.  </li>
                <li>I was also confused as to why we needed to have any DB integration
                when the API would act like a "db" in a sense that each call would result 
                in the data that we want, and can be saved localy, and manipulated, and since
                there's no "sessionID" issues going on, when the user wants data, they can just get it
                directly from the API, instead of storing it elsewhere </li>
                
            </ul>
 
        </div>
    </div>
</template>

<style>

</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ActivityLog extends Vue {
@Prop() msg!: string
private msgLog:string[] = []

AddtoList(): void{
    this.msgLog.push(this.msg)
}



}
</script>