import {api} from "../utils/api";
import {Member, Match, MembersData, MatchData} from "../utils/types";
import {defineStore} from "pinia";

export interface storeState {
  members: Array<Member> | null;
  matchups: Array<Match> | null;
};

const state: storeState = {
  members: null,
  matchups: null,
};

export const useStore = defineStore({
  id: 'scrabble-store',
  state: (): storeState & {
    loading: boolean,
    paginationMemberData: MembersData | Object,
    paginationMatchData: MatchData | Object,
    currentMemberPage: number,
    currentMatchPage: number,
    lastPage: number,
  } => ({
    ...state,
    loading: false,
    paginationMemberData: {},
    paginationMatchData: {},
    currentMemberPage: 1,
    currentMatchPage: 1,
    lastPage: 1,
  }),
  getters: {

  },
  actions: {
    setData(
      members: Member[],
      matchups: Match[]
    ) {
      this.members = members;
      this.matchups = matchups;

      this.loading = false;
    },

    async fetchData() {
      this.loading = true;

      try {
        const {
          data: { data: members }
        } = await api.member.fetchMembers();

        const {
          data: { data: matchups }
        } = await api.match.fetchMatches();

        if (members && matchups) await this.setData(
          members,
          matchups
        );

        this.loading = false;
      } catch(e) {
        //error
      }
    },

    async fetchMemberDataByPage(sortBy: string, sortDirection: string) {
      try {
        let { data } = await api.member.fetchMembersPage(this.currentMemberPage, sortBy, sortDirection);
        if (data.data.length < 1) {
          data = (await api.member.fetchMembersPage(--this.currentMemberPage, sortBy, sortDirection)).data;
        }
        this.paginationMemberData = data.data;
        this.lastPage = data.meta.last_page;

        return data;
      } catch(e) {
        //error
      }
    },

    async fetchMemberById(id: number) {
      try {
        const { data } = await api.member.fetchMemberById(id);
        return data.data;
      } catch(e) {
        //error
      }
    },

    async fetchMatchDataByPage() {
      try {
        const { data } = await api.match.fetchMatchesPage(this.currentMatchPage);
        this.paginationMatchData = data.data;
        this.lastPage = data.meta.last_page;

        return data;
      } catch(e) {
        //error
      }
    },

    async createMember(name: string, email: string, phone: string, joined_at: string) {
      try {
        this.loading = true;

        await api.member.createMember(name, email, phone, joined_at);

        this.loading = false;
      } catch(e) {
        //error
      }
    },

    async updateMember(id: number, name: string, email: string, phone: string, joined_at: string) {
      try {
        this.loading = true;

        await api.member.updateMember(id, name, email, phone, joined_at);

        this.loading = false;
      } catch(e: any) {
        //error
        console.log(e.response);
      }
    },

    async deleteMember(id: number) {
      try {
        this.loading = true;

        await api.member.deleteMember(id);

        this.loading = false;
      } catch(e: any) {
        //error
        console.log(e.response);
      }
    },

    async createMatchup(
      player1_id: number, player1_score: number,
      player2_id: number, player2_score: number,
      location: string, date: string
    ) {
      try {
        this.loading = true;

        await api.match.createMatchup(player1_id, player1_score, player2_id, player2_score, location, date);

        this.loading = false;
      } catch(e) {
        //error
      }
    },

    async fetchMatchesById(id: number) {
      try {
        this.loading = true;

        const { data } = await api.match.fetchMatchesById(id);

        const averageScore = (data: any) => {
          let totalScore = 0;
          let n = 0;
          data.forEach((game: Match) => {
            if (game.player1_id === id) totalScore += game.player1_score;
            else totalScore += game.player2_score
            n++;
          });
          return totalScore / n;
        };

        const wins = data.filter((game: Match) => {
          if (game.player1_id === id && game.player1_score > game.player2_score) return game;
          if (game.player2_id === id && game.player2_score > game.player1_score) return game;
          return;
        });

        let currentBest = 0;

        const bestWin = (wins: Match[]) => {
          wins.forEach(match => {
            if (match.player1_id === id) {
              if (match.player1_score > currentBest)
                currentBest = match.player1_score;
            }
            else {
              if (match.player2_score > currentBest)
                currentBest = match.player2_score;
            }
          });

          return wins.find(game =>
            game.player1_score === currentBest
            || game.player2_score === currentBest
          );
        };

        const bestVs = bestWin(wins)?.player1_id === id
          ? this.members?.find((mem) => mem.id === bestWin(wins)?.player2_id)
          : this.members?.find((mem) => mem.id === bestWin(wins)?.player1_id);

        const response = {
          wins: wins.length,
          losses: (data.length - wins.length),
          averageScore: averageScore(data),
          bestScore: currentBest,
          bestVs: bestVs,
          bestLocation: bestWin(wins)?.location,
          bestDate: bestWin(wins)?.date,
        };

        this.loading = false;

        return response;
      } catch(e) {
        //error
      }
    },

    fetchMatchesByMember() {
      this.loading = true;

      const data: any = [];

      this.members!.forEach((member) => {
        const matches = this.matchups!.filter(match =>
          match.player1_id === member.id || match.player2_id === member.id
        );

        if (matches.length >= 10) {
          const wins = matches.filter(match =>
            match.player1_id === member.id && match.player1_score > match.player2_score
            || match.player2_id === member.id && match.player1_score < match.player2_score
          );

          let totalScore = 0;
          matches.forEach(m => {
            if (m.player1_id === member.id) {
              totalScore += m.player1_score
            }
            else if (m.player2_id === member.id) {
              totalScore += m.player2_score
            }
          });

          const averageScore = totalScore / matches!.length;

          data.push({
            member,
            matches,
            wins,
            averageScore
          });
        }
      });

      this.loading = false;

      if (data.length > 0) {
        return data.sort((a: any ,b: any) => (a.averageScore < b.averageScore) ? 1 : ((b.averageScore < a.averageScore) ? -1 : 0));
      };
      return;
    }
  },

});
