function getValue(element, property, units) { // property can only be x or y or height or width
    // returns properties in fraction of vh/width
    // origin is set to bottom left corner
    if (property == 'x') {
        return parseFloat(element.getAttribute('transform').split('translate(').join(',').split(')').join(',').split(',')[1]) * 100 / 3360; // 3360 is viewport width of svg
    }
    if (property == 'y') {
        return parseFloat(480 - element.getAttribute('transform').split('translate(').join(',').split(')').join(',').split(',')[2]) * 100 / 480; // 480 is viewport height if svg       
    }
    if (property == 'height') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerHeight;
    }
    if (property == 'width') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerWidth;
    }
}

function getValueBlock(element, property) {
    var block_group_num = parseInt(element.classList[3]);
    if (block_group_num == 0) {
        return 456;
    } else {
        if (property == 'x') {
            // console.log('BlockGroup'  + block_group_num);
            // console.log(document.getElementById('Blocks'));
            return getValue(document.getElementById('Blocks'), 'x', '%') + getValue(document.getElementById('BlockGroup' + block_group_num), 'x', '%') + (parseFloat(element.getAttribute('x')) * 100 / 3360);
        }
        if (property == 'y') {
            return getValue(document.getElementById('Blocks'), 'y', 'vh') + getValue(document.getElementById(`BlockGroup${block_group_num}`), 'y', 'vh') + ((480 - parseFloat(element.getAttribute('y'))) * 100 / 480);
        }
        if (property == 'height') {
            return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerHeight;
        }
        if (property == 'width') {
            return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerWidth;
        }
    }
}

function getValueGroup(element, property) {
    var group_num = parseInt(element.classList[3]);
    if (property == 'x') {
        return getValue(document.getElementById(`Group${group_num}`), 'x', '%') + (parseFloat(element.getAttribute('x')) * 100 / 3360);
    }
    if (property == 'y') {
        return getValue(document.getElementById(`Group${group_num}`), 'y', 'vh') + ((480 - parseFloat(element.getAttribute('y')) * 100 / 480));
    }
    if (property == 'height') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerHeight;
    }
    if (property == 'width') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerWidth;
    }
}

function getValuePipes(element, property) {
    if (property == 'x') {
        return getValue(document.getElementById('Pipes'), 'x', '%') + (parseFloat(element.getAttribute('x')) * 100 / 3360);
    }
    if (property == 'y') {
        return getValue(document.getElementById('Pipes'), 'y', 'vh') + ((480 - parseFloat(element.getAttribute('y')) * 100 / 480));
    }
    if (property == 'height') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerHeight;
    }
    if (property == 'width') {
        return parseFloat(element.getBoundingClientRect().height) * 100 / window.innerWidth;
    }
}
var rest_left = [];
var rest_top = [];

var blocks_svg = document.getElementsByClassName("blocks");
for (var ii = 0; ii < blocks_svg.length; ++ii) {
    var temp = {
        "left": getValueBlock(blocks_svg[ii], 'x'),
        "bottom": getValueBlock(blocks_svg[ii], 'y'),
        "width": getValueBlock(blocks_svg[ii], 'width'),
        "height": getValueBlock(blocks_svg[ii], 'height')
    };
    temp.right = temp.left + temp.width;
    temp.top = temp.bottom + temp.height;
    rest_left.push(temp);
}
var groups_svg = document.getElementsByClassName("group");
for (var ii = 0; ii < groups_svg.length; ++ii) {
    var temp = {
        "left": getValueBlock(groups_svg[ii], 'x'),
        "bottom": getValueBlock(groups_svg[ii], 'y'),
        "width": getValueBlock(groups_svg[ii], 'width'),
        "height": getValueBlock(groups_svg[ii], 'height')
    };
    temp.right = temp.left + temp.width;
    temp.top = temp.bottom + temp.height;
    rest_left.push(temp);
}
var pipes_svg = document.getElementsByClassName("group");
for (var ii = 0; ii < pipes_svg.length; ++ii) {
    var temp = {
        "left": getValueBlock(pipes_svg[ii], 'x'),
        "bottom": getValueBlock(pipes_svg[ii], 'y'),
        "width": getValueBlock(pipes_svg[ii], 'width'),
        "height": getValueBlock(pipes_svg[ii], 'height')
    };
    temp.right = temp.left + temp.width;
    temp.top = temp.bottom + temp.height;
    rest_left.push(temp);
}
rest_left = rest_left.sort(function(a, b) {
    return b.x - a.x;
}) // left to right
for (var jj = 0; jj < rest_left.length; ++jj) {
    rest_top.push(rest_left[jj]);
}
rest_top = rest_top.sort(function(a, b) {
    return b.top - a.top;
}) // top to bottom

var mario = {"element":document.getElementById("mario")};
mario.left = getValue(mario.element, 'x','%');
mario.bottom = getValue(mario.element, 'y',"vh");
mario.width =  getValue(mario.element, 'width',"%");
mario.height = getValue(mario.element, 'height',"vh");
mario.right = mario.left + mario.width;
mario.top = mario.bottom + mario.height;
mario.defaultbottom = (480 - 433)*100/480;

function updateMario(){
    mario.left = getValue(mario.element, 'x','%');
    mario.bottom = getValue(mario.element, 'y',"vh");
    mario.width =  getValue(mario.element, 'width',"%");
    mario.height = getValue(mario.element, 'height',"vh");
    mario.right = mario.left + mario.width;
    mario.top = mario.bottom + mario.height;
}

var game = document.getElementById("game");         // game is the entire svg wrapper


/***************************************************************/
function setSvgAttribute(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
}

function transformSvgElement(element, x, y) {
    x = x*3360/100;
    y = 480 - (y*480/100);
    setSvgAttribute(element, 'transform', 'translate(' + x + ', ' + y + ' )');
    updateMario();
}
var flag_up = true;
// var jump_dur = parseFloat(window.getComputedStyle(mario).getPropertyValue("transition-duration"))*1000;    //in ms
var jump_dur = 200;         //ms

function stay() {
    for (var ii = 0; ii < rest_top.length; ii++) {
        if (mario.bottom >= rest_top[ii].top && mario.left < rest_top[ii].right && mario.right > rest_top[ii].left) {
            return ii; // checks  in descending order
        }
    }
    return -1;
}

var speed = 8;
var pixelx = 0;
var direction = 1; // not used rn
var key_left = false;
var key_right = false;
var jumping = false;

function handleKeyDown(event) {
    if (event.keyCode == 37)
        key_left = true;
    else if (event.keyCode == 39)
        key_right = true;
    moveSide();
}

function handleKeyUp(event) {
    if (event.keyCode == 37)
        key_left = false;
    else if (event.keyCode == 39)
        key_right = false;
}

function onb() { //checks if on block and moves char down if reqd
    if (stay() != -1) {
        transformSvgElement(mario.element,mario.left,rest_top[stay()].top);
    } else {
        transformSvgElement(mario.element,mario.left,mario.defaultbottom);
    }
}
var falling;
function moveUp(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        moveSide();
        window.removeEventListener("keydown", moveUp);
        clearTimeout(falling);
        flag_up = false;
        // up arrow
        var flag = 0;
        jump_start: {
            for (var ii = rest_top.length - 1; ii > -1; --ii) //ascending order
            {
                for (var temp = 0; temp < 26; temp++) // 25 is the normal jump height
                {
                    if (mario.left < rest_top[ii].right && mario.right > rest_top[ii].left && mario.top + temp > rest_top[ii].bottom && mario.bottom + temp < rest_top[ii].top) {
                        transformSvgElement(mario.element,mario.left,rest_top[ii].bottom - mario.height);
                        flag = 1;
                        break jump_start;
                    }
                }
            }
        }
        if (flag == 0) {
            transformSvgElement(mario.element,mario.left,mario.bottom + 25);
        };
        setTimeout(function() {
            window.addEventListener("keydown", moveUp);
            flag_up = true
        }, (2 * jump_dur) - (jump_dur / 20));
    }
    falling = setTimeout(onb, jump_dur - (jump_dur / 20)); // called for any key press.
}

function moveDown(e) {
    if (e.keyCode == '40') {
        // down arrow
        if (flag_up == false) {
            flag_up = true;
            window.addEventListener("keydown", moveUp);
        }
        if (stay() != -1) {
            transformSvgElement(mario.element,mario.left,rest_top[stay()].top);
        } 
        else transformSvgElement(mario.element,mario.left,mario.defaultbottom);
    }
}


function check_right() {
    for (var ii = rest_left.length - 1; ii >= 0; --ii) {
        var b_left = rest_left[ii].left - speed;

        if (mario.right > b_left && mario.right < b_left + rest_left[ii].width) {
            if ((mario.top < rest_left[ii].top && mario.top > rest_top[ii].top) ||
                (mario.top < rest_left[ii].bottom &&mario.top > rest_left[ii].top) ||
                (mario.bottom < rest_left[ii].top && mario.bottom > rest_left.bottom)) {
                return ii;
            }
        }
    }
    return -1;
}

function check_left() {
    for (var ii = rest_left.length - 1; ii >= 0; --ii) {
        var b_right = rest_left[ii].right + speed;
        
        if (mario.left <= b_right && mario.left >= b_right - rest_left[ii].width) {
            if ((mario.top < rest_left[ii].top && mario.top > rest_left[ii].bottom) ||
            (mario.bottom < rest_left[ii].bottom && mario.top > rest_left[ii].top) ||
            (mario.bottom < rest_left[ii].top && mario.bottom > rest_left[ii].bottom))
            return ii;
        }
    }
    return -1;
}
var ratio = 10000/3360;
function moveSide() {
    if (key_left == true) {
        // x arrow
        if (check_left() == -1) {
            pixelx += speed;
        } else pixelx += mario.left - rest_left[check_left()].right;
        if(pixelx > speed){pixelx = speed;}
        game.style.left = (parseFloat(window.getComputedStyle(document.getElementById("game")).getPropertyValue('left')) + pixelx) + 'px';         // in pixels here
        transformSvgElement(mario.element,mario.left - (pixelx/ratio)*100/3360,mario.bottom);
        pixelx = 0;
    }

    if (key_right == true) {
        // right arrow
        if (check_right() == -1) {
            pixelx += speed;
        } else pixelx += rest_left[check_right()].left - mario.right;
        if(pixelx > speed){pixelx = speed;}
        game.style.left = (parseFloat(window.getComputedStyle(document.getElementById("game")).getPropertyValue('left')) - pixelx) + 'px';             // in pixels here
        transformSvgElement(mario.element,mario.left + (pixelx/ratio)*100/3360,mario.bottom);
        pixelx = 0;
    }
}

window.addEventListener("keydown", moveUp);
window.addEventListener("keydown", moveDown);
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
if (stay() != -1) {
    transformSvgElement(mario.element,mario.left,rest_top[stay()].top);
} transformSvgElement(mario.element,mario.left,mario.defaultbottom);