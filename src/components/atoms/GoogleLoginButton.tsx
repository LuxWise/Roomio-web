"use client";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log("Google token:", tokenResponse);
    },
    onError: () => {
      console.error("Login failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex items-center gap-2 mt-4 px-4 py-2 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition-colors"
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium text-gray-700">
        Iniciar sesión con Google
      </span>
    </button>
  );
}
