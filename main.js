var mario = document.getElementById("mario");
var block_left = document.getElementsByClassName("support onscreen");
var block = Array.prototype.slice.call(block_left).sort(function(a,b){
    return getValue(b,"bottom","vh") - getValue(a,"bottom","vh");
});
//TODO NEXT: HEAD HITS ON BLOCK RATHER THAN PASSING THROUGH
function getValue(element, property, units)
{
    if(units == 'vh')
    {
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`))*100/window.innerHeight;   
    }
    else if(units == '%')
    {
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`))*100/window.innerWidth;   
    }
}


function stay() {
    for(var ii = 0; ii < block.length; ii++)
    {
        if(getValue(mario,"bottom","vh") > getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") &&  getValue(mario,"left","%") < getValue(block[ii],"left","%") + getValue(block[ii],"width","%") && getValue(mario,"left","%") + getValue(mario,"width","%") > getValue(block[ii],"left","%"))
        {   
            return ii;          // checks  in descending order
        }
    } 
    return -1;
}

function moveUp(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        var flag = 0;
        jump_start: {
            for(var ii = block.length - 1; ii >  -1; --ii)      //ascending order
            {
                for(var temp = 0; temp < 26; temp++)
                {
                    if(getValue(mario,"left","%") < getValue(block[ii],"left","%") + getValue(block[ii],"width","%") && getValue(mario,"left","%") + getValue(mario,"width","%") > getValue(block[ii],"left","%") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") + temp > getValue(block[ii],"bottom","vh") && getValue(mario,"bottom","vh") + temp < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh"))
                    {
                        mario.style.bottom = getValue(block[ii],"bottom","vh") - getValue(mario,"height","vh") +  "vh";
                        flag = 1;
                        break jump_start;
                    }
                }
            }
        }
        if(flag ==0) {mario.style.bottom = getValue(mario,"bottom","vh") + 25 + "vh";};

    }
    setTimeout(function(){
        if(stay() != -1) //supported
        {
            mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay()],"height","vh") + "vh";
        }
        else {mario.style.bottom = "20vh";}
    },285);
}
function moveDown(e)
{
    if (e.keyCode == '40') {
            // down arrow
        if(stay() != -1)
            {
                mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay(),"height"],"vh") +  "vh";
            }
        else mario.style.bottom = "20vh";
    }
}
function moveSide(e)
{

    if (e.keyCode == '37') {
           // left arrow
        var move_by = 5;
        left_start: {
            for(var ii = block_left.length -1; ii > -1; --ii) {   //right -> left order 
                for(var kk = getValue(mario,"bottom","vh"); kk < getValue(mario,"bottom","vh") + getValue(mario,"height","vh"); ++kk)
                {
                    if(kk < getValue(block_left[ii],"bottom","vh") + getValue(block_left[ii],"height","vh")
                    && kk > getValue(block_left[ii],"bottom","vh") && getValue(mario,"left","%") > getValue(block_left[ii],"left","%"))
                    {
                        move_by = getValue(mario,"left","%") - getValue(block_left[ii],"left","%") - getValue(block_left[ii],"width","%");
                        if (move_by > 5){move_by = 5};
                        break left_start;
                    }
                } 
            }
        }
        for(var ii = block_left.length - 1; ii >  -1; --ii) {
            block_left[ii].style.left = getValue(block_left[ii],"left","%") + move_by + "%";
        }             
    }
    else if (e.keyCode == '39') {
        // right arrow
        var move_by = 5;
        right_start: {
            for(var ii = 0; ii < block_left.length; ++ii) {   //left -> right order 
                for(var kk = getValue(mario,"bottom","vh"); kk < getValue(mario,"bottom","vh") + getValue(mario,"height","vh"); ++kk)
                {
                    if(kk < getValue(block_left[ii],"bottom","vh") + getValue(block_left[ii],"height","vh")
                    && kk > getValue(block_left[ii],"bottom","vh") && getValue(mario,"left","%") + getValue(mario,"width","%") < getValue(block_left[ii],"left","%") + getValue(mario,"width","%"))
                    {
                        move_by = - getValue(mario,"left","%") - getValue(mario,"width","%") + getValue(block_left[ii],"left","%");
                        if (move_by > 5){move_by = 5};
                        break right_start;
                    }
                } 
            }
        }
        for(var ii = block_left.length - 1; ii >  -1; --ii) {
            block_left[ii].style.left = getValue(block_left[ii],"left","%") - move_by + "%";
        }
    }    
}

    window.addEventListener("keydown",moveUp);
    window.addEventListener("keydown",moveDown);
    window.addEventListener("keydown",moveSide);
    if(stay() != -1) {
        mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay()],"height","vh") + "vh";
    }
    else mario.style.bottom = "20vh";
   