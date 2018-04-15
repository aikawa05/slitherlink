import React from 'react'
import Board from '../models/Board'
import Actions from '../data/Actions'
import LineView from './LineView'

var mouseDown = 0;
document.body.onmousedown = function() {
    mouseDown = 1;
}
document.body.onmouseup = function() {
    mouseDown = 0;
}
document.body.onmouseleave = function() {
    mouseDown = 0;
}

function boardDisplayWidth(boardWidth) {
  return 110 * boardWidth
}

function boardDisplayHeight(boardHeight) {
  return 110 * boardHeight
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
    left: 110 * x + 45,
    top: 110 * y + 45,
  }
}

function onClickTool(toolName) {
  Actions.selectTool(toolName)
}

function ToolView(name, selected)
{
  return (
    <a key={"tool-" + name} className={["tool-item-icon", "tool-item-icon-" + name + "-" + (selected ? "on" : "off")].join(" ")} onClick={() => onClickTool(name)}></a>
  )
}

function GameView(props) {
  var cells = []
  for (let i = 0; i < props.board.height; i++)
  {
    for (let j = 0; j < props.board.width; j++)
    {
      var n = props.board.getNumber(j, i)
      var m = props.board.countSurroundingLines(j, i)
      var classNames = ["cell", "noselect"]
      if (n !== Board.EMPTY)
      {
        if (n === m)
        {
          classNames.push("cell" + n)
        }
        else if (n < m)
        {
          classNames.push("celldisabled")
        }
      }
      cells.push((<div key={"cell" + (i * props.board.width + j)} className={classNames.join(" ")}>{n === Board.EMPTY ? "" : n}</div>))
    }
  }
  var dots = []
  var lines = []
  for (let i = 0; i <= props.board.height; i++)
  {
    for (let j = 0; j <= props.board.width; j++)
    {
      var surroundingLines = [
        props.board.hasLine(j - 1, i * 2),
        props.board.hasLine(j, i * 2 - 1),
        props.board.hasLine(j, i * 2),
        props.board.hasLine(j, i * 2 + 1),
      ]
      dots.push(LineView("lineView" + (i * props.board.lineWidth + j), j, i, surroundingLines))
      if (surroundingLines.every(_hasLine => !_hasLine)){
        dots.push((<div key={"dot" + (i * (props.board.width + 1) + j)} className="dot noselect" style={dotStyle(j, i)}></div>))
      }
    }
  }
  var getPosition01FromMouseEvent = function(e) {
    var rect = e.currentTarget.getBoundingClientRect()
    return {
      x01: Math.min(1, Math.max(0, (e.clientX - rect.x - 50) / (boardDisplayWidth(props.board.width)))),
      y01: Math.min(1, Math.max(0, (e.clientY - rect.y - 50) / (boardDisplayHeight(props.board.height)))),
    }
  }
  var onMouseDown = function(e) {
    Actions.mouseDownBoard(getPosition01FromMouseEvent(e))
  }
  var onMouseMove = function(e) {
    if (mouseDown) {
      Actions.mouseMoveBoard(getPosition01FromMouseEvent(e))
    }
  }
  return (
    <div>
      <div className="board noselect" style={boardStyle(props.board.width, props.board.height)} onMouseDown={onMouseDown.bind(this)} onMouseMove={onMouseMove.bind(this)}>
        {cells}
        {dots}
        {lines}
      </div>
      <div className="tool-area">
        <div className="tool-back">
          {ToolView("pen", props.toolName === "pen")}
          {ToolView("eraser", props.toolName === "eraser")}
        </div>
      </div>
    </div>
  )
}

export default GameView
