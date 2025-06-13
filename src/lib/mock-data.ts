export interface UrlData {
  id: string;
  original_url: string;
  short_code: string;
  custom_code: string | null;
  user_id: string | null;
  title: string | null;
  description: string | null;
  clicks: number;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClickData {
  id: string;
  url_id: string;
  ip_address: string | null;
  user_agent: string | null;
  referer: string | null;
  country: string | null;
  city: string | null;
  clicked_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "usuario@exemplo.com",
    created_at: new Date().toISOString(),
  },
];

// Mock URLs data
export const mockUrls: UrlData[] = [
  {
    id: "url-1",
    original_url: "https://www.google.com/search?q=nextjs+tutorial",
    short_code: "abc123",
    custom_code: null,
    user_id: "user-1",
    title: "Tutorial Next.js",
    description: "Aprenda Next.js do zero",
    clicks: 45,
    expires_at: null,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "url-2",
    original_url: "https://github.com/vercel/next.js",
    short_code: "def456",
    custom_code: "nextjs-repo",
    user_id: "user-1",
    title: "Next.js GitHub",
    description: "Repositório oficial do Next.js",
    clicks: 23,
    expires_at: null,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "url-3",
    original_url: "https://tailwindcss.com/docs",
    short_code: "ghi789",
    custom_code: null,
    user_id: "user-1",
    title: "Tailwind CSS Docs",
    description: null,
    clicks: 12,
    expires_at: new Date(Date.now() + 86400000 * 7).toISOString(), // expires in 7 days
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "url-4",
    original_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    short_code: "jkl012",
    custom_code: null,
    user_id: null, // Anonymous URL
    title: null,
    description: null,
    clicks: 156,
    expires_at: null,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

// Mock clicks data
export const mockClicks: ClickData[] = [
  {
    id: "click-1",
    url_id: "url-1",
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    referer: "https://google.com",
    country: "BR",
    city: "São Paulo",
    clicked_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "click-2",
    url_id: "url-1",
    ip_address: "192.168.1.2",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)",
    referer: "https://twitter.com",
    country: "BR",
    city: "Rio de Janeiro",
    clicked_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "click-3",
    url_id: "url-2",
    ip_address: "192.168.1.3",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    referer: null,
    country: "BR",
    city: "Belo Horizonte",
    clicked_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
];

// Mock API functions
export class MockAPI {
  private static getStoredData<T>(key: string, defaultData: T[]): T[] {
    if (typeof window === "undefined") return defaultData;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  }

  private static setStoredData<T>(key: string, data: T[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Auth functions
  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: string | null }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.email === email);
    if (user && password === "123456") {
      // Mock password
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { user, error: null };
    }
    return { user: null, error: "Credenciais inválidas" };
  }

  static async signUp(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: string | null }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return { user: null, error: "Email já cadastrado" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      created_at: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return { user: newUser, error: null };
  }

  static async signOut(): Promise<void> {
    localStorage.removeItem("currentUser");
  }

  // URL functions
  static async getUrls(userId?: string): Promise<UrlData[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const urls = this.getStoredData("urls", mockUrls);
    return userId ? urls.filter((url) => url.user_id === userId) : urls;
  }

  static async getUrlByShortCode(shortCode: string): Promise<UrlData | null> {
    const urls = this.getStoredData("urls", mockUrls);
    return urls.find((url) => url.short_code === shortCode) || null;
  }

  static async createUrl(
    urlData: Omit<UrlData, "id" | "created_at" | "updated_at" | "clicks">
  ): Promise<UrlData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const urls = this.getStoredData("urls", mockUrls);

    // Check if short code already exists
    const existing = urls.find((url) => url.short_code === urlData.short_code);
    if (existing) {
      throw new Error("Código já existe");
    }

    const newUrl: UrlData = {
      ...urlData,
      id: `url-${Date.now()}`,
      clicks: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    urls.push(newUrl);
    this.setStoredData("urls", urls);
    return newUrl;
  }

  static async updateUrlClicks(id: string): Promise<void> {
    const urls = this.getStoredData("urls", mockUrls);
    const urlIndex = urls.findIndex((url) => url.id === id);
    if (urlIndex !== -1) {
      urls[urlIndex].clicks += 1;
      urls[urlIndex].updated_at = new Date().toISOString();
      this.setStoredData("urls", urls);
    }
  }

  static async deleteUrl(id: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const urls = this.getStoredData("urls", mockUrls);
    const filteredUrls = urls.filter((url) => url.id !== id);
    this.setStoredData("urls", filteredUrls);
  }

  // Click functions
  static async getClicks(urlId: string): Promise<ClickData[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const clicks = this.getStoredData("clicks", mockClicks);
    return clicks.filter((click) => click.url_id === urlId);
  }

  static async recordClick(
    clickData: Omit<ClickData, "id" | "clicked_at">
  ): Promise<void> {
    const clicks = this.getStoredData("clicks", mockClicks);

    const newClick: ClickData = {
      ...clickData,
      id: `click-${Date.now()}`,
      clicked_at: new Date().toISOString(),
    };

    clicks.push(newClick);
    this.setStoredData("clicks", clicks);
  }
}
