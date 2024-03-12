const apiKey = 'live_6ViJij85dNfCko6PJcsb6Do1dFAkCmTteN0nxQcbOI40VKzDwRujH7hizNcubfDC';

const catImg = document.getElementById('cat-img-1');
const catImg2 = document.getElementById('cat-img-2');

const spanMSGs = document.querySelector('.inputMessage');
const form = document.getElementById('search-form');

const input = document.getElementById('input-search');

const fetchBreedById = async (breedId) => {
    const APIResponse = await fetch(`https://api.thecatapi.com/v1/images/search?limit=2&api_key=${apiKey}&breed_ids=${breedId}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderCat = async (breedId) => {
    spanMSGs.textContent = 'Loading...';

    const data = await fetchBreedById(breedId);

    if (data && data.length > 0) {
        spanMSGs.textContent = ''
        catImg.src = data[0].url;
        catImg2.src = data[1].url;

        input.value = ''
    } else {
        spanMSGs.textContent = "ID não encontrado, digite um ID válido"
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    await renderCat(input.value.toLowerCase())
})

renderCat('cypr');