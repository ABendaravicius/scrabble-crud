import { matchesService } from "./services/matches";
import { membersService } from "./services/members";
import http from "./apiInstance";

export const api = {
  member: membersService(http),
  match: matchesService(http),
};
