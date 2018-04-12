import React from 'react'
import Board from '../models/Board'
import Actions from '../data/Actions'

function boardDisplayWidth(boardWidth) {
  return 100 * boardWidth + 10 * boardWidth
}

function boardDisplayHeight(boardHeight) {
  return 100 * boardHeight + 10 * boardHeight
}

function boardStyle(boardWidth, boardHeight)
{
  return {
    width: boardDisplayWidth(boardWidth),
    height: boardDisplayHeight(boardHeight),
  }
}

function dotStyle(x, y)
{
  return {
    left: x * 110 + 5,
    top: y * 110 + 5,
  }
}

function GameView(props) {
  var cells = []
  for (let i = 0; i < props.board.height; i++)
  {
    for (let j = 0; j < props.board.width; j++)
    {
      var n = props.board.getNumber(j, i)
      cells.push((<div key={"cell" + (i * props.board.width + j)} className={"cell noselect"}>{n === Board.EMPTY ? "" : n}</div>))
    }
  }
  var dots = []
  for (let i = 0; i <= props.board.height; i++)
  {
    for (let j = 0; j <= props.board.width; j++)
    {
      dots.push((<div key={"dot" + (i * (props.board.width + 1) + j)} className="dot" style={dotStyle(j, i)}></div>))
    }
  }
  var getPosition01FromMouseEvent = function(e) {
    var rect = e.currentTarget.getBoundingClientRect()
    return {
      x01: (e.pageX - rect.x) / (boardDisplayWidth(props.board.width) + 20),
      y01: (e.pageY - rect.y) / (boardDisplayHeight(props.board.height) + 20),
    }
  }
  var onMouseDown = function(e) {
    Actions.mouseDownBoard(getPosition01FromMouseEvent(e))
  }
  var onMouseMove = function(e) {
    Actions.mouseMoveBoard(getPosition01FromMouseEvent(e))
  }
  return (
    <div className="board" style={boardStyle(props.board.width, props.board.height)} onMouseDown={onMouseDown.bind(this)} onMouseMove={onMouseMove.bind(this)}>
      {cells}
      {dots}
    </div>
  )
}

export default GameView
