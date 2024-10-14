// Використовуємо getElementsByClassName для вибору всіх постерів
const posters = document.getElementsByClassName('poster');

// Використовуємо getElementById для вибору кнопок
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const buyTicketButton = document.getElementById('buy-ticket-btn');

// Використовуємо querySelector для вибору контейнера постерів
const posterContainer = document.querySelector('#poster-container');

// Ініціалізація змінних для перегортання постерів
let currentPosterIndex = 0;

// Функція для оновлення видимих постерів
function updatePosters(index) {
    for (let i = 0; i < posters.length; i++) {
        posters[i].style.display = i === index ? 'inline-block' : 'none';
    }
}

// Відображення першого постера на початку
updatePosters(currentPosterIndex);

// Обробка натискання на кнопки "Наступний" і "Попередній"
nextButton.addEventListener('click', () => {
    currentPosterIndex = (currentPosterIndex + 1) % posters.length;
    updatePosters(currentPosterIndex);
});

prevButton.addEventListener('click', () => {
    currentPosterIndex = (currentPosterIndex - 1 + posters.length) % posters.length;
    updatePosters(currentPosterIndex);
});

// Додаємо обробники подій для кожного постера
Array.from(posters).forEach((poster) => {
    // Обробка натискання на постер
    poster.addEventListener('click', (event) => {
        const filmId = event.target.id;
        alert(`Ви вибрали фільм: ${filmId}`);
    });

    // Обробка події mouseover
    poster.addEventListener('mouseover', () => {
        poster.style.border = '2px solid #ff5722';
    });

    // Обробка події mouseout
    poster.addEventListener('mouseout', () => {
        poster.style.border = 'none';
    });
});

// Обробка покупки білета
buyTicketButton.addEventListener('click', () => {
    alert('Купівля білета завершена!');
});

// Використовуємо getElementsByTagName для вибору всіх елементів <p>
const paragraphs = document.getElementsByTagName('p');

// Додаємо обробник події mouseover до першого параграфа
paragraphs[0].addEventListener('mouseover', () => {
    paragraphs[0].style.color = '#ff5722';
});

paragraphs[0].addEventListener('mouseout', () => {
    paragraphs[0].style.color = 'black';
});
