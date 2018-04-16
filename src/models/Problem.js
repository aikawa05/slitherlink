
class Problem
{
  constructor(id, data)
  {
    this.id = id
    this.data = data
  }
  get hints() {
    return this.data.get("hints")
  }
  get width() {
    return this.data.get("width")
  }
  get height() {
    return this.data.get("height")
  }
  get numbers() {
    return this.data.get("numbers")
  }
  get lines() {
    return this.data.get("lines")
  }
  get currentLines() {
    return this.data.get("currentLines")
  }
  get cleared() {
    return this.data.get("cleared")
  }
  set(key, value)
  {
    return new Problem(this.id, this.data.set(key, value))
  }
}

export default Problem
