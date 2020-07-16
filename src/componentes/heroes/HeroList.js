import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({publisher}) => {

    
    /*  Se recomienda que en este tipo de llamados se haga uso del hook useMemo
    para guardar los valores que retorna la función o bien un api, para que 
    cada vez que se cargue la página no se haga un llamado extra y esto afecte 
    el performance de la aplicación. el hook useMemo guardará el último valor 
    del llamado y solamente se volverá a ejecutar si alguna de las variables 
    de las cuales tiene depdencia sufre algún cambio o modificación.
    */

    // const heroes = getHeroesByPublisher(publisher);
    const heroes =  useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    // console.log(heroes);

    return (
        <div className="card-columns animate__animated animate__pulse">
            {
                heroes.map( hero => 
                    <HeroCard key={hero.id} {...hero}/>
                )
            }
        </div>
    )
}
