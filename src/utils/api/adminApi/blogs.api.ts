import { apiClient } from "../fetchClient";

/* ================= TYPES ================= */

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  image: string | null;
  isPublished?: boolean;
  creator_username: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  uploaded_image?: File;
}

export interface UpdateBlogPayload {
  title?: string;
  content?: string;
  uploaded_image?: File;
}

/* ================= MAPPER ================= */

const mapBlog = (item: any): BlogItem => ({
  id: item.id,
  title: item.title,
  description: item.content,
  image: item.image_url ?? null,
  isPublished: item.is_published,
  creator_username: item.creator_username
});

/* ================= API ================= */

// --- CREATE DRAFT ---
export const createBlog = async (payload: CreateBlogPayload): Promise<BlogItem> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  if (payload.uploaded_image) formData.append("uploaded_image", payload.uploaded_image);
  const data = await apiClient.post<any>("blog/", formData);
  return mapBlog(data);
};

// --- AUTOSAVE (PATCH) ---
export const updateBlog = async (id: string, payload: UpdateBlogPayload): Promise<BlogItem> => {
  const formData = new FormData();
  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.content !== undefined) formData.append("content", payload.content);
  if (payload.uploaded_image) formData.append("uploaded_image", payload.uploaded_image);
  const data = await apiClient.patch<any>(`blog/${id}/`, formData);
  return mapBlog(data);
};

// --- DRAFTS ---
export const getDrafts = async (): Promise<BlogItem[]> => {
  const data = await apiClient.get<any[]>("blog/drafts/");
  return data.map(mapBlog);
};

// --- HOME (PUBLIC FEED) ---
export const getHomeBlogs = async (): Promise<BlogItem[]> => {
  const data = await apiClient.get<any[]>("blog/public_list/");
  return data.map(mapBlog);
};

// --- PUBLISHED (USER) ---
export const getPublishedBlogs = async (): Promise<BlogItem[]> => {
  const data = await apiClient.get<any[]>("blog/me/");
  return data.filter((item) => item.is_published === true).map(mapBlog);
};

// --- DELETE ---
export const deleteBlog = (id: string) =>
  apiClient.delete<void>(`blog/${id}/`);

// --- PUBLISH ---
export const publishBlog = (id: string) =>
  apiClient.post(`blog/${id}/publish/`);

// --- blog page ---
export const getBlogById = async (id: string): Promise<BlogItem> => {
  const data = await apiClient.get<any>(`blog/${id}/`);
  return mapBlog(data);
};

export const getPublicBlogById = async (id: string): Promise<BlogItem> => {
  const data = await apiClient.publicGet<any>(`blog/${id}/`);
  return mapBlog(data);
};

export const getDraftById = async (id: string): Promise<BlogItem> => {
  const data = await apiClient.get<any>(`blog/${id}/draft/`);
  return mapBlog(data);
};