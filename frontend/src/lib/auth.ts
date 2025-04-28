import { fetchAPI } from './api';

/**
 * Authentication types
 */
export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

/**
 * Helper class for Auth context
 */
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Toast notification function type
type ToastFn = (message: string) => void;

// Social login provider type
export type SocialProvider = 'apple' | 'google' | 'twitter';

/**
 * Logs in a user with the provided credentials
 * @param credentials - User login credentials
 * @returns Promise with the authentication response
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const data = await fetchAPI<AuthResponse>('/auth/local', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store the JWT in localStorage
    if (data && data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw new AuthError('Login failed. Please check your credentials and try again.');
  }
}

/**
 * Registers a new user
 * @param credentials - User registration data
 * @returns Promise with the authentication response
 */
export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const data = await fetchAPI<AuthResponse>('/auth/local/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store the JWT in localStorage
    if (data && data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error: any) {
    console.error('Registration error:', error);
    // Extract Strapi error message if available
    const errorMessage = error.message?.includes('Email or Username are already taken')
      ? 'Email or username already exists. Please try another.'
      : 'Registration failed. Please check your information and try again.';
    
    throw new AuthError(errorMessage);
  }
}

/**
 * Initiates the password reset process
 * @param credentials - Email address for password reset
 * @returns Promise with the response
 */
export async function forgotPassword(credentials: ForgotPasswordCredentials): Promise<{ ok: boolean }> {
  try {
    await fetchAPI('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    return { ok: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    throw new AuthError('Failed to send password reset email. Please try again.');
  }
}

/**
 * Resets the password using a reset code
 * @param credentials - Reset password data including code and new password
 * @returns Promise with the response
 */
export async function resetPassword(credentials: ResetPasswordCredentials): Promise<{ ok: boolean }> {
  try {
    // Ensure proper payload format with passwordConfirmation
    const payload = {
      code: credentials.code,
      password: credentials.password,
      passwordConfirmation: credentials.passwordConfirmation
    };
    
    console.log('Reset password request payload:', {
      code: credentials.code.substring(0, 10) + '...',
      password: '******', 
      passwordConfirmation: '******'
    });
    
    await fetchAPI('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    return { ok: true };
  } catch (error) {
    console.error('Reset password error:', error);
    throw new AuthError('Failed to reset password. Please try again.');
  }
}

/**
 * Logs out the current user
 */
export function logout(): void {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
}

/**
 * Gets the current user from localStorage
 * @returns The current user or null if not logged in
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

/**
 * Gets the JWT token from localStorage
 * @returns The JWT token or null if not available
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem('jwt');
}

/**
 * Checks if the user is authenticated
 * @returns Boolean indicating if the user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Gets an authenticated fetch config with JWT token
 * @param config - Optional additional fetch config
 * @returns Fetch configuration with authorization header
 */
export function getAuthFetchConfig(config: RequestInit = {}): RequestInit {
  const token = getToken();
  
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };
}

/**
 * Initiates a social login flow with the specified provider
 * @param provider - The social provider to use (apple, google, twitter)
 */
export function socialLogin(provider: SocialProvider): void {
  const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  
  // Create the auth URL
  const authUrl = `${STRAPI_API_URL}/api/connect/${provider}`;
  
  // Redirect to the provider's auth page
  window.location.href = authUrl;
}