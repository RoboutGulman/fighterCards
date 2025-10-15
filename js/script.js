let fightersData = [];

async function loadFightersData() {
    try {
        const response = await fetch('data/fighters.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fightersData = await response.json();
        renderFighters();
    } catch (error) {
        console.error('Error loading fighters data:', error);
        showError('Не удалось загрузить данные бойцов. Проверьте консоль для подробностей.');
    }
}

function showError(message) {
    const container = document.getElementById('fightersContainer');
    container.innerHTML = `<div class="error">${message}</div>`;
}

function renderFighters() {
    const container = document.getElementById('fightersContainer');
    container.innerHTML = '';

    if (fightersData.length === 0) {
        container.innerHTML = '<div class="loading">Нет данных о бойцах</div>';
        return;
    }

    fightersData.forEach((fighter, index) => {
        const fighterCard = document.createElement('div');
        fighterCard.className = 'fighter-card';
        fighterCard.id = `fighter-${index}`;

        let html = `
            <button class="delete-btn" onclick="deleteFighter(${index})">✕ Удалить</button>
            <table class="stats-table">
                <tr>
                    <th colspan="2">${fighter.name}</th>
                </tr>
                <tr>
                    <th>Движение</th>
                    <td>${fighter.movement}</td>
                </tr>
                <tr>
                    <th>Ближний бой</th>
                    <td>${fighter.melee >= 0 ? '+' : ''}${fighter.melee}</td>
                </tr>
                <tr>
                    <th>Стрельба</th>
                    <td>${fighter.range >= 0 ? '+' : ''}${fighter.range}</td>
                </tr>
                <tr>
                    <th>Броня</th>
                    <td>${fighter.armour >= 0 ? '+' : ''}${fighter.armour}</td>
                </tr>
            </table>

            <table>
                <tr>
                    <th colspan="4" class="section-title">Оружие</th>
                </tr>
                <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Дальность</th>
                    <th>Модификаторы</th>
                </tr>
        `;

        fighter.оружие.forEach(weapon => {
            html += `
                <tr class="weapon-row-main">
                    <td>${weapon.название}</td>
                    <td>${weapon.тип}</td>
                    <td>${weapon.дальность}</td>
                    <td>${weapon.модификаторы}</td>
                </tr>
                <tr class="weapon-row-details">
                    <td colspan="2"><strong>Keywords:</strong> ${weapon.keywords}</td>
                    <td colspan="2"><strong>Rules:</strong> ${weapon.rules}</td>
                </tr>
            `;
        });

        html += `
            </table>

            <table>
                <tr>
                    <th colspan="2" class="section-title">Спец. способности</th>
                </tr>
                <tr>
                    <th>Название</th>
                    <th>Описание</th>
                </tr>
        `;

        fighter.спец_способности.forEach(ability => {
            html += `
                <tr>
                    <td>${ability.название}</td>
                    <td>${ability.описание}</td>
                </tr>
            `;
        });

        html += `</table>`;
        fighterCard.innerHTML = html;
        container.appendChild(fighterCard);
    });
}

function deleteFighter(index) {
    const fighterCard = document.getElementById(`fighter-${index}`);
    if (fighterCard) {
        fighterCard.style.display = 'none';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('fightersContainer');
    container.innerHTML = '<div class="loading">Загрузка данных...</div>';
    loadFightersData();
});