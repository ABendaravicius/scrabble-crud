import { AxiosInstance } from "axios";

export const matchesService = (http: AxiosInstance) => ({
  fetchMatches: () =>
    http.get(`/api/matchups/all`),

  fetchMatchesPage: (page: number) =>
    http.get(`/api/matchups?page=${page}`),

  createMatchup: (
    player1_id: number, player1_score: number,
    player2_id: number, player2_score: number,
    location: string, date: string
  ) =>
    http.post(`/api/matchups`, {
      player1_id, player1_score, player2_id, player2_score, location, date
    }),

  fetchMatchesById: (id: number) =>
    http.get(`/api/matchups/${id}`),
});
