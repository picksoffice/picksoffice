import { login, register, logout, getCurrentUser, isAuthenticated } from '../auth';
import { fetchAPI } from '../api';

// Mock the fetchAPI function
jest.mock('../api', () => ({
  fetchAPI: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe('login', () => {
    it('should login successfully and store user data', async () => {
      const mockResponse = {
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        },
      };

      (fetchAPI as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await login({
        identifier: 'test@example.com',
        password: 'password123',
      });

      expect(fetchAPI).toHaveBeenCalledWith('/auth/local', {
        method: 'POST',
        body: JSON.stringify({
          identifier: 'test@example.com',
          password: 'password123',
        }),
        credentials: 'include',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockResponse.user)
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw AuthError on login failure', async () => {
      (fetchAPI as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(login({ identifier: 'test@example.com', password: 'wrong' })).rejects.toThrow(
        'Login failed. Please check your credentials and try again.'
      );
    });
  });

  describe('register', () => {
    it('should register successfully and store user data', async () => {
      const mockResponse = {
        user: {
          id: 1,
          username: 'newuser',
          email: 'new@example.com',
        },
      };

      (fetchAPI as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await register({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      });

      expect(fetchAPI).toHaveBeenCalledWith('/auth/local/register', {
        method: 'POST',
        body: JSON.stringify({
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123',
        }),
        credentials: 'include',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockResponse.user)
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle duplicate email error', async () => {
      const error = new Error('Email or Username are already taken');
      (fetchAPI as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        register({
          username: 'duplicate',
          email: 'duplicate@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('Email or username already exists. Please try another.');
    });
  });

  describe('logout', () => {
    it('should call logout endpoint and clear localStorage', async () => {
      (fetchAPI as jest.Mock).mockResolvedValueOnce({ message: 'Logged out' });

      await logout();

      expect(fetchAPI).toHaveBeenCalledWith('/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });

    it('should clear localStorage even if API call fails', async () => {
      (fetchAPI as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('getCurrentUser', () => {
    it('should return user from localStorage', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

      const user = getCurrentUser();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
      expect(user).toEqual(mockUser);
    });

    it('should return null if no user in localStorage', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);

      const user = getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if user exists', () => {
      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ id: 1 }));

      expect(isAuthenticated()).toBe(true);
    });

    it('should return false if no user exists', () => {
      localStorageMock.getItem.mockReturnValueOnce(null);

      expect(isAuthenticated()).toBe(false);
    });
  });
});
