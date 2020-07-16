import React from 'react'
import { Navbar } from '../componentes/ui/Navbar'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MarvelScreen } from '../componentes/marvel/MarvelScreen'
import { HeroeScreen } from '../componentes/heroes/HeroeScreen'
import { DcScreen } from '../componentes/dc/DcScreen'
import { SearchScreen } from '../componentes/search/SearchScreen'

// export const DashboardRoutes = ({ history }) => {
export const DashboardRoutes = (props) => {
    // console.log('=======================');
    // console.log('DashboardRoutes.history');
    // console.log({ history });
    // console.log(props);

    return (
        <>
            {/* Como Navbar es un componente que no se encuentra dentro de una rutas (Route) 
                este no tiene acceso a las props por eso hay que pasarleas */}
            {/* <Navbar history={history} /> */}
            <Navbar />

            <div className="container mt-3">
                <Switch>
                    <Route exact path="/marvel" component={MarvelScreen} />
                    <Route exact path="/hero/:heroId" component={HeroeScreen} />
                    <Route exact path="/dc" component={DcScreen} />
                    <Route exact path="/search" component={SearchScreen} />
                    <Redirect to="/marvel" />
                </Switch>
            </div>
        </>
    )
}
