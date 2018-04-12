class Board {
  constructor(problem) {
    if (!problem)
    {
      return
    }
    this.problem = problem
    var _numbers = []
    for (let i = 0; i < problem.height; i++) {
      _numbers.push([])
      for (let j = 0; j < problem.width; j++) {
        if (problem.numbers) {
          _numbers[i][j] = problem.numbers[i * problem.width + j]
        }
        else {
          _numbers[i][j] = Board.EMPTY
        }
      }
    }
    var _lines = []
    for (let i = 0; i < problem.height * 2 + 1; i++) {
      _lines.push([])
      for (let j = 0; j < problem.width + 1; j++) {
        _lines[i][j] = 0
      }
    }
    this.getNumber = function(x, y) {
      return _numbers[y][x]
    }
    this.setNumber = function(x, y, n) {
      _numbers[y][x] = n
    }
    this.removeLine = function(x, y) {
      if (0 <= x && x < _lines[0].length && 0 <= y && y < _lines.length ) {
        _lines[y][x] = 0
      }
    }
    this.setLine = function(x, y) {
      if (0 <= x && x < _lines[0].length && 0 <= y && y < _lines.length ) {
        _lines[y][x] = 1
      }
    }
    this.hasLine = function(x, y) {
      if (0 <= x && x < _lines[0].length && 0 <= y && y < _lines.length ) {
        return _lines[y][x] === 1
      }
      else {
        return false
      }
    }
  }

  get width() {
    return this.problem.width
  }
  get height() {
    return this.problem.height
  }

  convertToLinePosition(x01, y01) {
    var x = this.width * x01
    var y = this.height * y01
    var a = Math.floor(x + y)
    var b = Math.ceil(y - x)
    var i = Math.floor(((a + b) / 2.0) * 2.0)
    var j = Math.floor((a - b) / 2.0)
    if (i % 2 === 1){
      j += 1
    }
    return {x: j, y: i}
  }

  static get EMPTY() {
    return 4
  }
}

export default Board
