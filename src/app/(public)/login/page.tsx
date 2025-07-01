import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./components/login-form";
import { Link2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold"
          >
            <Link2 className="h-8 w-8" />
            <span>ShortX</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Entre na sua conta para acessar suas URLs e estatísticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
