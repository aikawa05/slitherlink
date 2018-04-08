class Problem {
  constructor(id, data) {
    this.id = id
    this.data = data
  }
  get hints() {
    return this.data.hints || 0
  }

  get width() {
    return this.data.width || 0
  }

  get height() {
    return this.data.height || 0
  }

  get numbers() {
    return this.data.numbers || []
  }

  get lines() {
    return this.data.lines || []
  }
}

export default Problem
