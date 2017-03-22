// JS functions for the gorsel_yanilsma post on the www.cescript.compression
// Created by Bahri ABACI, 2017
// This code could be buggy, it was not tested well

class BallObj {
    constructor(cx, cy, r, c) {
        this.centerx = cx;
        this.centery = cy;
        this.radius  = r;
        this.color   = c;
        this.isDown  = false;
    }
    show(ctx) {
        ctx.beginPath();
        ctx.arc(this.centerx,this.centery,this.radius,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    isPointIn(x,y) {
        var rr = (x-this.centerx)*(x-this.centerx) + (y-this.centery)*(y-this.centery);
        if( rr < this.radius*this.radius ) {
            return true;
        } else {
            return false;
        }
    }
    updatePos(x,y) {
        this.centerx = x;
        this.centery = y;
    }
}

class RectObj {
    constructor(cx, cy, w, h, c, strcol) {
        this.startx = cx;
        this.starty = cy;
        this.width   = w;
        this.height  = h;
        this.color   = c;
        this.strcol  = strcol;
        this.isDown  = false;
    }

    show(ctx) {
        ctx.beginPath();
        ctx.rect(this.startx, this.starty, this.width, this.height);
        ctx.closePath();
        ctx.fillStyle   = this.color;
        ctx.strokeStyle = this.strcol;
        ctx.fill();
        ctx.stroke();
    }
    isPointIn(x,y) {
        return ( (x > this.startx) && (y > this.starty) && (x < this.startx+this.width) && (y < this.starty+this.height) );
    }
    updatePos(x,y) {
        this.startx = x - this.width / 2;
        this.starty = y - this.height/ 2;
    }
}

function draw_shapes2canvas(current_canvas, shapes_object) {
    // shapes[i] includes varios shapes of various types
    var current_context = current_canvas.getContext("2d");
    var current_width   = current_canvas.width;
    var current_height  = current_canvas.height;

    current_context.clearRect(0, 0, current_width, current_height);
    for(var i=0; i < shapes_object.length; i++) {
        shapes_object[i].show(current_context);
    }

}

function check_clicksoncanvas(current_canvas, shapes_object) {

    draw_shapes2canvas(current_canvas, shapes_object);
    // vars related to dragging
    var rect = current_canvas.getBoundingClientRect();
    var leftOffset = rect.left;
    var topOffset  = rect.top ;
    var startX, startY;

    function handleMouseDown(e) {
        e.preventDefault();
        startX = parseInt(e.clientX - leftOffset);
        startY = parseInt(e.clientY - topOffset );

        for(var i=0; i < shapes_object.length; i++) {
            shapes_object[i].isDown = shapes_object[i].isPointIn(startX,startY);
        }
    }
    // set isDown to zero
    function handleMouseUp(e)  {
        e.preventDefault();
        for(var i=0; i < shapes_object.length; i++) {
            shapes_object[i].isDown = false;
        }
    }
    function handleMouseOut(e) {
        e.preventDefault();
        for(var i=0; i < shapes_object.length; i++) {
            shapes_object[i].isDown = false;
        }
    }

    function handleMouseMove(e) {

        e.preventDefault();

        mouseX = parseInt(e.clientX - leftOffset);
        mouseY = parseInt(e.clientY - topOffset );

        for(var i=0; i < shapes_object.length; i++) {
            if(shapes_object[i].isDown) {
                shapes_object[i].updatePos(mouseX,mouseY);
            }
        }
        draw_shapes2canvas(current_canvas, shapes_object);
    }

    current_canvas.addEventListener('mousedown',function (e) {
        handleMouseDown(e);
    },false);
    current_canvas.addEventListener('mousemove',function (e) {
        handleMouseMove(e);
    },false);
    current_canvas.addEventListener('mouseup',function (e) {
        handleMouseUp(e);
    },false);
    current_canvas.addEventListener('mouseout',function (e) {
        handleMouseOut(e);
    },false);

}
