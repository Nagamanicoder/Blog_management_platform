import { APP_CONFIG } from "../../config/app.config";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

let isRefreshing = false;
let pending: (() => void)[] = [];

async function request<T>(url: string, method: RequestMethod, body?: unknown): Promise<T> {
  const fullUrl = `${APP_CONFIG.apiBaseUrl}${url.replace(/^\/+/, "")}`;
  const isFormData = body instanceof FormData;

  const makeFetch = () =>
    fetch(fullUrl, {
      method,
      credentials: "include",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

  let res = await makeFetch();

  if (res.status === 401 && !url.includes("auth/refresh")) {
    if (!isRefreshing) {
      isRefreshing = true;
      const refreshRes = await fetch(`${APP_CONFIG.apiBaseUrl}auth/refresh/`, {
        method: "POST",
        credentials: "include",
      });
      if (refreshRes.ok) {
        pending.forEach((cb) => cb());
        pending = [];
      } else {
        window.location.href = "/login";
        throw new Error("Session expired");
      }
      isRefreshing = false;
    }

    return new Promise((resolve) => {
      pending.push(async () => {
        const retryRes = await makeFetch();
        resolve(retryRes.json());
      });
    });
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

// No auth, no redirect on 401
async function publicRequest<T>(url: string): Promise<T> {
  const fullUrl = `${APP_CONFIG.apiBaseUrl}${url.replace(/^\/+/, "")}`;
  const res = await fetch(fullUrl, { method: "GET" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url, "GET"),
  publicGet: <T>(url: string) => publicRequest<T>(url), // ← no auth, no redirect
  post: <T>(url: string, body?: unknown) => request<T>(url, "POST", body),
  put: <T>(url: string, body?: unknown) => request<T>(url, "PUT", body),
  patch: <T>(url: string, body?: unknown) => request<T>(url, "PATCH", body),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};