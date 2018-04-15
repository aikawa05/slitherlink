import { List } from 'immutable'

class Board {
  constructor(problem) {
    if (!problem)
    {
      return
    }
    this.problem = problem
    var __numbers = []
    for (let i = 0; i < problem.height; i++) {
      for (let j = 0; j < problem.width; j++) {
        if (problem.numbers) {
          __numbers.push(problem.numbers[i * problem.width + j])
        }
        else {
          __numbers.push(Board.EMPTY)
        }
      }
    }
    var __lines = []
    for (let i = 0; i < this.lineHeight; i++) {
      for (let j = 0; j < this.lineWidth; j++) {
        __lines.push(0)
      }
    }
    this._numbers = List(__numbers)
    this._lines = List(__lines)
  }

  _copy() {
    var b = new Board()
    b.problem = this.problem
    b._numbers = this._numbers
    b._lines = this._lines
    return b
  }

  get inited() {
    return this.problem != null
  }
  get width() {
    return this.inited ? this.problem.width : 0
  }
  get height() {
    return this.inited ? this.problem.height : 0
  }
  get lineWidth() {
    return this.inited ? this.problem.width + 1 : 0
  }
  get lineHeight() {
    return this.inited ? this.problem.height * 2 + 1 : 0
  }
  hasAnswerLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight ) {
      return this.problem.lines[y * this.lineWidth + x] === 1
    }
    else {
      return false
    }
  }
  numberIndex(x, y) {
    return y * this.width + x
  }
  lineIndex(x, y) {
    return y * this.lineWidth + x
  }
  getNumber(x, y) {
    return this._numbers.get(this.numberIndex(x, y))
  }
  removeLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight && this._lines.get(this.lineIndex(x, y)) === 1 ) {
      this._lines = this._lines.set(this.lineIndex(x, y), 0)
      return this._copy()
    }
    else {
      return this
    }
  }
  setLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight && this._lines.get(this.lineIndex(x, y)) === 0) {
      this._lines = this._lines.set(this.lineIndex(x, y), 1)
      return this._copy()
    }
    else {
      return this
    }
  }
  hasLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight ) {
      return this._lines.get(this.lineIndex(x, y)) === 1
    }
    else {
      return false
    }
  }
  countSurroundingLines(x, y) {
    var m = 0
    if (this.hasLine(x, 2 * y))
    {
      m += 1
    }
    if (this.hasLine(x, 2 * y + 1))
    {
      m += 1
    }
    if (this.hasLine(x, 2 * y + 2))
    {
      m += 1
    }
    if (this.hasLine(x + 1, 2 * y + 1))
    {
      m += 1
    }
    return m
  }

  convertToLinePosition(position01) {
    var x = this.width * position01.x
    var y = this.height * position01.y

    // 点の周囲では操作性が悪くなるので入力しない
    if (Math.abs(x - Math.round(x)) < 0.1 && Math.abs(y - Math.round(y)) < 0.1)
    {
      return {x: -1, y: -1}
    }

    var a = Math.floor(x + y)
    var b = Math.ceil(y - x)
    var i = Math.floor(((a + b) / 2.0) * 2.0)
    var j = Math.floor((a - b) / 2.0)
    if (i % 2 === 0)
    {
      if (j >= this.width)
      {
        j = this.width - 1
      }
    }
    else if (i % 2 === 1)
    {
      j += 1
    }
    return {x: j, y: i}
  }

  static get EMPTY() {
    return 4
  }
}

export default Board
