import { jwtDecode } from "jwt-decode";

// Function to get user role from token
export function getUserRole() {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.log("Invalid token structure");
      return null;
    }

    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

// Password validation function
export const validatePassword = (password) => {
  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let hasSpecial = false;
  const specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~";

  for (const ch of password) {
    if (ch >= 'a' && ch <= 'z') hasLower = true;
    else if (ch >= 'A' && ch <= 'Z') hasUpper = true;
    else if (ch >= '0' && ch <= '9') hasDigit = true;
    else if (specialCharacters.includes(ch)) hasSpecial = true;
  }

  if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
    return {
      valid: false,
      message: 'Password must be ≥8 characters and include uppercase, lowercase, number, and special character.'
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long.'
    };
  }

  return { valid: true, message: '' };
};

// Phone number validation function
export const validatePhone = (phone) => {
  if (phone.length !== 11) {
    return {
      valid: false,
      message: 'Phone number must be exactly 11 digits.'
    };
  }

  if (!phone.startsWith('03')) {
    return {
      valid: false,
      message: 'Phone number must start with "03".'
    };
  }

  if (![...phone].every(ch => ch >= '0' && ch <= '9')) {
    return {
      valid: false,
      message: 'Phone number must contain only digits.'
    };
  }

  return { valid: true, message: '' };
};
