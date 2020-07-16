import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroresByName } from '../../selectors/getHeroresByName';


export const SearchScreen = ({ history }) => {

    /*  Por medio de este hook podemos tener acceso al queryString de la url,
    como ejemplo pudieramos tomar la siguiente url http://localhost:3000/search?q=Batman
    y de la cual nos interese obtener el valor de "q", entonces, podemos obtener su 
    valor haciendo uso del hook useLocation()
    */
    const location = useLocation();

    const { search } = location;
    // console.log(`search: ${search}`);
    // console.log(`queryString.parse: `)
    // console.log(queryString.parse(search))

    const { q = "" } = queryString.parse(search);
    // console.log(`q: ${q}`);

    const [{ searchText }, formHandleInputChange] = useForm({
       searchText: q
    });

    const heroesFiltered = useMemo(() => getHeroresByName(q), [q])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(`handleFormSubmit: "${searchText}"`);
        history.push(`?q=${searchText}`);
    };

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            {/* {searchText} */}
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="searchText"
                            value={searchText}
                            placeholder="Find a hero"
                            className="form-control"
                            autoComplete="off"
                            onChange={formHandleInputChange}
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        (q === '') && <div className="alert alert-info">
                            Search a hero
                                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) && <div className="alert alert-danger">
                            Not found a hero
                                    </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
