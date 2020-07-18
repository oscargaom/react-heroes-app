import React, { useMemo } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    /*  useParams es un hook que nos proporciona react-router-dom y nos
        ayuda a obtener los parámetros de las urls (query params). 
        Como en este caso hacemos uso del parámetro heroId en la 
        url: /hero/:heroId, este hook nos ayudará a obtenerlo de manera sencilla.
    */
    const params = useParams();

    const { heroId } = params;

    // console.log(heroId);

    // const hero = getHeroById(heroId);
    
    /*  Se recomienda que en este tipo de llamados se haga uso del hook useMemo
        para guardar los valores que retorna la función o bien un api, para que 
        cada vez que se cargue la página no se haga un llamado extra y esto afecte 
        el performance de la aplicación. el hook useMemo guardará el último valor 
        del llamado y solamente se volverá a ejecutar si alguna de las variables 
        de las cuales tiene depdencia sufre algún cambio o modificación.
    */
    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    // console.log(hero);

    const handleReturn = () => {
        
        // console.log(history);
        
        /*  history.length contine el histórico del número de páginas sobre 
        las que hemos navegado, de modo que si son pocas significa que 
        copiamos la url y comenzamos a navegar desde ahí y no desde un login.
        */
       if (history.length <= 2) {
           history.push("/");
        } else {
            history.goBack();
        }
    };

    if (!hero) {
        // console.log('<Redirect to="/"');
        return <Redirect to="/" />
    }

    const { superhero, publisher, alter_ego,
        first_appearance, characters } = hero;

    // console.log(superhero);
    // console.log(publisher);
    // console.log(alter_ego);
    // console.log(first_appearance);
    // console.log(characters);    

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={`../assets/heroes/${heroId}.jpg`} alt={superhero} 
                    className="img-thumbnail card-img animate__animated animate__zoomInDown" />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>Alter ego: </b> {alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher: </b> {publisher}
                    </li>
                    <li className="list-group-item">
                        <b>First Appearance: </b> {first_appearance}
                    </li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
