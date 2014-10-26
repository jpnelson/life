define(['./clone.js'], function (clone) {
    return function (width, height) {

        var board = [[]];

        var BOARD_DENSITY = 0.15;

        function neighbours(x, y) {
            var width = board.length;
            var height = board[0].length;

            var count = 0;

            for (var dx = -1; dx <= 1; dx++) {
                for (var dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) {
                        continue;
                    }
                    var thisX = x + dx;
                    var thisY = y + dy;

                    thisX = thisX < 0 ? thisX + width :
                        thisX >= width ? thisX - width : thisX;
                    thisY = thisY < 0 ? thisY + height :
                            thisY >= height ? thisY - height : thisY;

                    count += board[thisX][thisY].alive ? 1 : 0;
                }
            }

            return count;
        }

        return {
            start: function () {
                this.resize(width, height);
            },
            step: function () {
                var nextStep = clone(board);
                for (var x = 0; x < board.length; x++) {
                    for (var y = 0; y < board[x].length; y++) {
                        if (board[x][y].alive) {
                            if (neighbours(x, y) < 2) {
                                nextStep[x][y].alive = false;
                            } else if (neighbours(x, y) >= 2 && neighbours(x, y) <= 3) {
                                nextStep[x][y].alive = true;
                                nextStep[x][y].touched = true;
                            } else if (neighbours(x, y) > 3) {
                                nextStep[x][y].alive = false;
                            }
                        } else {
                            if (neighbours(x, y) === 3) {
                                nextStep[x][y].alive = true;
                                nextStep[x][y].touched = true;
                            }
                        }
                    }
                }

                board = nextStep;
            },
            getBoard: function () {
                return board;
            },
            resize: function (newWidth, newHeight) {
                var oldWidth = (board || []).length;
                var oldHeight = (board[0] || []).length;
                var columnsToAdd = newWidth - oldWidth;
                var rowsToAdd = newHeight - oldHeight;

                if (columnsToAdd < 0) {
                    //Contract number of columns
                    for (var x = 0; x < -columnsToAdd; x++) {
                        board.pop();
                    }
                } else {
                    //Expand columns
                    for (var x = 0; x < columnsToAdd; x++) {
                        var column = [];
                        for (var y = 0; y < oldHeight; y++) {
                            var isCellAlive = Math.random() < BOARD_DENSITY;
                            column.push({
                                alive: isCellAlive,
                                touched: isCellAlive
                            });
                        }
                        board.push(column);
                    }
                }


                if (rowsToAdd < 0) {
                    //Contract number of rows
                    for (var x = 0; x < newWidth; x++) {
                        for (var y = 0; y < -rowsToAdd; y++) {
                            board[x].pop();
                        }
                    }
                } else {
                    //Expand rows
                    for (var x = 0; x < newWidth; x++) {
                        for (var y = 0; y < rowsToAdd; y++) {
                            var isCellAlive = Math.random() < BOARD_DENSITY;
                            board[x].push({
                                alive: isCellAlive,
                                touched: isCellAlive
                            });
                        }
                    }
                }
            }
        }
    }
});