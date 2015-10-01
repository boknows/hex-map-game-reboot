var GLOBALS = {
    "DEBUG": true,
};
var GAME = (function() {
    var HexagonGrid = {
        "radius": null,
        "height": null,
        "width": null,
        "side": null,
        "canvas": document.getElementById("HexCanvas"),
        "ctx": null,
        "rows": 10, 
        "cols": 10,
        "hexes": [],
        init: function() {
            this.radius = 20;
            this.side = Math.round((3 / 2) * this.radius);
            this.height = Math.round(Math.sqrt(3) * this.radius);
            this.width = Math.round(2 * this.radius);

            //Set click eventlistener for canvas
            this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);

            //Defines the hexes array, which provides the structure
            this.defineHexGrid(this.rows, this.cols); 

            this.ctx = this.canvas.getContext('2d');

            //Draw base grid, then draw overlaid items on top
            this.drawHexGrid(this.rows, this.cols);
        },
        draw: function(){
            this.canvas.width = this.canvas.width; //clear canvas
            this.drawHexGrid(this.rows, this.cols);
        },
        defineHexGrid: function(rows, cols){
            this.canvasOriginX = this.canvas.getBoundingClientRect().left;
            this.canvasOriginY = this.canvas.getBoundingClientRect().top;
            var currentHexX;
            var currentHexY;
            var offsetColumn = false;
            for (var col = 0; col < cols; col++) {
                this.hexes.push([]);
                for (var row = 0; row < rows; row++) {
                    if (!offsetColumn) {
                        currentHexX = (col * this.side) + this.canvasOriginX;
                        currentHexY = (row * this.height) + this.canvasOriginY;
                    } else {
                        currentHexX = col * this.side + this.canvasOriginX;
                        currentHexY = (row * this.height) + this.canvasOriginY + (this.height * 0.5);
                    }
                    this.hexes[col].push({
                        "highlighted": false,
                        "x": currentHexX,
                        "y": currentHexY,
                        "text": col + "," + row,
                        "borders": {
                            "n": null,
                            "s": null,
                            "nw": null,
                            "sw": null,
                            "ne": null,
                            "se": null
                        }
                    });
                }
                offsetColumn = !offsetColumn;
            }
        },
        drawHexGrid: function(rows, cols) {
            //base grid
            for(var i = 0; i < cols; i++){
                for(var j = 0; j < rows; j++){
                    this.drawHex(this.hexes[i][j].x, this.hexes[i][j].y, "#dddddd", this.hexes[i][j].text, false);
                }
            }

            //overlay items
            for(var i = 0; i < cols; i++){
                for(var j = 0; j < rows; j++){
                    if(this.hexes[i][j].highlighted == true){
                        this.drawHex(this.hexes[i][j].x, this.hexes[i][j].y, "#dddddd", this.hexes[i][j].text, true);
                    }
                }
            } 

            if(GLOBALS.DEBUG == true){
                console.log(this.hexes);
            }
            
            
        },
        drawHex: function(x0, y0, fillColor, hexText, highlight) {
            if (highlight == true) {
                this.ctx.strokeStyle = "#00F2FF";
                this.ctx.lineWidth = 4;
            } else {
                this.ctx.strokeStyle = "#000";
                this.ctx.lineWidth = 2;
            }
            
            this.ctx.beginPath();
            this.ctx.moveTo(x0 + this.width - this.side, y0);
            this.ctx.lineTo(x0 + this.side, y0);
            this.ctx.lineTo(x0 + this.width, y0 + (this.height / 2));
            this.ctx.lineTo(x0 + this.side, y0 + this.height);
            this.ctx.lineTo(x0 + this.width - this.side, y0 + this.height);
            this.ctx.lineTo(x0, y0 + (this.height / 2));
            if (highlight == true) {}
            if (fillColor && highlight == false) {
                this.ctx.fillStyle = fillColor;
                this.ctx.fill();
            }
            this.ctx.closePath();
            this.ctx.stroke();
            if (hexText) {
                this.ctx.font = "5px";
                this.ctx.fillStyle = "#000";
                this.ctx.fillText(hexText, x0 + (this.width / 2) - (this.width / 4), y0 + (this.height - 5));
            }
        },
        drawHexBorders: function(){

        },
        getRelativeCanvasOffset: function() {
            var x = 0,
                y = 0;
            var layoutElement = this.canvas;
            if (layoutElement.offsetParent) {
                do {
                    x += layoutElement.offsetLeft;
                    y += layoutElement.offsetTop;
                } while (layoutElement = layoutElement.offsetParent);
                return {
                    x: x,
                    y: y
                };
            }
        },
        getSelectedTile: function(mouseX, mouseY) {
            var offSet = this.canvas.getBoundingClientRect();
            mouseX -= offSet.left;
            mouseY -= offSet.top;

            var column = Math.floor((mouseX) / this.side);
            var row = Math.floor(column % 2 == 0 ? Math.floor((mouseY) / this.height): Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);

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
            return {
                row: row,
                col: column
            };
        },
        isPointInTriangle: function (pt, v1, v2, v3) {
            var b1, b2, b3;
            b1 = this.sign(pt, v1, v2) < 0.0;
            b2 = this.sign(pt, v2, v3) < 0.0;
            b3 = this.sign(pt, v3, v1) < 0.0;
            return ((b1 == b2) && (b2 == b3));
        },
        sign: function(p1, p2, p3) {
            return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        },
        clickEvent: function (e) {
            var mouseX = e.pageX;
            var mouseY = e.pageY;
            var localX = mouseX - this.canvasOriginX;
            var localY = mouseY - this.canvasOriginY;
            var tile = this.getSelectedTile(localX, localY);
            if(GLOBALS.DEBUG == true){
                console.log(tile);
            }
            if(tile.row < this.rows && tile.row >= 0 && tile.col < this.cols && tile.col >= 0){
                //console.log(tile);
                if(this.hexes[tile.col][tile.row].highlighted == false){
                    this.hexes[tile.col][tile.row].highlighted = true;
                }else{
                    this.hexes[tile.col][tile.row].highlighted = false;
                }
                this.draw();
            }else{
                console.log("Click out of range");
            }

        }
    };

    HexagonGrid.init();

}());