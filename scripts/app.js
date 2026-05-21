// Local Storage Based Backend Layer
class TripAPI {
    static getTrips() {
        const trips = localStorage.getItem('trips');
        return trips ? JSON.parse(trips) : [];
    }

    static addTrip(trip) {
        const trips = TripAPI.getTrips();
        trips.push(trip);
        localStorage.setItem('trips', JSON.stringify(trips));
    }

    static removeTrip(id) {
        let trips = TripAPI.getTrips();
        trips = trips.filter(trip => trip.id !== id);
        localStorage.setItem('trips', JSON.stringify(trips));
    }

    static updateTripStatus(id, isCompleted) {
        const trips = TripAPI.getTrips();
        const tripIndex = trips.findIndex(trip => trip.id === id);
        if (tripIndex !== -1) {
            trips[tripIndex].completed = isCompleted;
            localStorage.setItem('trips', JSON.stringify(trips));
        }
    }

    static clearCompleted() {
        let trips = TripAPI.getTrips();
        trips = trips.filter(trip => !trip.completed);
        localStorage.setItem('trips', JSON.stringify(trips));
    }
}

// UI Controller Layer
document.addEventListener('DOMContentLoaded', () => {
    const tripForm = document.getElementById('trip-form');
    const destInput = document.getElementById('destination-input');
    const dateInput = document.getElementById('date-input');
    const tripList = document.getElementById('trip-list');
    const counterDisplay = document.getElementById('counter');
    const clearBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';

    function renderTrips() {
        let trips = TripAPI.getTrips();
        
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
    }

    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTrip = {
            id: Date.now().toString(),
            destination: destInput.value,
            date: dateInput.value,
            completed: false
        };
        TripAPI.addTrip(newTrip);
        destInput.value = '';
        dateInput.value = '';
        renderTrips();
    });

    tripList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            const id = e.target.closest('.delete-btn').dataset.id;
            TripAPI.removeTrip(id);
            renderTrips();
        } else if (e.target.classList.contains('status-check')) {
            const id = e.target.dataset.id;
            TripAPI.updateTripStatus(id, e.target.checked);
            renderTrips();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTrips();
        });
    });

    clearBtn.addEventListener('click', () => {
        TripAPI.clearCompleted();
        renderTrips();
    });

    // Initial Render
    renderTrips();
});
