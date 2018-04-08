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
          _numbers[i][j] = problem.numbers[i * problem.height + j]
        }
        else {
          _numbers[i][j] = Board.EMPTY
        }
      }
    }
    this.getNumber = function(x, y) { return _numbers[y][x] }
    this.setNumber = function(x, y, n) { _numbers[y][x] = n }
  }

  get width() {
    return this.problem.width
  }
  get height() {
    return this.problem.height
  }

  static get EMPTY() {
    return 4
  }
}

export default Board
