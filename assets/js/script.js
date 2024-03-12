const apiKey = 'live_6ViJij85dNfCko6PJcsb6Do1dFAkCmTteN0nxQcbOI40VKzDwRujH7hizNcubfDC';

const catImg = document.getElementById('cat-img-1');
const catImg2 = document.getElementById('cat-img-2');

const errorMSGs = document.querySelector('.inputMessage')
const form = document.getElementById('search-form');

const input = document.getElementById('input-search');

const fetchBreedById = async (breedId) => {
    const APIResponse = await fetch(`https://api.thecatapi.com/v1/images/search?limit=2&api_key=${apiKey}&breed_ids=${breedId}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const fetchBreedByName = async (breedName) => {
    const APIResponse = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        if (data.length > 0) {
            return data[0].id; 
        }
    }
    return null;
}

const renderCat = async (breed) => {
    errorMSGs.textContent = 'Loading...'

    let breedId = breed;
  
        breedId = await fetchBreedByName(breed);
        if (!breedId) {
            errorMSGs.textContent = "Raça não encontrada, digite um nome ou ID de raça válido";
            catImg.src = '';
            catImg2.src = '';
            return;
        }
    

    const data = await fetchBreedById(breedId);

    if (data && data.length > 0) {
        errorMSGs.textContent = ''
        catImg.src = data[0].url;
        catImg2.src = data[1].url;

        input.value = ''
    } else {
        errorMSGs.textContent = "ID não encontrado, digite um ID válido"
    }

}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    await renderCat(input.value.toLowerCase())
    
})

renderCat('cypr');

const btnMenu = document.getElementById("btn-menu");
const menuMobile = document.getElementById("menu-mobile");
const overlayMenu = document.getElementById("overlay-menu");
btnMenu.addEventListener('click', () => {
    menuMobile.classList.add('open-menu');
});

menuMobile.addEventListener('click', () => {
    menuMobile.classList.remove('open-menu');
});

overlayMenu.addEventListener('click', () => {
    menuMobile.classList.remove('open-menu');
});