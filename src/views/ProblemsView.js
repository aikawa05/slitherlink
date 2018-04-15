import React from 'react'
import Actions from '../data/Actions'

function selectProblem(problemId)
{
  Actions.selectProblem(problemId)
}

function ProblemsView(props)
{
  var problems = []
  var index = 0
  props.problems.forEach((problem, id) => {
    problems.push((<a key={"problem" + index} className="problem-icon" onClick={() => selectProblem(problem.id)}>{problem.id}</a>))
    index += 1
  })
  return (
    <div className="problems">
      <div className="title easy">Easy</div>
      <div>
        {problems.slice(0, 16)}
      </div>
      <div className="title normal">Normal</div>
      <div>
        {problems.slice(16, 32)}
      </div>
      <div className="title hard">Hard</div>
      <div>
        {problems.slice(32, 40)}
      </div>
    </div>
  )
}

export default ProblemsView
