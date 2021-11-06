(function(window){

    let defineLibrary = ()=>({
        init : function(gallery){
            let container = document.querySelector(gallery);
            
            if(! container){
                console.error("please create a container for your objZoom");
                return;
            }

            let firstImg = container.querySelector(".small-previw");
            let zoomedImg = container.querySelector(".zoom-img");

            if(! firstImg){
                console.error("Please add image with small-previw class to your gallery");
                return;
            };

            if(! zoomedImg){
                console.log("Please add a zoom-img tag");
                return;
            };

            zoomedImg.style.backgroundImage = `url(${firstImg.src})`;

            container.addEventListener("click" , function(event){
                if(event.target.classList.contains("small-previw")){
                    zoomedImg.style.backgroundImage = `url(${event.target.src})`;
                }
            })
        }
    });

    if(typeof(objZoom)==="undefined"){
        window.objZoom = defineLibrary();
    }else{
        console.log("objZoom already defined")
    }

})(window)