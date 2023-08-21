import { ITeam, ITeamCategory } from "../../models";

export class Team {
  departament: string;
  id: string;
  teamCategory: ITeamCategory[];

  constructor(team: ITeam) {
    this.departament = team.departament;
    this.id = team.id;
    this.teamCategory = team.teamCategory;
  }

  getDepartament(): string {
    return this.departament
  }

  getId(): string {
    return this.id;
  }

  getTeamCategory(): ITeamCategory[] {
    return this.teamCategory;
  }

  setTeamCategory(teamCategory: ITeamCategory[]): void {
    this.teamCategory = teamCategory;
  }

  addTeamCategory(category: ITeamCategory): void {
    this.teamCategory.push(category);
  }

  setTeamDepartament(departament: string): void {
    this.departament = departament;
  }

  getTeam(): ITeam {
    return {
      departament: this.departament,
      id: this.id,
      teamCategory: this.teamCategory
    };
  }
}
