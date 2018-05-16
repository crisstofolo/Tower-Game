import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/90383397a2266c189a7fe6dc323191532ef1542a/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        // Global Variables
var arr = [];
var width = getWidth();
var height = getHeight();
var yPos = 10;
var xPos = 3;
var beforexPos = 2;
var back = false;
var beforeback = false;
var grid = new Grid(11,10);
grid.init(2);                  //Everything in the grid starts off at 2
var speed = 200;
var Continue = true;
function start(){
    graphics();
    initialBoxes();
    setTimer(checkRedBlock,speed);
    if(Continue == true){
        keyDownMethod(upRow);
    }
}

//Sets elements in every box
function initialBoxes(){
    for(var col = 0; col < 12; col++){
        for(var row = 0; row < 11; row++){
            var block = grid.get(row, col);
            if(block == 1){
                var redBlock = new Rectangle(38,38);
                redBlock.setPosition(40 * col + 1, 40 * row + 41);
                redBlock.setColor(Color.white);
                add(redBlock);
            }else{
                var whiteBlock = new Rectangle(38,38);
                whiteBlock.setPosition(40 * col + 1, 40 * row + 41);
                whiteBlock.setColor(Color.red);
                add(whiteBlock);
            }
        }
    }
}

function checkRedBlock(){
    if(Continue == true){
        for(var col = 0; col < 12; col++){
            for(var row = 0; row < 11; row++){
                var block = grid.get(row, col);
                if(block == 1){
                    var redBlock = getElementAt(40 * col + 1, 40 * row + 41);
                    redBlock.setColor(Color.white);
                }else{
                    var whiteBlock = getElementAt(40 * col + 1, 40 * row + 41);
                    whiteBlock.setColor(Color.red);
                }
            }   
        }   
        if(yPos == -1){
            stopTimer(checkRedBlock);
            removeAll();
            Continue = false;
            var text = new Text("Great Tower!");
            text.setPosition(10,30);
            add(text);
            for(var col = 0; col < 12; col++){
                for(var row = 0; row < 11; row++){
                var block = grid.get(row, col);
                    if(block == 2){
                        var greenBlock = new Rectangle(38,38);
                        greenBlock.setPosition(40 * col + 1, 40 * row + 41);
                        greenBlock.setColor(Color.green);
                        add(greenBlock);
                    }
                    if(block == 1){
                        var redBlock = new Rectangle(38,38);
                        redBlock.setPosition(40 * col + 1, 40 * row + 41);
                        redBlock.setColor(Color.white);
                        add(redBlock);
                    }else{
                        var whiteBlock = new Rectangle(38,38);
                        whiteBlock.setPosition(40 * col + 1, 40 * row + 41);
                        whiteBlock.setColor(Color.red);
                        add(whiteBlock);
                    }
                }
            }
            for(var col = 0; col < 12; col++){
                for(var row = 0; row < 11; row++){
                    var block = grid.get(row, col);
                    if(block == 1){
                        var redBlock = getElementAt(40 * col + 1, 40 * row + 41);
                        redBlock.setColor(Color.white);
                    }else{
                        var whiteBlock = getElementAt(40 * col + 1, 40 * row + 41);
                        whiteBlock.setColor(Color.red);
                    }
                }
            }
        }else{
            grid.set(yPos,beforexPos,0)
            if(beforexPos < 9 && beforeback == false){
                beforexPos++;
            }else{
                beforexPos--;
                if(beforeback == false){
                    beforeback = true;
                }
                if(beforexPos < 1 && beforeback == true){
                    beforeback = false;
                }
            }
            grid.set(yPos,xPos,1);
            if(xPos < 9 && back == false){
                xPos++;
            }else{
                xPos--;
                if(back == false){
                    back = true;
                }
                if(xPos < 1 && back == true){
                    back = false;
                }
            }
        }
    }
}
function upRow(){
    yPos--;
    speed = speed - 16;
    stopTimer(checkRedBlock);
    setTimer(checkRedBlock,speed);
}
// GRAPHICS
function graphics(){
    // This makes the graphics on the background
    println("Width: " + getWidth());
    println("Height: " + getHeight());
    for(var x1 = 40;x1 <= width-1;x1 = x1 + 40){
        makeVerticalLines(x1);
    }
    for(var y1 = height-40; y1 >= 40;y1 = y1 - 40){
        makeHorizontalLines(y1);
    }
    var title = new Text("Tower Builder")
    title.setPosition(10,30);
    add(title);
}

function makeVerticalLines(x1){
    var verticalLine = new Line(x1,40,x1,height);
    add(verticalLine);
}

function makeHorizontalLines(y1){
    var horizontalLine = new Line(0,y1,width,y1)
    add(horizontalLine);
}


        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
