window.onscroll = function(){
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        document.getElementById("top-button").classList.remove("invisible");
        document.getElementById("top-button").classList.add("visible");
    }else{
        document.getElementById("top-button").classList.add("invisible");
        document.getElementById("top-button").classList.remove("visible");
    }
};


document.getElementById("top-button").onclick = function(){
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
}