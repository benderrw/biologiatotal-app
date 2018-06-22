import React from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'

import Alunos from './components/Alunos'
import Cursos from './components/Cursos'

import './App.css'

export default () => {
  return (
    <div className="App">
      <div className="Nav">
        <NavLink to="/alunos" className="NavItem" activeClassName="active">Alunos</NavLink>
        <NavLink to="/cursos" className="NavItem" activeClassName="active">Cursos</NavLink>
      </div>

      <div className="Dashboard">
        <Switch>
          <Route path='/alunos' component={Alunos}/>
          <Route path='/cursos' component={Cursos}/>
          <Redirect from='/' to='/alunos'/>
        </Switch>
      </div>
    </div>
  )
}
