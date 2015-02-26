var MODULE = (function () {
    var HexagonGrid = {
        "radius": null,
        "height": null,
        "width": null,
        "side": null,
        "canvas": document.getElementById("HexCanvas"),
        "context": null,
        setRadius: function (){
            this.radius = parseInt($('#radius').val());
            this.side = Math.round((3 / 2) * this.radius);
            this.height = Math.round(Math.sqrt(3) * this.radius);
            this.width = Math.round(2 * this.radius);
            this.context = this.canvas.getContext('2d');
            this.drawHexGrid(12, 12, 0, 0, false); 
        },
        drawHexGrid: function (rows, cols, originX, originY, isDebug) {
            this.canvasOriginX = originX;
            this.canvasOriginY = originY;
            var currentHexX;
            var currentHexY;
            var debugText = "";
            var offsetColumn = false;
            for (var col = 0; col < cols; col++) {
                for (var row = 0; row < rows; row++) {
                    if (!offsetColumn) {
                        currentHexX = (col * this.side) + originX;
                        currentHexY = (row * this.height) + originY;
                    } else {
                        currentHexX = col * this.side + originX;
                        currentHexY = (row * this.height) + originY + (this.height * 0.5);
                    }
                    if (isDebug) {
                        debugText = col + "," + row;
                    }
                    this.drawHex(currentHexX, currentHexY, "#dddddd", debugText, false);
                }
                offsetColumn = !offsetColumn;
            }
        },
        drawHex: function(x0, y0, fillColor, debugText, highlight, revert) {
            if (highlight == true && revert == false){
                this.context.strokeStyle = "#00F2FF";
            }else if(highlight == true && revert == true){
                this.context.strokeStyle = "#000";
            }else{
                this.context.strokeStyle = "#000";
            }
            this.context.lineWidth = 2;
            this.context.beginPath();
            this.context.moveTo(x0 + this.width - this.side, y0);
            this.context.lineTo(x0 + this.side, y0);
            this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
            this.context.lineTo(x0 + this.side, y0 + this.height);
            this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
            this.context.lineTo(x0, y0 + (this.height / 2));
            if (highlight == true){
            }
            if (fillColor && highlight == false) {
                this.context.fillStyle = fillColor;
                this.context.fill();
            }
            this.context.closePath();
            this.context.stroke();
            if (debugText) {
                this.context.font = "5px";
                this.context.fillStyle = "#000";
                this.context.fillText(debugText, x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
            }
        },
        getRelativeCanvasOffset: function() {
            var x = 0, y = 0;
            var layoutElement = this.canvas;
            if (layoutElement.offsetParent) {
                do {
                    x += layoutElement.offsetLeft;
                    y += layoutElement.offsetTop;
                } while (layoutElement = layoutElement.offsetParent);
                    return { x: x, y: y };
            }
        },
        getSelectedTile: function(mouseX, mouseY) {
            var offSet = this.getRelativeCanvasOffset();
            mouseX -= offSet.x;
            mouseY -= offSet.y;
            var column = Math.floor((mouseX) / this.side);
            console.log("Column: " + column);
            var row = Math.floor(
            column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);
            console.log("Row: " + row);
            //Test if on left side of frame
            if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {
            //Now test which of the two triangles we are in
            //Top left triangle points
            var p1 = new Object();
            p1.x = column * this.side;
            p1.y = column % 2 == 0
            ? row * this.height
            : (row * this.height) + (this.height / 2);
            var p2 = new Object();
            p2.x = p1.x;
            p2.y = p1.y + (this.height / 2);
            var p3 = new Object();
            p3.x = p1.x + this.width - this.side;
            p3.y = p1.y;
            var mousePoint = new Object();
            mousePoint.x = mouseX;
            mousePoint.y = mouseY;
            if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;
            if (column % 2 != 0) {
            row--;
            }
            }
            //Bottom left triangle points
            var p4 = new Object();
            p4 = p2;
            var p5 = new Object();
            p5.x = p4.x;
            p5.y = p4.y + (this.height / 2);
            var p6 = new Object();
            p6.x = p5.x + (this.width - this.side);
            p6.y = p5.y;
            if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;
            if (column % 2 == 0) {
            row++;
            }
            }
            }
            return { row: row, column: column };
        }
    };

    var Map = {
        init: function(){
            Map.ctx = Map.canvas.getContext('2d'); //init map canvas ctx
        },
        "canvas": document.getElementById("HexCanvas"),
        "ctx": null
    };
    Map.init();

    var submit = document.getElementById('submitButton');
    submit.addEventListener('click', function(e) {
        HexagonGrid.setRadius();
        console.log(HexagonGrid);
    }, false);

    
}());

