<script>
  export let src;
  export let alt;
  export let className = "";
</script>

<picture>
  <source type="image/webp" class={className} srcset="{src}.webp" />
  <source type="image/png" srcset="{src}.png" class={className} />
  <img class={className} src="{src}.png" {alt} />
</picture>
