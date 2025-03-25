import axios from "axios";
import { NavigateFunction } from "react-router-dom";
axios.defaults.withCredentials = true;
const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

interface User {
    name: string;
    email: string;
}

class Auth  {
    isAuthenticated: boolean;
    user: User | null;
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.loadUserFromStorage();
    }
    private loadUserFromStorage(): void {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
                this.isAuthenticated = this.checkTokenExpiration();
            }
            catch (err) {
                console.error('Failed to parse user from local storage', err);
                localStorage.removeItem('user');
            }
        }
    }

    async login(name: string, email: string): Promise<boolean> {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { name, email });
            if(!response.request.response) {
                throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
            }
            const user: User = {name, email};
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loginTime', new Date().toISOString());

            this.isAuthenticated = true;
            this.user = user;

            return true;
        } catch (err) {
            console.error('Login error', err);
            return false;
        }
    }

    async logout(navigate? : NavigateFunction): Promise<void> {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`);
        } catch (err) {
            console.error('Logout error', err);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('loginTime');
            this.isAuthenticated = false;
            this.user = null;
            
            if (navigate) {
                navigate('/');
            }
        }
    }

    checkTokenExpiration(): boolean {
        const loginTime = localStorage.getItem('loginTime');
        if (!loginTime) {
            return false;
        }
        try {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const timeDiffMs = now.getTime() - loginDate.getTime();
        const hourInMs = 60 * 60 * 1000;
        return timeDiffMs < hourInMs;
        } catch (err) {
            console.error('Failed to check token expiration', err);
            return false;
        }
        
    }

    getUser(): User | null {
        if (!this.checkTokenExpiration()) {
            // Don't call logout here to avoid infinite loop
            this.isAuthenticated = false;
            return null;
        }
        return this.user;
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated && this.checkTokenExpiration();
    }

    createAuthenticatedAxiosInstance() {
        const instance = axios.create({
          baseURL: API_BASE_URL,
          withCredentials: true,
        });
        
        // Add response interceptor to handle 401 errors
        instance.interceptors.response.use(
          response => response,
          error => {
            if (error.response && error.response.status === 401) {
              // Clear auth state on unauthorized
              localStorage.removeItem('user');
              localStorage.removeItem('loginTime');
              this.isAuthenticated = false;
              this.user = null;
            }
            return Promise.reject(error);
          }
        );
        
        return instance;
      }
    
        
}



const authInstance = new Auth();
export default authInstance;