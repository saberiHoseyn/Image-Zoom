(function(window){

    let defineLibrary = ()=> ({
        init : function(imageId){
            let elImage , imageBox, zoomContainer, zoomLens, zoomResult;

            elImage = document.querySelector(imageId);

            if(!elImage){
                console.error(`image element does't exist`);
                return;
            };

            
            elImage.addEventListener("mouseenter" , function(e){
                
                //---------Geting the elImage data's with function "getBoundingClientRect()"-----------------
                imageBox = elImage.getBoundingClientRect();
                console.log(imageBox)

                //---------create element zoomContainer and styling and positioning-----------------
                zoomContainer = document.createElement("div");
                zoomContainer.classList.add("zoom-container");
                zoomContainer.style.width = `${imageBox.width}px`;
                zoomContainer.style.height = `${imageBox.height}px`;
                zoomContainer.style.position = "absolute";
                zoomContainer.style.top = `${imageBox.top + window.pageYOffset}px`;
                zoomContainer.style.left = `${imageBox.left + window.pageXOffset}px`;
                
                //---------create element zoomLens----------------
                zoomLens = document.createElement("div");
                zoomLens.classList.add("zoom-img-lens");

                //---------create element zoomResult-----------------
                zoomResult = document.createElement("div");
                zoomResult.classList.add("img-zoom-result");

                //---------insert element zoomContainer, zoomResult and zoomLens in beforeend the body-----------------
                zoomContainer.insertAdjacentElement("afterbegin" , zoomLens);
                zoomContainer.insertAdjacentElement("afterbegin" , zoomResult);
                document.querySelector("body").insertAdjacentElement("beforeend" , zoomContainer);

                //---------ZOOM RESULT POSITION-----------------
                zoomResult.style.top = `${imageBox.bottom + window.pageYOffset}px`;
                zoomResult.style.left = "0px";

                //---------Calc: the ratio between dimensions element zoomResult AND zoomLens-----------------
                let cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
                let cy = zoomResult.offsetHeight / zoomLens.offsetHeight;

                //---------adding background image to the zoomResult and set background size-----------------
                zoomResult.style.backgroundImage = `url("${elImage.src}")`;
                zoomResult.style.backgroundSize = `${elImage.width * cx}px ${elImage.height * cy}px`;
                
                //---------add Event Listener onMouseMove over the zoomContainer-----------------
                zoomContainer.addEventListener("mousemove" , function(event){
    
                    //---------calculate and Getting the position of move the mouse within the zoomContainer-----------------
                    let x =( event.clientX) - imageBox.left;
                    let y = (event.clientY + window.pageYOffset) - imageBox.top;
                    
                    //---------calculate Aligning the zoomLens's center with the mouse cursor-----------------
                    x -= (zoomLens.offsetWidth / 2)
                    y -=  (zoomLens.offsetHeight / 2)
                    
                    //---------How not to go from inside the zoomContainer to  outside it.-----------------
                    if(x > imageBox.width - zoomLens.offsetWidth){ x = imageBox.width - zoomLens.offsetWidth };
                    if(x < 0){ x = 0 }
                    
                    if(y > imageBox.height - zoomLens.offsetHeight){ y = imageBox.height - zoomLens.offsetHeight };
                    if(y < 0){ y = 0 }
                    
    
                    //---------zoomLens position on mouse move-----------------
                    zoomLens.style.left = `${x}px`;
                    zoomLens.style.top = `${y}px`;
    
                    //---------background position of zoomResult on mouse move-----------------
                    zoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
                });

                zoomContainer.addEventListener("mouseleave" , function(){
                    this.remove();
                });
            });
        }
    });
    
    
    //---------How not to set a zoom object already seated?-----------------
    if(typeof(objZoom) === "undefined"){
        window.objZoom = defineLibrary();
    }else{
        console.error("objZoom already defined")
    };

})(window);