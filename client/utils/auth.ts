export interface User {
  _id: string;
  phnumber: string;
  name: string;
  password?: string;
  dateofbirth: string;
  gender: string;
  occupation: string;
  upi_id: string;
  investedamount: number;
  given_referral_code: string;
  referral_code_generated: string;
}

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
