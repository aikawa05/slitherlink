import React from 'react'

function lineGroupStyle(x, y)
{
  return {
    left: 110 * x,
    top: 110 * y,
  }
}

function LinePartView(i, className)
{
  return (<div key={"linePart" + i} className={["linePart", "noselect", "linePart" + i, className].join(" ")}></div>)
}

function LinePartCenterView()
{
  return (<div key={"linePartCenter"} className={"linePartCenter"}></div>)
}

function LineView(key, x, y, surroundingLines)
{
  var parts = []
  // four half lines (cross)
  if (surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  // three half lines
  else if (surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, ""))
    parts.push(LinePartCenterView())
  }
  else if (surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  else if (surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  else if (!surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  // two half lines (curve)
  else if (surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-2"))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, ""))
  }
  else if (!surroundingLines[0] && surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, "linePart2-2"))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, ""))
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, "linePart3-2"))
    parts.push(LinePartView(4, ""))
  }
  else if (surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, "linePart4-2"))
  }
  // two half lines (straight)
  else if (surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, ""))
    parts.push(LinePartCenterView())
  }
  else if (!surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  // one half line
  else if (surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, "linePart1-1"))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, ""))
    parts.push(LinePartCenterView())
  }
  else if (!surroundingLines[0] && surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, "linePart2-1"))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, ""))
    parts.push(LinePartCenterView())
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, "linePart3-1"))
    parts.push(LinePartView(4, ""))
    parts.push(LinePartCenterView())
  }
  else if (!surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, "linePart4-1"))
    parts.push(LinePartCenterView())
  }
  // no line
  else if (!surroundingLines[0] && !surroundingLines[1] && !surroundingLines[2] && !surroundingLines[3])
  {
    parts.push(LinePartView(1, ""))
    parts.push(LinePartView(2, ""))
    parts.push(LinePartView(3, ""))
    parts.push(LinePartView(4, ""))
  }
  return (
    <div key={key} className="lineGroup noselect" style={lineGroupStyle(x, y)}>
      {parts}
    </div>
  )
}

export default LineView
