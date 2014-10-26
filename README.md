# Conway's game of life bower component

To use:
* Insert an element `<life></life` into the DOM somewhere

You're done!

## Sizing

The element will resize automatically depending on the CSS width / height applied to the `life` element.

This is recomputed on window resize. You can do it manually with

`document.querySelector('life').resize()`

## Other arguments

There is a data attribute API on the life element

* `data-alive-color`: the color each cell is when it's alive. Can be any CSS color, eg `red`, `rgb(255, 0, 0)` etc.
* `data-dead-color`: the color each cell is when it's dead.
* `data-touched-color`: the color each cell is after it has been touched.
* `data-pixel-size`: how large each cell should be, in pixels (default 8)
* `data-ms-per-frame`: how quickly the simulation should run. Each step takes this many milliseconds (default 1000 / 30).