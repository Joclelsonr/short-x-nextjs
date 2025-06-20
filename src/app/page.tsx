"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { BarChart3, Link2, Shield, Zap } from "lucide-react";

export default function Home() {
  const [user] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
              Encurte suas URLs
              <span className="text-blue-600"> instantaneamente</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transforme links longos em URLs curtas e elegantes. Acompanhe
              cliques, personalize códigos e muito mais.
            </p>
          </div>

          {/* URL Shortener Form */}
          <div className="mb-16">
            <UrlShortenerForm />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Encurte URLs instantaneamente sem cadastro necessário
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Acompanhe cliques, origem dos visitantes e estatísticas
                  detalhadas
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Link2 className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Personalização</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Crie códigos personalizados e adicione títulos às suas URLs
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-8 w-8 mx-auto text-red-600 mb-2" />
                <CardTitle className="text-lg">Seguro</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  URLs protegidas com expiração automática e controle de acesso
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {!user && (
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">
                  Quer mais recursos?
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Cadastre-se gratuitamente para salvar suas URLs, ver
                  estatísticas detalhadas e muito mais!
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-x-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Cadastrar Grátis
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                  >
                    Já tenho conta
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
