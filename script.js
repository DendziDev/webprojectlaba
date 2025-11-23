// 
// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Переключение активного состояния кнопок дат в расписании
document.querySelectorAll('.date-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.date-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
    });
});



// Анимация при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.movie-card, .schedule-item, .feature');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            if(element.classList.contains('schedule-item')) {
                element.classList.add('visible');
            } else {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        }
    });
}

// Установка начального состояния для анимации
document.querySelectorAll('.movie-card, .schedule-item, .feature').forEach(element => {
    if(!element.classList.contains('movie-card')) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
});

// Добавление обработчика события скролла
window.addEventListener('scroll', animateOnScroll);

// Инициализация анимации для первых видимых элементов
window.addEventListener('load', animateOnScroll);

// Добавление анимации параллакса для героя
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if(hero) {
        const speed = scrolled * 0.4;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Улучшенная анимация при наведении на элементы расписания
document.querySelectorAll('.schedule-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.01)';
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.6)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Добавляем анимацию плавного появления элементов расписания при загрузке
document.querySelectorAll('.schedule-item').forEach((item, index) => {
    // Устанавливаем начальное состояние для анимации
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Добавляем задержку для поочередной анимации
    setTimeout(() => {
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 200 * index);
});

// Улучшенная функция анимации при скролле для элементов расписания
function animateScheduleItemsOnScroll() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (itemPosition < screenPosition && !item.classList.contains('animated')) {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('animated');
        }
    });
}

// Добавляем обработчик события прокрутки для анимации элементов расписания
window.addEventListener('scroll', animateScheduleItemsOnScroll);

// Инициализация анимации для элементов расписания при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем анимацию при полной загрузке DOM
    setTimeout(animateScheduleItemsOnScroll, 300);
});

// Добавляем анимацию при клике на кнопки времени сеансов
document.querySelectorAll('.showtime').forEach(button => {
    button.addEventListener('click', function() {
        // Визуальная обратная связь при клике
        this.style.transform = 'scale(0.95)';
        this.style.boxShadow = '0 2px 5px rgba(229, 9, 20, 0.3)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);
        
        // Меняем стиль выбранного времени (если нужно)
        document.querySelectorAll('.showtime').forEach(btn => {
            btn.style.background = 'linear-gradient(135deg, #e50914, #f40612)';
        });
        
        this.style.background = 'linear-gradient(135deg, #f40612, #e50914)';
    });
});

// Анимация для изображений фильмов в расписании
document.querySelectorAll('.schedule-movie img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Унифицированная функция для открытия модального окна покупки билетов
function openTicketModal(movieTitle, movieId) {
    console.log('Открытие модального окна для фильма:', movieTitle, 'ID:', movieId); // Для отладки
    
    // Проверяем, существует ли уже модальное окно
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Покупка билета на "${movieTitle}"</h2>
            <div class="ticket-form">
                <div class="form-group">
                    <label for="date">Дата:</label>
                    <input type="date" id="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Время:</label>
                    <select id="time" required>
                        <option value="">Выберите время</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tickets">Количество билетов:</label>
                    <input type="number" id="tickets" min="1" max="10" value="1" onchange="updateSeatSelection()">
                </div>
                <div class="form-group">
                    <label>Выберите зал:</label>
                    <div class="hall-selector">
                        <div class="hall-option active" data-hall="standard" style="background-color: #9370DB;">Стандартный зал</div>
                        <div class="hall-option" data-hall="vip" style="background-color: #E50914;">VIP зал</div>
                        <div class="hall-option" data-hall="imax" style="background-color: #808080;">IMAX зал</div>
                    </div>
                </div>
                <div class="screen">Экран</div>
                <div id="seat-map" class="seat-map">
                    <!-- Места будут загружаться динамически -->
                </div>
                <div class="selected-seats-info">
                    <p>Выбрано мест: <span id="selected-count">0</span>/10</p>
                    <p>Выбранные места: <span id="selected-seats-list"></span></p>
                </div>
                <button class="btn btn-primary" onclick="confirmPurchase('${movieTitle}', ${movieId})">Забронировать</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    console.log('Модальное окно добавлено в DOM'); // Для отладки

    // Загружаем времена сеансов для фильма
    loadShowtimesForMovie(movieId, 'time');
    console.log('Времена сеансов загружены'); // Для отладки

    // Добавляем обработчик изменения времени сеанса для загрузки схемы мест
    const timeSelect = document.getElementById('time');
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            loadSeatMap(movieId);
        });
        console.log('Обработчик изменения времени добавлен'); // Для отладки
    }

    // Добавляем обработчики для переключения залов
    const hallOptions = document.querySelectorAll('.hall-option');
    hallOptions.forEach(option => {
        option.addEventListener('click', function() {
            hallOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // Сохраняем выбранный зал
            localStorage.setItem('selectedHall', this.dataset.hall);

            // Обновляем схему мест для выбранного зала
            loadSeatMap(movieId);
        });
    });

    // Инициализируем схему мест для выбранного зала
    const savedHall = localStorage.getItem('selectedHall') || 'standard';
    hallOptions.forEach(option => {
        option.classList.remove('active');
        if(option.dataset.hall === savedHall) {
            option.classList.add('active');
        }
    });

    // Загружаем схему мест для выбранного зала
    loadSeatMap(movieId);

    // Обработчик закрытия модального окна
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Функция для загрузки схемы мест
function loadSeatMap(movieId) {
    console.log('Загрузка схемы мест для фильма:', movieId); // Для отладки
    
    const date = document.getElementById('date')?.value;
    const time = document.getElementById('time')?.value;
    const seatMap = document.getElementById('seat-map');

    if (!seatMap) return;
    
    // Если время не выбрано, очищаем схему мест
    if (!time) {
        seatMap.innerHTML = '';
        return;
    }

    // Получаем выбранный зал
    const selectedHall = localStorage.getItem('selectedHall') || 'standard';

    // Очищаем текущую схему
    seatMap.innerHTML = '';

    // Устанавливаем цвет фона в зависимости от зала
    switch(selectedHall) {
        case 'standard':
            seatMap.style.backgroundColor = '#9370DB';
            break;
        case 'vip':
            seatMap.style.backgroundColor = '#E50914';
            break;
        case 'imax':
            seatMap.style.backgroundColor = '#808080';
            break;
        default:
            seatMap.style.backgroundColor = '#333';
    }

    // Определяем конфигурацию зала в зависимости от типа
    let rows, seatsPerRow;
    switch(selectedHall) {
        case 'standard':
            rows = 10;
            seatsPerRow = 10;
            break;
        case 'vip':
            rows = 8;
            seatsPerRow = 8;
            break;
        case 'imax':
            rows = 12;
            seatsPerRow = 12;
            break;
        default:
            rows = 10;
            seatsPerRow = 10;
    }

    // Генерируем схему зала
    for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            const seatElement = document.createElement('div');
            seatElement.className = 'seat';
            const seatNumber = `${String.fromCharCode(64 + row)}${seat}`;
            seatElement.dataset.seatNumber = seatNumber;
            seatElement.textContent = seatNumber;
            
            // Добавляем обработчик клика для выбора места
            seatElement.addEventListener('click', function() {
                if (!this.classList.contains('occupied')) {
                    this.classList.toggle('selected');
                    updateSelectedSeatsInfo();
                }
            });
            
            seatMap.appendChild(seatElement);
        }
    }
}

// Функция для переключения выбора места
function toggleSeatSelection(seatElement) {
    if (seatElement.classList.contains('occupied')) return;
    
    seatElement.classList.toggle('selected');
    
    // Обновляем информацию о выбранных местах
    updateSelectedSeatsInfo();
}

// Функция для обновления информации о выбранных местах
function updateSelectedSeatsInfo() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const countElement = document.getElementById('selected-count');
    const listElement = document.getElementById('selected-seats-list');
    const ticketsInput = document.getElementById('tickets');
    
    if (countElement && listElement) {
        const selectedCount = selectedSeats.length;
        countElement.textContent = selectedCount;
        
        const seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seatNumber);
        listElement.textContent = seatNumbers.join(', ') || 'нет';
        
        // Обновляем количество билетов, если нужно
        if (ticketsInput && selectedCount > 0) {
            ticketsInput.value = selectedCount;
        }
    }
}

// Функция для обновления выбора мест при изменении количества билетов
function updateSeatSelection() {
    const ticketsInput = document.getElementById('tickets');
    const selectedSeats = document.querySelectorAll('.seat.selected');
    
    if (ticketsInput && selectedSeats.length > ticketsInput.value) {
        // Если выбрано больше мест, чем количество билетов, снимаем лишние выделения
        const excessSeats = Array.from(selectedSeats).slice(ticketsInput.value);
        excessSeats.forEach(seat => {
            seat.classList.remove('selected');
        });
        updateSelectedSeatsInfo();
    }
}

// Исправляем временную ошибку в массиве showtimes - там было '12:0' вместо '12:00'
function loadShowtimesForMovie(movieId, selectId) {
    // Фиксированные времена сеансов: 12:00, 15:00, 17:00, 21:00, 23:00
    const showtimes = ['12:00', '15:00', '17:00', '21:00', '23:00'];
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = '<option value="">Выберите время</option>';
    showtimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        selectElement.appendChild(option);
    });
}

async function confirmPurchase(movieTitle, movieId) {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tickets = document.getElementById('tickets').value;
    const selectedSeats = document.querySelectorAll('.seat.selected');
    
    if(!date || !time) {
        alert('Пожалуйста, выберите дату и время сеанса');
        return;
    }
    
    if(selectedSeats.length === 0) {
        alert('Пожалуйста, выберите хотя бы одно место');
        return;
    }
    
    if(selectedSeats.length > tickets) {
        alert(`Вы выбрали ${selectedSeats.length} мест, но указали количество билетов: ${tickets}. Пожалуйста, исправьте.`);
        return;
    }
    
    // Получаем номера выбранных мест
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seatNumber);
    
    // В реальном приложении здесь нужно будет отправить запрос на бронирование
    // Пока что просто показываем сообщение
    alert(`Билеты на "${movieTitle}" забронированы!\nДата: ${date}\nВремя: ${time}\nМеста: ${seatNumbers.join(', ')}\nКоличество: ${tickets} шт.`);
    
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Обработчик для кнопок "Купить билет" - улучшенная версия
document.addEventListener('click', function(e) {
    // Проверяем, является ли клик по кнопке "Купить билет"
    if (e.target.classList.contains('btn') && e.target.classList.contains('btn-primary')) {
        if (e.target.textContent.includes('Купить билет')) {
            e.preventDefault();
            console.log('Кнопка "Купить билет" нажата'); // Для отладки
            
            // Находим ближайшую карточку фильма
            const card = e.target.closest('.movie-card, [data-movie-id]');
            
            if (card) {
                let movieTitle, movieId;
                
                // Получаем заголовок фильма
                const titleElement = card.querySelector('h3');
                movieTitle = titleElement ? titleElement.textContent.trim() : 'Неизвестный фильм';
                console.log('Название фильма:', movieTitle); // Для отладки
                
                // Получаем ID фильма
                movieId = card.dataset.movieId || 1;
                console.log('ID фильма:', movieId); // Для отладки
                
                // Открываем модальное окно
                openTicketModal(movieTitle, movieId);
            } else {
                console.log('Не найдена карточка фильма'); // Для отладки
            }
        }
    }
});

// Анимация героя при загрузке
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Загрузка фильмов с сервера
$(document).ready(function() {
    $.get('api.php', { action: 'getMovies' }, function(response) {
        if(response.status === 'success') {
            updateMoviesList(response.data);
        }
    });
});

// Обновление списка фильмов на странице
function updateMoviesList(movies) {
    const moviesGrid = document.querySelector('.movies-grid');
    if(moviesGrid) {
        moviesGrid.innerHTML = ''; // Очищаем текущие фильмы
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.dataset.movieId = movie.id;
            movieCard.innerHTML = `
                <div class="movie-poster">
                    <img src="${movie.poster_url}" alt="${movie.title}">
                    <div class="movie-rating">${movie.rating}</div>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <div class="movie-meta">
                        <span class="genre">${movie.genre}</span>
                        <span class="duration">${movie.duration} мин</span>
                    </div>
                    <p>${movie.description}</p>
                    <div class="movie-actions">
                        <button class="btn btn-primary">Купить билет</button>
                        <button class="btn btn-outline">Подробнее</button>
                    </div>
                </div>
            `;
            moviesGrid.appendChild(movieCard);
        });
    }
}

// Добавляем функциональность перетаскивания для карусели фильмов
document.addEventListener('DOMContentLoaded', function() {
   const moviesGrid = document.querySelector('.movies-grid');
   
   if (moviesGrid) {
       // Добавляем обработчики для прокрутки карусели
       let isDown = false;
       let startX;
       let scrollLeft;
       
       moviesGrid.addEventListener('mousedown', (e) => {
           isDown = true;
           startX = e.pageX - moviesGrid.offsetLeft;
           scrollLeft = moviesGrid.scrollLeft;
       });
       
       moviesGrid.addEventListener('mouseleave', () => {
           isDown = false;
       });
       
       moviesGrid.addEventListener('mouseup', () => {
           isDown = false;
       });
       
       moviesGrid.addEventListener('mousemove', (e) => {
           if (!isDown) return;
           e.preventDefault();
           const x = e.pageX - moviesGrid.offsetLeft;
           const walk = (x - startX) * 2; // Увеличиваем чувствительность
           moviesGrid.scrollLeft = scrollLeft - walk;
       });
       
       // Для сенсорных устройств
       moviesGrid.addEventListener('touchstart', (e) => {
           isDown = true;
           startX = e.touches[0].pageX - moviesGrid.offsetLeft;
           scrollLeft = moviesGrid.scrollLeft;
       });
       
       moviesGrid.addEventListener('touchend', () => {
           isDown = false;
       });
       
       moviesGrid.addEventListener('touchmove', (e) => {
           if (!isDown) return;
           e.preventDefault();
           const x = e.touches[0].pageX - moviesGrid.offsetLeft;
           const walk = (x - startX) * 2; // Увеличиваем чувствительность
           moviesGrid.scrollLeft = scrollLeft - walk;
       });
   }
});