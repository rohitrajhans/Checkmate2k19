var mario = document.getElementById("mario");
var block_left = document.getElementsByClassName("support onscreen");
var game = document.getElementById("map");
var block = Array.prototype.slice.call(block_left).sort(function(a,b){
    return getValue(b,"bottom","vh") - getValue(a,"bottom","vh");
});
var flag_up = true;                  //what is it's use
//make screen move with the character
//TODO NEXT: HEAD HITS ON BLOCK RATHER THAN PASSING THROUGH
function getValue(element, property, units){
    if(units == 'px'){
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`))*100/window.innerHeight;   
    }
    else if(units == '%'){
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`))*100/window.innerWidth;   
    }
}

function stay() { //checks whether mario is on the block 
    for(var ii = 0; ii < block.length; ii++){                         //why are we using this loop                  

        if(getValue(mario,"bottom","vh") >= getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") &&  getValue(mario,"left","%") < getValue(block[ii],"left","%") + getValue(block[ii],"width","%") && getValue(mario,"left","%") + getValue(mario,"width","%") > getValue(block[ii],"left","%")){   
            return ii;          // checks  in descending order
        }
    } 
    return -1;
}

var speed = 2;
var pixelx = 0;
var direction = 1;  // not used rn
var key_left = false;
var key_right = false;
var jumping = false;

function handleKeyDown(event){
    if (event.keyCode == 37) 
        key_left = true;
    else if (event.keyCode == 39)
        key_right = true;
    moveSide();
}

function handleKeyUp(event){
    if (event.keyCode == 37) 
        key_left = false;
    else if (event.keyCode == 39)
        key_right = false;
}
    
function onb(){  //checks if on block and moves mario down if reqd
    if(stay() != -1) 
    {       
        mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay()],"height","vh") + "vh";
    }
    else { mario.style.bottom = "20vh";}
}
var falling;
/*function moveUp(e) {                        //moveup and movedown functions are justnot understandable
    e = e || window.event;
    if (e.keyCode == '38') {
        moveSide();
        window.removeEventListener("keydown",moveUp);
        clearTimeout(falling);
        flag_up = false;
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
        if(flag == 0) {mario.style.bottom = getValue(mario,"bottom","vh") + 25 + "vh";};
        setTimeout(function(){window.addEventListener("keydown",moveUp);flag_up = true},585);
    }     
    falling = setTimeout(onb,285);      // called for any key press.
}

function moveDown(e)
{
    if (e.keyCode == '40') {
        // down arrow
        if(flag_up == false){
            flag_up = true;
            window.addEventListener("keydown",moveUp);
        }
        if(stay() != -1)
        {
            mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay(),"height"],"vh") +  "vh";
        }
        else mario.style.bottom = "20vh";
    }
}*/


function check_right()
{
    for(var ii = block.length - 1; ii >= 0; --ii)
    {
        var b_left = getValue(block[ii],"left","%") - speed;

        if(getValue(mario,"left","%") + getValue(mario,"width","%") > b_left && getValue(mario,"left","%") + getValue(mario,"width","%") < b_left + getValue(block[ii],"width","%"))   
        {
            if( (getValue(mario,"bottom","vh") + getValue(mario,"height","vh") < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh")) ||
            ( getValue(mario,"bottom","vh") < getValue(block[ii],"bottom","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh")) ||
            ( getValue(mario,"bottom","vh")  < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh")  > getValue(block[ii],"bottom","vh")))
                {
                    return ii;
                }        
        }
    }
    return -1;
}


function check_left()
{
    for(var ii = block.length - 1; ii >= 0; --ii)
    {
        var b_right = getValue(block[ii],"left","%") + getValue(block[ii],"width","%") + speed;

        if(getValue(mario,"left","%")  <= b_right && getValue(mario,"left","%") >= b_right - getValue(block[ii],"width","%"))
        { 
            if( (getValue(mario,"bottom","vh") + getValue(mario,"height","vh") < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh")) ||
            ( getValue(mario,"bottom","vh") < getValue(block[ii],"bottom","vh") && getValue(mario,"bottom","vh") + getValue(mario,"height","vh") > getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh")) ||
            ( getValue(mario,"bottom","vh")  < getValue(block[ii],"bottom","vh") + getValue(block[ii],"height","vh") && getValue(mario,"bottom","vh")  > getValue(block[ii],"bottom","vh")))
                return ii;
        }
    }
    return -1;
}

/*function moveSide()
{
    if (key_left == true) {
        // left arrow
        if(check_left() == -1)
        {   
            pixelx += speed;  
            console.log(1);
        }
        else{  
            console.log(1);
            pixelx += getValue(mario,"left","px") - getValue(block[check_left()],"left","px") - getValue(block[check_left()],"width","px");}
        for(var ii = 0; ii < block.length; ii++)
        {   
            game.style.left = getValue(game,"left","px") + pixelx + "px";
              
            console.log(1);// mario.style.left = getValue(mario,"left"."%") + (2*pixelx) + "%";
        }
        pixelx = 0;
    }

    if (key_right == true) {
        // right arrow
        if(check_right() == -1)
        {
            pixelx += speed;
        }
        else pixelx +=  getValue(block[check_right()],"left","%") - getValue(mario,"left","%") - getValue(mario,"width","%");
        for(var ii = 0; ii < block.length; ii++)
        {
           block[ii].style.left = getValue(block[ii],"left","%") - pixelx + "";
        }
        pixelx = 0;
    }
}*/

function setSvgAttribute( element, attributeName, attributeValue) {
    element.setAttribute( attributeName, attributeValue);
}

function transformSvgElement( element,  x, y) {
        setSvgAttribute( element, 'transform', 'translate(' + x + ', ' + y + ' )');
}

function getTransformValues(mario) {
    var values = mario.getAttribute('transform').split('translate(').join(',').split(')').join(',').split(',');
    return [parseFloat(values[1]), parseFloat(values[2])];
}

function movemario(e) {
    if(e.keyCode == '37') {

        transformSvgElement(mario, getTransformValues(mario)[0] - 2, getTransformValues(mario)[1]);
    }
    else if(e.keyCode == '39') {
        transformSvgElement(mario, getTransformValues(mario)[0] + 2, getTransformValues(mario)[1]);
    }
   /* else if(e.keyCode == '38'){//jump
        transformSvgElement(mario, getTransformValues(mario)[0] , getTransformValues(mario)[1] - 75);
    }*/
}

// window.addEventListener("keydown",moveUp);
// window.addEventListener("keydown",moveDown);
// window.addEventListener("keydown",handleKeyDown);
// window.addEventListener("keyup",handleKeyUp);

window.addEventListener("keydown", movemario);
/*if(stay() != -1) {
    mario.style.bottom = getValue(block[stay()],"bottom","vh") + getValue(block[stay()],"height","vh") + "vh";
}
else mario.style.bottom = "20vh";*/

var Left = 0;

function Move(e){//left right movement of the background.
    
    if(e.keyCode == 37){//left
        Left += 6;
        if(Left<=0){
        game.style.left = Left + "px";
        }
    }
    if(e.keyCode == 39){//right
         Left -= 6;
        game.style.left = Left + "px";
    }
}

document.onkeydown = Move;


