<template>
    <div id="ActivityLog">
        <h2>Activity Log</h2>
        <div id="list">
            <ul >
                <li><b>Selecting a country from the dropDown will change the 
                 name at the title of "Trends in..", but you need to click on what
                kind of data you want for it to display in the table and the graph </b></li>
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