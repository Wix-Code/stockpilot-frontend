const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  return document.cookie.split("; ").find(v => v.startsWith(`${name}=`))?.split("=")[1] ?? "";
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const csrf = decodeURIComponent(readCookie("csrftoken"));
  const res = await fetch(`${API}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrf ? { "X-CSRFToken": csrf } : {}),
      ...(init.headers || {})
    }
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || "Something went wrong. Please try again.");
  }
  return (res.status === 204 ? {} : await res.json()) as T;
}

export const authApi = {
  register: (payload: unknown) => request("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: unknown) => request("/api/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  forgotPassword: (payload: unknown) => request("/api/auth/forgot-password", { method: "POST", body: JSON.stringify(payload) }),
  resetPassword: (payload: unknown) => request("/api/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
  verifyEmail: (payload: unknown) => request("/api/auth/verify-email", { method: "POST", body: JSON.stringify(payload) }),
  acceptInvite: (token: string, payload: unknown) => request(`/api/auth/invitations/${token}/accept`, { method: "POST", body: JSON.stringify(payload) }),
  setupBusiness: (payload: unknown) => request("/api/business/setup", { method: "POST", body: JSON.stringify(payload) })
};
