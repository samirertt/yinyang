class Auth {
  // Instead of checking credentials, we now store and retrieve the JWT token.
  
  static login(token: string): void {
    // Store the token in localStorage
    localStorage.setItem("jwtToken", token);
  }

  static logout(): void {
    localStorage.removeItem("jwtToken");
  }

  static isAuthenticated(): boolean {
    // Simply check if the token exists.
    return !!localStorage.getItem("jwtToken");
  }

  static getToken(): string | null {
    return localStorage.getItem("jwtToken");
  }
}

export default Auth;
