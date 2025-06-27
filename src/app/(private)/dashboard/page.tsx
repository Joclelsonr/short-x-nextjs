import { Suspense } from "react";
import { cookies } from "next/headers";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlsTable } from "./components/urls-table";
import { BarChart3, Link2 } from "lucide-react";
import { API_URL } from "@/constants";
import { Url } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;

  const response = await fetch(`${API_URL}/urls`, {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const urls: Url[] = await response.json();
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Gerencie suas URLs encurtadas e acompanhe as estatísticas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de URLs</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urls.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Cliques
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Cliques
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* URLs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suas URLs</CardTitle>
          <CardDescription>
            Lista de todas as suas URLs encurtadas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense
            fallback={<Skeleton className="h-[50px] w-full  rounded-lg" />}
          >
            <UrlsTable urls={urls} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
