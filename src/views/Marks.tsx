import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import AddTeam from "../components/AddTeam";
import Theme from "../components/Theme";
import {ITeam} from "../types/MarksTypes";
import Teams from "../components/Teams";

const Marks: React.FC = () => {
  const initTeams: ITeam[] = [];
  const [teams, setTeams] = useState<ITeam[]>(initTeams);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isSort, setIsSort] = useState<boolean>(false);


  useEffect(() => {
    const getTeams = async () => {
      const teamsFromServer: ITeam[] = await fetchTeams();
      setTeams(teamsFromServer);
    }
    getTeams();
  }, []);

  const fetchTeams = async () => {
    const res: any = await fetch('http://localhost:5000/teams')
    const data: any = await res.json();
    return data;
  }

  useEffect(() => {
    const getTheme = async () => {
      const theme: any = await fetchTheme();
      setIsDark(theme.isDark);
      setIsSort(theme.isSort);
    }
    getTheme();
  }, [])
  const fetchTheme = async () => {
    const res: any = await fetch('http://localhost:5000/theme')
    const data: any = await res.json();
    return data;
  }

  const handleOnDark = async (changeIsDark: boolean) => {
    const res: any = await fetch(`http://localhost:5000/theme`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({isSort: isSort, isDark: changeIsDark}),
    });
    const data: any = await res.json();

    setIsDark(changeIsDark);
  }

  const handleOnSort = async (changeIsSort: boolean) => {
    const res: any = await fetch(`http://localhost:5000/theme`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({isSort: changeIsSort, isDark: isDark}),
    });
    const data: any = await res.json();

    setIsSort(changeIsSort);
  }

  const generateId = () => {
    return Math.floor(Math.random() * 10000) + 1
  }

  const getDate = () => {
    const date: string = String(new Date());
    return date;
  }

  const handleOnTeamAdd = async (name: string) => {
    const allTeams: ITeam[] = teams.slice();
    const ids: number[] = teams.map(team => team.id);
    let id: number = 1;
    while (ids.includes(id)) {
      id = generateId();
    }

    const newTeam: ITeam = {id: id, name: name, marks: [{date: getDate(), mark: 0,bitCoin:0}]};
    const res: any = await fetch('http://localhost:5000/teams', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTeam),
    });
    const data: any = await res.json();

    allTeams.push(newTeam);
    setTeams(allTeams);
  }

  return (
      <div  style={{backgroundColor: isDark ? 'black' : 'white',minHeight:'100vh'}}>
      <Container className={isDark ? 'mark-app-dark' : 'mark-app-white'}>
        <Row className='title text-center py-2'>
          <h1>MARKS</h1>
        </Row>
        <Row>
          <AddTeam onTeamAdd={handleOnTeamAdd}
                   isDark={isDark}

          />
          <Theme isDark={isDark}
                 isSort={isSort}
                 onDark={handleOnDark}
                 onSort={handleOnSort}
          />
        </Row>
        <Teams isDark={isDark}
               onToggle={handleOnDark}
               teams={teams}
               setTeams={setTeams}
               isSort={isSort}

        />
      </Container>
      </div>
        );

}
export default Marks;