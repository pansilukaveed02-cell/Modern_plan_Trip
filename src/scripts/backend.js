/** 
 * SIMULATED BACKEND API & DATABASE (V1.0)
 * Uses LocalStorage to persist User accounts and Trips.
 * Mocks API latency to truly mimic a real server-side infrastructure.
 */

class MockBackend {
    static async delay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- AUTHENTICATION MOCK API ---
    
    static async registerUser(username, password) {
        await this.delay();
        let users = JSON.parse(localStorage.getItem('backend_users') || '[]');
        if (users.find(u => u.username === username)) {
            throw new Error("Username already exists in the database.");
        }
        
        const newUser = { id: 'u_' + Date.now(), username, password }; // In real world, hash pass!
        users.push(newUser);
        localStorage.setItem('backend_users', JSON.stringify(users));
        return { success: true, user: { id: newUser.id, username } };
    }

    static async loginUser(username, password) {
        await this.delay();
        let users = JSON.parse(localStorage.getItem('backend_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (!user) {
            throw new Error("Invalid username or password.");
        }
        // Issue faux JWT Token string
        const fakeToken = btoa(JSON.stringify({ userId: user.id, username: user.username, exp: Date.now() + 86400000 }));
        localStorage.setItem('auth_token', fakeToken);
        return { success: true, token: fakeToken, user: { username: user.username } };
    }

    static logout() {
        localStorage.removeItem('auth_token');
        window.location.href = 'index.html';
    }

    static getCurrentUser() {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;
        try {
            const decoded = JSON.parse(atob(token));
            if (decoded.exp < Date.now()) {
                this.logout();
                return null;
            }
            return decoded;
        } catch(e) {
            return null;
        }
    }

    // --- TRIPS DATABASE API --- (User specific)
    
    static async getTrips() {
        await this.delay(300);
        const user = this.getCurrentUser();
        if (!user) throw new Error("Unauthorized Access (401)");
        
        const trips = JSON.parse(localStorage.getItem('backend_trips') || '[]');
        return trips.filter(t => t.userId === user.userId);
    }

    static async addTrip(destination, date) {
        await this.delay();
        const user = this.getCurrentUser();
        if (!user) throw new Error("Unauthorized Access (401)");

        const newTrip = {
            id: 't_' + Date.now().toString(),
            userId: user.userId,
            destination,
            date,
            completed: false
        };
        const trips = JSON.parse(localStorage.getItem('backend_trips') || '[]');
        trips.push(newTrip);
        localStorage.setItem('backend_trips', JSON.stringify(trips));
        return newTrip;
    }

    static async removeTrip(id) {
        await this.delay(300);
        let trips = JSON.parse(localStorage.getItem('backend_trips') || '[]');
        trips = trips.filter(t => t.id !== id);
        localStorage.setItem('backend_trips', JSON.stringify(trips));
        return { success: true };
    }

    static async updateTripStatus(id, isCompleted) {
        await this.delay(200);
        let trips = JSON.parse(localStorage.getItem('backend_trips') || '[]');
        const idx = trips.findIndex(t => t.id === id);
        if (idx > -1) {
            trips[idx].completed = isCompleted;
            localStorage.setItem('backend_trips', JSON.stringify(trips));
        }
        return { success: true };
    }

    static async clearCompleted() {
        await this.delay(400);
        const user = this.getCurrentUser();
        if (!user) return;
        
        let trips = JSON.parse(localStorage.getItem('backend_trips') || '[]');
        trips = trips.filter(trip => trip.userId !== user.userId || !trip.completed);
        localStorage.setItem('backend_trips', JSON.stringify(trips));
        return { success: true };
    }

    // --- WORLD PLACES DATABSE ---
    static async getTopDestinations() {
        await this.delay(600);
        return [
            { id: 1, name: 'Maldives', type: 'Tropical', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80', description: 'Crystal clear waters and white sandy beaches.' },
            { id: 2, name: 'Paris, France', type: 'Cultural', image: 'https://images.unsplash.com/photo-1502602898657-3e9076113b56?auto=format&fit=crop&w=600&q=80', description: 'The city of light, romance, and iconic landmarks.' },
            { id: 3, name: 'Kyoto, Japan', type: 'Heritage', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', description: 'Experience ancient temples and beautiful cherry blossoms.' },
            { id: 4, name: 'Santorini, Greece', type: 'Coastal', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f2?auto=format&fit=crop&w=600&q=80', description: 'Breathtaking sunsets and dramatic oceanic cliffs.' },
            { id: 5, name: 'Swiss Alps', type: 'Adventure', image: 'https://images.unsplash.com/photo-1527668752968-14ce70a6c6e0?auto=format&fit=crop&w=600&q=80', description: 'Perfect for skiing, hiking, and spectacular mountain views.' },
            { id: 6, name: 'Bali, Indonesia', type: 'Tropical', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', description: 'A lush paradise of temples, waterfalls, and vibrant culture.' }
        ];
    }
}
