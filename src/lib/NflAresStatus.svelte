<script lang="ts">
    import { onMount } from "svelte";
    import { writable, derived } from "svelte/store";
    import { Circle2 } from "svelte-loading-spinners";

    export let width = `${400}px`;

    let isLoading = true;

    const apiData = writable("");
    const currentStatus = derived(apiData, ($apiData) => {
        if ($apiData) {
            return $apiData;
        }
        return "";
    });
    
    onMount(async () => {
        await fetch("https://ares-status-api.azurewebsites.net/ares-status-nfl", {method: "GET",cache: "no-cache"})
        .then(response => response.json())
        .then(data => {
            console.log("response: " + data);
            isLoading = false;
            apiData.set(data.imageURI);
        }).catch(error => {
            isLoading = false;
            console.log(error);
            return "";
        });
    });
  </script>
  
  <svelte:options tag="nflares-status" />
  
  {#if isLoading}
    loading...
    <Circle2 size="400" unit="px" />
  {:else}
    <a href="https://arrl-nfl.org/ares/activation-status/"><img src="{$currentStatus}" alt="{$currentStatus}" class="nflares-status" style="--width:{width}" /></a>
  {/if}

  <style>
	.nflares-status {
		width: var(--width);
	}
  </style>