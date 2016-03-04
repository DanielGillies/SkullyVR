 document.getElementById("prompt").style.display = "inline";
 
 document.addEventListener("click", function() {
     document.getElementById("preloadBlocker").style.display = "none";
     document.getElementById("prompt").style.display = "none";

     init();
     initScripts();
     animate();
     document.removeEventListener("click", arguments.callee, false);
 }, false)
