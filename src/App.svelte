<script>
  import { afterUpdate } from "svelte";
  export let setPage;
  export let payload;
  import routes from "./generated/routes";
  import states from "./states";

  const getRoute = routes => route => {
    try {
      let target = routes.find(function(o) {
        return o.route == route;
      });
      return target.component;
    } catch (e) {
      try {
        //if running on server set header status to 404
        ctx.res.writeStatus("404");
      } catch (e) {}
      page.set("/_404");
    }
  };
  const Route = getRoute(routes);
  let page = states.page;
  if (setPage) {
    page.set(setPage);
  }

  afterUpdate(() => {
    document.querySelectorAll("a").forEach(el => {
      el.addEventListener("click", e => {
        e.target.getAttribute("target");
        if (e.target.getAttribute("target") == undefined) {
          e.preventDefault();
          let url = e.target.getAttribute("href");
          page.set(url);
          //history.pushState(1, url.replace("/", ""), url);
        }
      });
    });

    document.querySelectorAll(".nav").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        let url = e.target.getAttribute("page");
        page.set(url);
        //history.pushState(1, url.replace("/", ""), url);
      });
    });
  });
</script>

<svelte:component this={Route($page)} {payload} />
