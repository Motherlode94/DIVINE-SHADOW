/* DIVINE SHADOW — recadrage exact des affiches contenant des titres.
   Les sources originales restent intactes. On ne rogne que la bande typographique.
   Crop identique dans la galerie et sur les fiches individuelles. */
(() => {
  const bottomByName = new Map([
    ["vaelkor_portrait.png", 204],
    ["nyssara_portrait.png", 204],
    ["orvann_portrait.png", 204]
  ]);
  function cropPortrait(img) {
    if (!img || img.dataset.portraitCropped === "yes") return;
    const filename = decodeURIComponent(new URL(img.currentSrc || img.src, location.href).pathname.split("/").pop());
    const cut = bottomByName.get(filename);
    if (!cut) return;
    if (!img.complete || !img.naturalWidth) { img.addEventListener("load", () => cropPortrait(img), {once:true}); return; }
    img.dataset.portraitCropped = "yes";
    const sourceWidth = img.naturalWidth;
    const sourceHeight = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = sourceWidth;
    canvas.height = Math.max(1, sourceHeight - cut);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img,0,0,sourceWidth,canvas.height,0,0,sourceWidth,canvas.height);
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        img.addEventListener("load", () => URL.revokeObjectURL(url), {once:true});
        img.src = url;
      }
    }, "image/png");
  }
  function apply() {
    document.querySelectorAll("img.portrait-photo, img#profile-image").forEach(cropPortrait);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",apply,{once:true}); else apply();
  document.addEventListener("divine:portrait-ready",apply);
})();
