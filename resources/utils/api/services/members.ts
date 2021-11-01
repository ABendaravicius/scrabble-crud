import { AxiosInstance } from "axios";

export const membersService = (http: AxiosInstance) => ({
  fetchMembers: () =>
    http.get(`/api/member/all`),

  fetchMembersPage: (page: number, sortBy: string, sortDirection: string) =>
    http.get(`/api/members?page=${page}`, {
      params: {
        sort_field: sortBy,
        sort_direction: sortDirection,
      }
    }),

  fetchMemberById: (id: number) =>
    http.get(`/api/members/${id}`),

  createMember: (name: string, email: string, phone: string, joined_at: string) =>
    http.post(`/api/members`, {
      name, email, phone, joined_at
    }),

  updateMember: (id: number, name: string, email: string, phone: string, joined_at: string) =>
    http.put(`/api/members/${id}`, {
      name, email, phone, joined_at
    }),

  deleteMember: (id: number) =>
    http.delete(`/api/members/${id}`),
});
