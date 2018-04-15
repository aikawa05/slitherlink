import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './common.css'
import GameContainer from './containers/GameContainer'
import ProblemsContainer from './containers/ProblemsContainer'
import Actions from './data/Actions'
import ProblemData from './data/ProblemData'

var firstProblemId = null
for (let i = 0; i < ProblemData["problems"].length; i++)
{
  let id = i + 1
  if (firstProblemId == null)
  {
    firstProblemId = id
  }
  Actions.addProblem(id, ProblemData["problems"][i])
}

Actions.selectProblem(firstProblemId)

ReactDOM.render((
  <div>
    <header>Slither Link</header>
    <div className="content">
      <GameContainer />
      <ProblemsContainer />
    </div>
  </div>), document.getElementById('root'))
