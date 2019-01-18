var mario = document.getElementById("mario");
var block = document.getElementsByClassName("support onscreen");
//TODO NEXT: HEAD HITS ON BLOCK RATHER THAN PASSING THROUGH

function stay() {
    for(var ii = 0; ii < block.length; ii++)
    {
        if(parseInt(window.getComputedStyle(mario).getPropertyValue("bottom")) > parseInt(window.getComputedStyle(block[ii]).getPropertyValue("bottom")) + parseInt(window.getComputedStyle(block[ii]).getPropertyValue("height")) &&  ((parseInt(window.getComputedStyle(mario).getPropertyValue("left")) + parseInt(window.getComputedStyle(mario).getPropertyValue("width")) >   parseInt(window.getComputedStyle(block[ii]).getPropertyValue("left")))   &&  parseInt(window.getComputedStyle(mario).getPropertyValue("left")) + parseInt(window.getComputedStyle(mario).getPropertyValue("width")) < parseInt(window.getComputedStyle(block[ii]).getPropertyValue("left")) + parseInt(window.getComputedStyle(block[ii]).getPropertyValue("width"))))
        {   
            return ii;
        }
    } 

    return -1;
}

function move(e) {
    console.log(parseInt(window.getComputedStyle(mario).getPropertyValue("left")) + parseInt(window.getComputedStyle(mario).getPropertyValue("width")));
    console.log(stay());
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        mario.style.bottom = parseInt(window.getComputedStyle(mario).getPropertyValue("bottom"))*100/window.innerHeight + 25 + "vh" ;
            
    }
    else if (e.keyCode == '40') {
        // down arrow
        if(stay() != -1)
        {
            mario.style.bottom = parseInt(window.getComputedStyle(block[stay()]).getPropertyValue("bottom"))*100/window.innerHeight + parseInt(window.getComputedStyle(block[stay()]).getPropertyValue("height"))*100/window.innerHeight + "vh";
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
       for(var counter in block)
       {
            block[counter].style.left = parseInt(window.getComputedStyle(block[counter]).getPropertyValue("left"))*100/window.innerWidth + 5 + "%";
       }
    }
    else if (e.keyCode == '39') {
       // right arrow
       for(var counter in block)
       {
            block[counter].style.left = parseInt(window.getComputedStyle(block[counter]).getPropertyValue("left"))*100/window.innerWidth - 5 + "%";
       }
       
    }
    setTimeout(function(){if(stay() != -1) //supported
        {
            mario.style.bottom = parseInt(window.getComputedStyle(block[stay()]).getPropertyValue("bottom"))*100/window.innerHeight + parseInt(window.getComputedStyle(block[stay()]).getPropertyValue("height"))*100/window.innerHeight +  "vh";
        }
        else mario.style.bottom = "20vh"},285);
    
}

    window.addEventListener("keydown",move);