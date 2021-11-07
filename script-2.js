(function(window){
    let defineLibrary = ()=>({
        init : function(imageId){
            let elImage , imageBox, zoomContainer, zoomLens;

            elImage = document.querySelector(imageId);
            imageBox = elImage.getBoundingClientRect();
            
            zoomContainer = document.createElement("div");
            zoomContainer.classList.add("zoom-container");
            zoomContainer.style.width = `${imageBox.width}px`;
            zoomContainer.style.height = `${imageBox.height}px`;
            zoomContainer.style.position = "absolute";
            zoomContainer.style.top = `${imageBox.top + window.pageYOffset}px`;
            zoomContainer.style.left = `${imageBox.left + window.pageXOffset}px`;
            
            zoomLens = document.createElement("div");
            zoomLens.classList.add("zoom-img-lens");
            


            elImage.addEventListener("mouseenter" , function(event){
                document.querySelector("body")
                .insertAdjacentElement("beforeend" , zoomContainer);
            });

            zoomContainer.addEventListener("mousemove" , function(event){
                zoomContainer.insertAdjacentElement("afterbegin" , zoomLens);

                let x = event.clientX - imageBox.left;
                let y = event.clientY - imageBox.top;

                x -= (zoomLens.offsetWidth / 2)
                y -= (zoomLens.offsetHeight / 2)
                console.log(imageBox.width - zoomLens.offsetWidth)
                if(x < 0){ x = 0}
                if(x > imageBox.width - zoomLens.offsetWidth){ x = imageBox.width - zoomLens.offsetWidth }
                if(y < 0){ y = 0}
                if(y > imageBox.height - zoomLens.offsetHeight){ y = imageBox.height - zoomLens.offsetHeight }


                zoomLens.style.left = `${x}px`;
                zoomLens.style.top = `${y}px`;
            })
        }
    })
    

    if(typeof(objZoom) === "undefined"){
        window.objZoom = defineLibrary();
    }else{
        console.error("objZoom already defined")
    }

    


})(window)