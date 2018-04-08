import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './common.css'
import GameContainer from './containers/GameContainer'

import Actions from './data/Actions'

for (let i = 1; i <= 8; i++)
{
  Actions.addProblem(i,
    {
      hints: 2,
      width: 3,
      height: 3,
      numbers: [
        4,4,4,
        4,3,4,
        4,0,4,
      ],
      lines: [
        1,1,1,0,
        1,0,0,1,
        0,1,0,0,
        1,1,1,1,
        1,0,1,0,
        0,0,0,0,
        0,0,0,0,
      ],
    },
  )
}

Actions.initBoard(1)

ReactDOM.render((<GameContainer />), document.getElementById('root'))
