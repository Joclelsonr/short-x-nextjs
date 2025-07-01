import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./components/register-form";
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
            <CardTitle>Cadastrar</CardTitle>
            <CardDescription>
              Crie sua conta para salvar URLs e acompanhar estatísticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* FORM REGISTER */}
            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
