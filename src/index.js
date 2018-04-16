import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './common.css'
import GameContainer from './containers/GameContainer'
import ProblemsContainer from './containers/ProblemsContainer'
import Actions from './data/Actions'

Actions.selectProblem(1)

ReactDOM.render((
  <div>
    <header>Slither Link</header>
    <div className="content">
      <GameContainer />
      <ProblemsContainer />
    </div>
  </div>), document.getElementById('root'))
