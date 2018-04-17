import React from 'react'
import Board from '../models/Board'
import Actions from '../data/Actions'
import LineView from './LineView'

var drawing = false
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

function boardScreenWidth(boardWidth)
{
  if (boardWidth < 5) {
    return 320.0
  }
  else {
    return 380.0
  }
}

function boardScreenHeight(boardWidth, boardHeight)
{
  return boardScreenWidth(boardWidth, boardHeight) * boardHeight / boardWidth
}

function cellScreenSize(boardWidth)
{
  return boardScreenWidth(boardWidth) / boardWidth * 0.9
}

function cellStyle(boardWidth)
{
  var cellSize = cellScreenSize(boardWidth)
  return {
    width: cellSize,
    height: cellSize,
    lineHeight: `${cellSize}px`,
    margin: Math.round(cellSize * 0.05),
    fontSize: cellSize * 0.9,
  }
}

function boardStyle(boardWidth, boardHeight)
{
  return {
    width: boardScreenWidth(boardWidth),
    height: boardScreenHeight(boardWidth, boardHeight),
    padding: cellScreenSize(boardWidth) * 0.5,
  }
}

function dotStyle(boardWidth, x, y)
{
  var cell = cellStyle(boardWidth)
  var size = Math.floor(cell.width * 0.1)
  if (size % 2 === 1)
  {
    size += 1
  }
  return {
    left: (cell.width + cell.margin * 2.0) * x + cell.width * 0.5 - size / 2 ,
    top: (cell.height + cell.margin * 2.0) * y + cell.height * 0.5 - size / 2,
    width: size,
    height: size,
    MozBorderRadius: size / 2,
    WebkitBorderRadius: size / 2,
    borderRadius: size / 2,
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
      cells.push((<div key={"cell" + (i * props.board.width + j)} className={classNames.join(" ")} style={cellStyle(props.board.width)}>{n === Board.EMPTY ? "" : n}</div>))
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
      dots.push(LineView("lineView" + (i * props.board.lineWidth + j), j, i, surroundingLines, cellStyle(props.board.width)))
      if (surroundingLines.every(_hasLine => !_hasLine)){
        dots.push((<div key={"dot" + (i * (props.board.width + 1) + j)} className="dot noselect" style={dotStyle(props.board.width, j, i)}></div>))
      }
    }
  }
  var getPosition01FromMouseEvent = function(e) {
    var rect = e.currentTarget.getBoundingClientRect()
    var bStyle = boardStyle(props.board.width, props.board.height)
    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.x - bStyle.padding) / bStyle.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.y - bStyle.padding) / bStyle.height)),
    }
  }
  var onMouseDown = function(e) {
    var position01 = getPosition01FromMouseEvent(e)
    var linePosition = props.board.convertToLinePosition(position01)
    if (props.toolName === "pen")
    {
      if (props.board.hasLine(linePosition.x, linePosition.y))
      {
        Actions.eraseLine(linePosition)
        drawing = false
      }
      else
      {
        Actions.drawLine(linePosition)
        drawing = true
      }
    }
    else if (props.toolName === "eraser")
    {
      if (props.board.hasLine(linePosition.x, linePosition.y))
      {
        Actions.eraseLine(linePosition)
        drawing = false
      }
    }
  }
  var onMouseMove = function(e) {
    var position01 = getPosition01FromMouseEvent(e)
    var linePosition = props.board.convertToLinePosition(position01)
    if (mouseDown) {
      if (props.toolName === "pen")
      {
        if (props.board.hasLine(linePosition.x, linePosition.y))
        {
          if (!drawing)
          {
            Actions.eraseLine(linePosition)
          }
        }
        else
        {
          if (drawing)
          {
            Actions.drawLine(linePosition)
          }
        }
      }
      else if (props.toolName === "eraser")
      {
        if (props.board.hasLine(linePosition.x, linePosition.y))
        {
          Actions.eraseLine(linePosition)
        }
      }
    }
  }
  return (
    <div>
      {props.board.problem.cleared ? (<div className="clear-wrapper"><div className="clear">CLEAR!</div></div>) : (<div></div>)}
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
