import axios from "axios";

interface Login {
  email: string;
  password: string;
}

interface GoogleLogin {
  token: string;
}

interface RegisterCode {
  email: string;
  locale: string;
}

interface Register {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  code: string;
}

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export async function login({ email, password }: Login) {
  try {
    const response = await api.post("/login", {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function googleLogin({ token }: GoogleLogin) {
  try {
    const response = await api.post("/login", {
      token: token,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function registerCode({ email, locale }: RegisterCode) {
  try {
    const response = await api.post("/register/code", {
      email: email,
      locale: locale,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}

export async function register({
  name,
  lastname,
  email,
  phone,
  password,
  code,
}: Register) {
  try {
    const response = await api.post("/register", {
      name: name,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password,
      code: code,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error ?? "Unknown error";
      throw new Error(message);
    }
    throw new Error(`Server error ${error}`);
  }
}
