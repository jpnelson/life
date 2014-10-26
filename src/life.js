define(['../bower_components/skatejs/dist/skate.js', './simulation.js'], function(skate, Simulation) {

    window.onresize = function () {
        var lifeElements = document.querySelectorAll('life');
        for (i = 0; i < lifeElements.length; ++i) {
            lifeElements[i]._life.resize();
        }
    };

    function Life (el) {
        var simulation;
        var PIXEL_SIZE = 5;
        var FRAME_RATE = 100; //ms
        var context;

        function loop () {
            simulation.step();
            draw();
            setTimeout(loop, FRAME_RATE);
        }

        function draw() {
            var board = simulation.getBoard();
            for (var x = 0; x < board.length; x++) {
                for (var y = 0; y < board[x].length; y++) {
                    drawCell(x, y, board[x][y]);
                }
            }
        }

        function getSize() {
            var w = getComputedStyle(el, null).getPropertyValue('width');
            var h = getComputedStyle(el, null).getPropertyValue('height');
            return {
                noUnits: function() {
                    return {
                        width: w.replace('px', ''),
                        height: h.replace('px', '')
                    }
                },
                width: w,
                height: h
            }
        }

        function drawCell(x, y, occupied) {
            context.fillStyle = occupied ? 'black' : 'white';
            context.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }

        return {
            init: function () {
                simulation = new Simulation(getSize().width / PIXEL_SIZE, getSize().height / PIXEL_SIZE);
                simulation.start();
                this.resize();

                context = el._canvas.getContext('2d');

                loop(el);
            },
            resize: function () {
                var newSize = getSize();
                el._canvas.style.width = newSize.width;
                el._canvas.style.height = newSize.height;
                el._canvas.setAttribute('width', newSize.noUnits().width);
                el._canvas.setAttribute('height', newSize.noUnits().height);
                simulation.resize(newSize.noUnits().width / PIXEL_SIZE, newSize.noUnits().height / PIXEL_SIZE);
            }
        }
    }



    skate('life', {
        created: function (el) {
            var canvas = document.createElement('canvas');
            el.appendChild(canvas);
            el._canvas = canvas;
        },
        attached: function (el) {
            var life = new Life(el);
            el._life = life;
            life.init();
        }
    });
});