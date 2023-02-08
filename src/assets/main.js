/*Código obtenido de https://rapidapi.com/ sección youtube v3, channel videos, ingresando el ID de un canal
de youtube en la columna del centro (Get channel videos), en la sección code snippets se selecciona la opción   
javascript - fetch y se copia el código.

*/
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCYg7CxbDK_jwU1bQ-l2964A&part=snippet%2Cid&order=date&maxResults=15'; //URL tomada del bloque fetch

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e5ea7654damshdc21a7f072e45c7p10645ajsnda8a838507da',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/*
fetch('', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options)
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}"target="_blank">
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
            </div>
        </div>
        </a>
        `).slice(0,4).join('')}
            
      `;
      content.innerHTML = view;
    } catch (error){
        console.log(error);
    }
})();