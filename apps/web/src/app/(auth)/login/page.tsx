import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <LoginForm />
        <p className="mt-4 text-center text-sm text-zinc-500">
          Não tem conta?{" "}
          <Link href="/register" className="font-medium text-zinc-900 hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
