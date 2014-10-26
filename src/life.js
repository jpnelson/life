define(['../bower_components/skatejs/dist/skate.js', './simulation.js', './debounce.js'], function(skate, Simulation, debounce) {


    var debouncedResize = debounce(function () {
        var lifeElements = document.querySelectorAll('life');
        for (i = 0; i < lifeElements.length; ++i) {
            lifeElements[i]._life.resize();
        }
    }, 50);

    window.onresize = debouncedResize;

    function Life (el) {
        var simulation;
        var PIXEL_SIZE = el.hasAttribute('data-pixel-size') ? el.getAttribute('data-pixel-size') : 8;
        var FRAME_RATE = el.hasAttribute('data-ms-per-frame') ? el.getAttribute('data-ms-per-frame') : 1000 / 30; //ms
        var context;

        function loop () {
            setInterval(function () {
                simulation.step();
                draw();
            }, FRAME_RATE);
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

        function drawCell(x, y, state) {
            context.fillStyle = state.alive ? getColors().alive :
                state.touched ? getColors().touched : getColors().dead;
            context.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }

        function getColors() {
            return {
                alive: el.hasAttribute('data-alive-color') ? el.getAttribute('data-alive-color') : 'rgb(220, 220, 220)',
                touched: el.hasAttribute('data-touched-color') ? el.getAttribute('data-touched-color') : 'rgb(245, 245, 245)',
                dead: el.hasAttribute('data-dead-color') ? el.getAttribute('data-dead-color') : 'white'
            }
        }

        return {
            init: function () {
                simulation = new Simulation(
                        Math.floor(getSize().noUnits().width / PIXEL_SIZE),
                        Math.floor(getSize().noUnits().height / PIXEL_SIZE)
                );
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
                simulation.resize(
                    Math.floor(getSize().noUnits().width / PIXEL_SIZE),
                    Math.floor(getSize().noUnits().height / PIXEL_SIZE)
                );
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
        },
        prototype: {
            resize: function () {
                this._life.resize();
            }
        }
    });
});