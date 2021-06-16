import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import Team from "./Team";
import {ITeam} from "../types/MarksTypes";

type teamProps = {
  isDark: boolean
  onToggle: (x: boolean) => void
  teams: ITeam[]
  setTeams: (team: ITeam[]) => void
  isSort: boolean

}

const Teams: React.FC<teamProps> = (props) => {
  const {teams, setTeams, isDark, isSort} = props;
  const getDate = () => {
    const date: string = String(new Date());
    return date;
  }

  const handleOnViewHistory = async (id: number) => {
    const teamToViewHistoryMarks: ITeam = await fetchTeam(id);
    const marks: { date: string, mark: number, bitCoin: number }[] = teamToViewHistoryMarks.marks;

    let list: string = '';
    marks.forEach(element => {
          list += element.date + ' :   $' + element.mark + ' + \u20bf' + element.bitCoin + '\n\n'
        }
    );
    alert(list);
  }

  const handleOnAddMarks = async (id: number, addMarks: number, isBitCoin: boolean) => {
    const teamToUpdateMarks: ITeam = await fetchTeam(id);
    const marks: { date: string, mark: number, bitCoin: number }[] = teamToUpdateMarks.marks;
    if (isBitCoin) {
      marks.splice(0, 0, {date: getDate(), bitCoin: marks[0].bitCoin + addMarks, mark: marks[0].mark});
    } else {
      marks.splice(0, 0, {date: getDate(), mark: marks[0].mark + addMarks, bitCoin: marks[0].bitCoin});
    }

    const updateMarksTeam: ITeam = {...teamToUpdateMarks, marks: marks};

    const res: any = await fetch(`http://localhost:5000/teams/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updateMarksTeam),
    });
    const data: any = await res.json();

    const allTeams: ITeam[] = teams.slice();
    setTeams(
        allTeams.map((team) => {
              if (team.id === id) {
                if (isBitCoin) {
                  const mark: any = {date: getDate(), bitCoin: team.marks[0].bitCoin + addMarks, mark: team.marks[0].mark};
                  team.marks.splice(0, 0, mark);
                } else {
                  const mark: any = {date: getDate(), mark: team.marks[0].mark + addMarks, bitCoin: team.marks[0].bitCoin};
                  team.marks.splice(0, 0, mark);
                }
                return {...team, marks: team.marks};
              } else {
                return team;
              }
            }
        )
    );
  }

  const handleOnSubMarks = async (id: number, subMarks: number, isBitCoin: boolean) => {
    const teamToUpdateMarks: ITeam = await fetchTeam(id);
    const marks: { date: string, mark: number, bitCoin: number }[] = teamToUpdateMarks.marks;
    if (isBitCoin) {
      marks.splice(0, 0, {date: getDate(), bitCoin: marks[0].bitCoin - subMarks, mark: marks[0].mark});
    } else {
      marks.splice(0, 0, {date: getDate(), mark: marks[0].mark - subMarks, bitCoin: marks[0].bitCoin});
    }
    const updateMarksTeam: ITeam = {...teamToUpdateMarks, marks: marks};

    const res: any = await fetch(`http://localhost:5000/teams/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updateMarksTeam),
    });
    const data: any = await res.json();

    const allTeams: ITeam[] = teams.slice();
    setTeams(
        allTeams.map((team) => {
              if (team.id === id) {
                if (isBitCoin) {
                  const mark: any = {date: getDate(), bitCoin: team.marks[0].bitCoin - subMarks, mark: team.marks[0].mark};
                  team.marks.splice(0, 0, mark);

                } else {
                  const mark: any = {date: getDate(), mark: team.marks[0].mark - subMarks, bitCoin: team.marks[0].bitCoin};
                  team.marks.splice(0, 0, mark);
                }


                return {...team, marks: team.marks};
              } else {
                return team;
              }
            }
        )
    );
  }

  const handleOnDelete = async (id: number) => {
    const userConfirmation = window.confirm("Delete Team?");
    if (userConfirmation) {

      await fetch(`http://localhost:5000/teams/${id}`, {method: 'DELETE'})
      const allTeams: ITeam[] = teams.slice();
      setTeams(
          allTeams.filter((team) =>
              team.id !== id
          )
      );
    }
  }

  const renterTeams = (sortedTeams: ITeam[]) => {
    return sortedTeams.map(
        (team) => {
          return <Team team={team}
                       key={team.id}
                       onAddMarks={handleOnAddMarks}
                       onSubMarks={handleOnSubMarks}
                       onDelete={handleOnDelete}
                       onViewHistory={handleOnViewHistory}
                       isDark={isDark}


          />
        }
    );
  }
  const fetchTeam = async (id: number) => {
    const res: any = await fetch(`http://localhost:5000/teams/${id}`)
    const data: any = await res.json();
    return data;
  }

  const sortTeams = () => {
    if (!teams) {
      return;
    }
    if (isSort) {
      const allTeams: ITeam[] = teams.slice();
      allTeams.sort((a, b) => {
        return b.marks[0].mark - a.marks[0].mark;
      });
      return renterTeams(allTeams);
    } else {
      const allTeams: ITeam[] = teams.slice();
      allTeams.sort((a, b) => {
        let nameA: string = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB: string = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return renterTeams(allTeams);
    }
  }

  return (
      <Row>
        {sortTeams()}
      </Row>
  );
}

export default Teams;