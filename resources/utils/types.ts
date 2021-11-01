export type Member = {
  id: number,
  name: string,
  email: string,
  phone: string,
  joined_at: string,
};

export type Match = {
  id: number,
  player1_id: number,
  player1_score: number,
  player2_id: number,
  player2_score: number,
  location: string,
  date: string,
};

export type MembersData = {
  data: Array<Member>,
  links: any,
  meta: any,
};

export type MatchData = {
  data: Array<Member>,
  links: any,
  meta: any,
};
