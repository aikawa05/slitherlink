import React from 'react'
import ReactDOM from 'react-dom'
import './reset.css'
import './common.css'
import GameContainer from './containers/GameContainer'
import ProblemsContainer from './containers/ProblemsContainer'
import Actions from './data/Actions'

ReactDOM.render((
  <div>
    <header>Slither Link</header>
    <div className="content">
      <GameContainer />
      <ProblemsContainer />
      <div className="description">
        <p>遊び方</p>
        <p>・数字の数だけ線が触れるようにする</p>
        <p>・１つのループを作る</p>
        <br/>
        <p><a href="http://aikawa05.github.com/slitherlink">ソースコード（GitHub）</a></p>
      </div>
    </div>
    <footer></footer>
  </div>), document.getElementById('root'))
