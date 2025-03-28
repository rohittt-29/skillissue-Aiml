// Mock user data (replace this with actual backend integration later)
const MOCK_USERS = [
  {
    email: 'hr@example.com',
    password: 'hr123456',
    name: 'HR Manager'
  }
];

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        // Store user data in localStorage
        const userData = {
          email: user.email,
          name: user.name,
          token: 'mock-jwt-token' // In real app, this would come from your backend
        };
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}; 