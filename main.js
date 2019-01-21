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
        if(getValue(mario,"bottom","vh") >= getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") &&  getValue(mario,"left","%") < getValue(block[ii],"left","%") + getValue(block[ii],"width","%") && getValue(mario,"left","%") + getValue(mario,"width","%") > getValue(block[ii],"left","%"))
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


function check_right()
{
    
     for(var ii = block.length - 1; ii >= 0; --ii)
     {
        var b_left = getValue(block[ii],"left","%") - 5;

        if(getValue(mario,"left","%") + getValue(mario,"width","%") >= b_left && getValue(mario,"left","%") + getValue(mario,"width","%") <= b_left + getValue(block[ii],"width","%"))
            
            {
                
                if( (getValue(mario,"bottom","vh") + getValue(mario,"height","vh") < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh")) ||
                ( getValue(mario,"bottom","vh") < getValue(block[ii],"bottom","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh")) ||
                ( getValue(mario,"bottom","vh")  < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh")  >= getValue(block[ii],"bottom","vh")))
                return ii;
            }
     }
     return -1;
}



function moveSide(e)

{

    if (e.keyCode == '37') {

           // left arrow

        for(var ii = 0; ii < block.length; ii++)

        {

            block[ii].style.left = getValue(block[ii],"left","%") + 5 + "%";

        }

    }

    else if (e.keyCode == '39') {

        // right arrow
        var x = 5, flag = 0 ;

       for(var ii = 0; ii < block.length; ii++)

        {
            if(!flag)
            {
                var test = check_right( );
                
                if(test != -1)
                {
                    x = getValue(block[test],"left","%") - getValue(mario,"left","%") - getValue(mario,"width","%");
                }

            }  
            

            block[ii].style.left = getValue(block[ii],"left","%") - x + "%";
            flag = 1;

        }

    }

    if(stay() != -1) {

        mario.style.down = 100 - getValue(block[stay()],"top","vh") + "vh";

    }

    else mario.style.down = "20vh";            

}


    window.addEventListener("keydown",moveUp);
    window.addEventListener("keydown",moveDown);
    window.addEventListener("keydown",moveSide);
    if(stay() != -1) {
        mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay()],"height","vh") + "vh";
    }
    else mario.style.bottom = "20vh";
