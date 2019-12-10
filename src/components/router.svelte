<script>
  import { beforeUpdate, onMount } from "svelte";
  import Home from "../pages/index.svelte";
  import states from "../states";
  let page = states.page;
</script>

<div>

  {#if $page == '/index'}
    <Home />
  {:else}
    <Home />
  {/if}
</div>
