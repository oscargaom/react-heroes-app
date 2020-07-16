import { heroes } from "../data/heroes";

export const getHeroresByName = (name = '') => {

    if (name === '') {
        return [];
    }

    const lowerName = name.toLocaleLowerCase();

    return heroes.filter(hero => hero.superhero.toLocaleLowerCase().includes(lowerName));

    
}
