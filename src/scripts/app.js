// UI Controller Layer - Connected to Simulated Backend

document.addEventListener('DOMContentLoaded', async () => {
    // PROTECT ROUTE: Check Auth State
    const user = MockBackend.getCurrentUser();
    if (!user) {
        window.location.href = 'auth.html?mode=login';
        return;
    }

    // Set User Greeting
    document.querySelector('.header h2').innerHTML = `Hello, ${user.username} 👋`;

    const tripForm = document.getElementById('trip-form');
    const destInput = document.getElementById('destination-input');
    const dateInput = document.getElementById('date-input');
    const tripList = document.getElementById('trip-list');
    const counterDisplay = document.getElementById('counter');
    const clearBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    let currentFilter = 'all';

    async function renderTrips() {
        try {
            let trips = await MockBackend.getTrips();
            
            // Filter Logic
            if (currentFilter === 'active') {
                trips = trips.filter(t => !t.completed);
            } else if (currentFilter === 'completed') {
                trips = trips.filter(t => t.completed);
            }

            tripList.innerHTML = '';
            trips.forEach(trip => {
                const card = document.createElement('div');
                card.className = `trip-card ${trip.completed ? 'completed' : ''}`;
                card.innerHTML = `
                    <div class="trip-card-header">
                        <div>
                            <div class="trip-dest">${trip.destination}</div>
                            <div class="trip-date"><i class="fa-regular fa-calendar"></i> ${new Date(trip.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                        </div>
                    </div>
                    <div class="trip-actions">
                        <label class="status-check-container">
                            <input type="checkbox" class="status-check" ${trip.completed ? 'checked' : ''} data-id="${trip.id}">
                            <span class="status-label">${trip.completed ? 'Completed' : 'Upcoming'}</span>
                        </label>
                        <button class="delete-btn" data-id="${trip.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                tripList.appendChild(card);
            });
            
            // Update Counter
            counterDisplay.textContent = trips.length;
        } catch(e) {
            console.error("Failed to fetch trips", e);
            if(e.message.includes("401")) MockBackend.logout();
        }
    }

    tripForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const dest = destInput.value;
        const date = dateInput.value;
        
        // Show loading state on btn
        const btn = document.getElementById('add-btn');
        const oldHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>`;
        
        try {
            await MockBackend.addTrip(dest, date);
            destInput.value = '';
            dateInput.value = '';
            await renderTrips();
        } catch(e) {
            console.error(e);
        } finally {
            btn.innerHTML = oldHtml;
        }
    });

    tripList.addEventListener('click', async (e) => {
        if (e.target.closest('.delete-btn')) {
            const id = e.target.closest('.delete-btn').dataset.id;
            // Optimistic deletion could go here, but doing standard wait.
            e.target.closest('.delete-btn').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
            await MockBackend.removeTrip(id);
            await renderTrips();
        } else if (e.target.classList.contains('status-check')) {
            const id = e.target.dataset.id;
            await MockBackend.updateTripStatus(id, e.target.checked);
            await renderTrips();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            await renderTrips();
        });
    });

    clearBtn.addEventListener('click', async () => {
        const oldHtml = clearBtn.innerHTML;
        clearBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Clearing...`;
        await MockBackend.clearCompleted();
        await renderTrips();
        clearBtn.innerHTML = oldHtml;
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            MockBackend.logout();
        });
    }

    // Initial Render
    renderTrips();
});
