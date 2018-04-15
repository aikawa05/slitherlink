import React from 'react'

const BORDER_COLOR = "#4d619a"

function lineGroupStyle(cellStyle, x, y)
{
  return {
    left: (cellStyle.width + cellStyle.margin * 2.0) * x,
    top: (cellStyle.height + cellStyle.margin * 2.0) * y,
    width: cellStyle.width,
    height: cellStyle.height,
  }
}

function borderSize(cellStyle)
{
  var borderSize = Math.floor(cellStyle.width * 0.1)
  if (borderSize % 2 === 1)
  {
    borderSize += 1
  }
  return borderSize
}

function borderStyle(borderSize)
{
  return `${borderSize}px solid #4d619a`
}

function linePartStyle(linePartIndex, shapeIndex, cellStyle)
{
  var style = {
    width: cellStyle.width * 0.5,
    height: cellStyle.height * 0.5,
  }
  var bsize = borderSize(cellStyle)
  switch (linePartIndex) {
    case 1:
      style.left = -bsize / 2
      style.top = -bsize / 2
      if (shapeIndex === 1) {
        style.borderBottom = borderStyle(bsize)
      }
      else if (shapeIndex === 2) {
        style.borderRight = borderStyle(bsize)
        style.borderBottom = borderStyle(bsize)
        style.borderRadius = `0 0 ${bsize * 2}px 0`
      }
      break;
    case 2:
      style.right = -bsize / 2
      style.top = -bsize / 2
      if (shapeIndex === 1) {
        style.borderLeft = borderStyle(bsize)
      }
      else if (shapeIndex === 2) {
        style.borderLeft = borderStyle(bsize)
        style.borderBottom = borderStyle(bsize)
        style.borderRadius = `0 0 0 ${bsize * 2}px`
      }
      break;
    case 3:
      style.right = -bsize / 2
      style.bottom = -bsize / 2
      if (shapeIndex === 1) {
        style.borderTop = borderStyle(bsize)
      }
      else if (shapeIndex === 2) {
        style.borderLeft = borderStyle(bsize)
        style.borderTop = borderStyle(bsize)
        style.borderRadius = `${bsize * 2}px 0 0 0`
      }
      break;
    case 4:
      style.left = -bsize / 2
      style.bottom = -bsize / 2
      if (shapeIndex === 1) {
        style.borderRight = borderStyle(bsize)
      }
      else if (shapeIndex === 2) {
        style.borderRight = borderStyle(bsize)
        style.borderTop = borderStyle(bsize)
        style.borderRadius = `0 ${bsize * 2}px 0 0`
      }
      break;
    default:
      break;
  }

  return style
}

function linePartCenterStyle(cellStyle)
{
  var bsize = borderSize(cellStyle)
  return {
    width: bsize,
    height: bsize,
    left: cellStyle.width * 0.5 - bsize / 2,
    top: cellStyle.width * 0.5 - bsize / 2,
    backgroundColor: BORDER_COLOR,
  }
}

function LinePartView(linePartIndex, shapeIndex, cellStyle)
{
  return (<div key={"linePart" + linePartIndex} className={"linePart noselect"} style={linePartStyle(linePartIndex, shapeIndex, cellStyle)}></div>)
}

function LinePartCenterView(cellStyle)
{
  return (<div key={"linePartCenter"} className={"linePartCenter"} style={linePartCenterStyle(cellStyle)}></div>)
}

function LineView(key, x, y, surroundingLines, cellStyle)
{
  var parts = []
  // four half lines (cross)
  if (surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  // three half lines
  else if (surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (!surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  // two half lines (curve)
  else if (surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 2, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
  }
  else if (!surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 2, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 2, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
  }
  else if (surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 2, cellStyle))
  }
  // two half lines (straight)
  else if (surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (!surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  // one half line
  else if (surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 1, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (!surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 1, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 1, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 1, cellStyle))
    parts.push(LinePartCenterView(cellStyle))
  }
  // no line
  else if (!surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, 0, cellStyle))
    parts.push(LinePartView(2, 0, cellStyle))
    parts.push(LinePartView(3, 0, cellStyle))
    parts.push(LinePartView(4, 0, cellStyle))
  }
  return (
    <div key={key} className="lineGroup noselect" style={lineGroupStyle(cellStyle, x, y)}>
      {parts}
    </div>
  )
}

export default LineView
