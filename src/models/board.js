import { List } from 'immutable'

class Board {
  constructor(problem) {
    if (!problem)
    {
      return
    }
    this.problem = problem
    if (!this.problem.currentLines || this.problem.currentLines.size === 0)
    {
      var __lines = []
      for (let i = 0; i < this.lineHeight; i++) {
        for (let j = 0; j < this.lineWidth; j++) {
          __lines.push(0)
        }
      }
      this.problem = this.problem.set("currentLines", List(__lines))
    }
  }

  _copy() {
    return new Board(this.problem)
  }

  get inited() {
    return !!this.problem
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
      return this.problem.lines.get(this.lineIndex(x, y)) === 1
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
    return this.problem.numbers.get(this.numberIndex(x, y))
  }
  removeLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight && this.problem.currentLines.get(this.lineIndex(x, y)) === 1 ) {
      this.problem = this.problem.set("currentLines", this.problem.currentLines.set(this.lineIndex(x, y), 0))
      this.problem = this.problem.set("cleared", this.isCleared())
      return this._copy()
    }
    else {
      return this
    }
  }
  setLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight && this.problem.currentLines.get(this.lineIndex(x, y)) === 0) {
      this.problem = this.problem.set("currentLines", this.problem.currentLines.set(this.lineIndex(x, y), 1))
      this.problem = this.problem.set("cleared", this.isCleared())
      return this._copy()
    }
    else {
      return this
    }
  }
  hasLine(x, y) {
    if (0 <= x && x < this.lineWidth && 0 <= y && y < this.lineHeight ) {
      return this.problem.currentLines.get(this.lineIndex(x, y)) === 1
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

  isCleared() {
    for (let i = 0; i < this.lineHeight; i++) {
      for (let j = 0; j < this.lineWidth; j++) {
        if (this.hasLine(j, i) !== this.hasAnswerLine(j, i))
        {
          return false
        }
      }
    }
    return true
  }

  static get EMPTY() {
    return 4
  }
}

export default Board
