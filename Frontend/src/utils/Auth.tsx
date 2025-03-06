
class Auth {
    static login(username: string, password: string): boolean {
      if (username === 'moderator' && password === 'asd' || username === 'admin' && password === 'asd' || username === 'user' && password === 'asd') {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      }
      return false;
    }
  
    static logout(): void {
      localStorage.removeItem('isAuthenticated');
    }
  
    static isAuthenticated(): boolean {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
  }
  
  export default Auth;