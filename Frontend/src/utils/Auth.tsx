
class Auth {
    static login(username: string, password: string): boolean {
      if (username === 'sam' && password === 'asd') {
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