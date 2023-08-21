import { ITeamCategory } from "../../models";
import { Team } from "./team";

interface ITeamBuilder {

  buildDepartament(departament: string): ITeamBuilder;
  buildId(id: string): ITeamBuilder;
  withTeamCategory(teamCategory: ITeamCategory[]): ITeamBuilder;
  getTeam(): Team;

}

export class TeamBuilder implements ITeamBuilder {

  departament: string = '';
  id: string = '';
  teamCategory: ITeamCategory[] = [];

  buildDepartament(departament: string): ITeamBuilder {
    this.departament = departament;
    return this;
  }

  buildId(id: string): ITeamBuilder {
    this.id = id;
    return this;
  }

  withTeamCategory(teamCategory: ITeamCategory[]): ITeamBuilder {
    this.teamCategory = teamCategory;
    return this;
  }

  getTeam(): Team {
    return new Team(this);
  }
}
