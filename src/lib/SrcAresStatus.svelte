<svelte:options tag="srcares-status" />

<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";

  export let width = `${400}px`;

  const apiData = writable("");
  const currentStatus = derived(apiData, ($apiData) => {
    if ($apiData) {
      return $apiData;
    }
    return "";
  });

  onMount(async () => {
    await fetch("https://ares-status-api.azurewebsites.net/ares-status-src", {
      method: "GET",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response: " + data);

        apiData.set(data.imageURI);
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
  });
</script>

<a href="https://srcares.org/activation-level-status/"
><img
  src={$currentStatus}
  alt={$currentStatus}
  class="srcares-status"
  style="--width:{width}"
/></a
>

<style>
  .srcares-status {
    width: var(--width);
  }
</style>
