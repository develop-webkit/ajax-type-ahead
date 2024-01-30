"use strict;"

const endpoint = 'resourses/js/cities.json';
const cities = [];
const inputValue = document.querySelector('.search');
const ulSeg = document.querySelector(".suggestions");

fetch(endpoint)
    .then((blob)=> blob.json())
    .then((data)=> cities.push(...data));

function findMatches(){
    const filterCity = cities.filter((city)=>{
        const regEp = new RegExp(this.value,'gi')
        return city.city.match(regEp) || city.state.match(regEp);
    });
    displayMatches(filterCity,this.value);
}

function displayMatches(places,wordToFind){
    const liDis = places
        .map((place)=>{
            const colorReg = new RegExp(wordToFind,'gim');
            const cityName = place.city.replace(colorReg,`<span class="hl">${wordToFind}</span>`);
            const stateName = place.state.replace(colorReg,`<span class="hl">${wordToFind}</span>`);
            return `<li><span>${cityName}, ${stateName}</span>  <span class="population">${Number(place.population).toLocaleString()} </span></li>`;
        })
        .join("");
    
    ulSeg.innerHTML = liDis;
}

setTimeout(() => {
    inputValue.addEventListener('input',findMatches);
}, 1000);

