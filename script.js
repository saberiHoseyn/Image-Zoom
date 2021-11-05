(function(window){

    let defineLibrary = ()=>({
        init : function(gallery){
            console.log(gallery)
        }
    });

    if(typeof(objZoom)==="undefined"){
        window.objZoom = defineLibrary();
    }else{
        console.log("objZoom already defined")
    }

})(window)