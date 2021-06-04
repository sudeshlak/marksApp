import React, {useState} from 'react';
import {Container, Row} from "react-bootstrap";
import AddTeam from "../components/AddTeam";
import Theme from "../components/Theme";
import {ITeam} from "../types/MarksTypes";
import Teams from "../components/Teams";

const Marks: React.FC = () => {
    const t: ITeam[] = [{id: 1, name: 'team1', marks: [{date: '2021-5-5', mark: 100}]}, {
        id: 2,
        name: 'team2',
        marks: [{date: '2021-5-5', mark: 100}]
    }, {id: 3, name: 'team3', marks: [{date: '2021-5-5', mark: 100}]}, {
        id: 4,
        name: 'team4',
        marks: [{date: '2021-5-5', mark: 100}]
    }];
    const [teams, setTeams] = useState<ITeam[]>(t);
    const [isDark, setIsDark] = useState<boolean>(false);
    const [isSort, setIsSort] = useState<boolean>(false);


    const handleOnDark=(x:boolean)=>{
        setIsDark(!x);
    }
    const handleOnSort=(x:boolean)=>{
        console.log(x);
        setIsSort(!x);
    }
    const generateId = () => {
        return Math.floor(Math.random() * 10000) + 1
    }
    const getDate = () => {
        const date: string = String(new Date());
        return date;
    }

    const handleOnTeamAdd = (name: string) => {
        const allTeams: ITeam[] = teams.slice();
        const ids: number[] = teams.map(team => team.id);
        let id: number = 1;
        while (ids.includes(id)) {
            id = generateId();
        }
        const newTeam: ITeam = {id: id, name: name, marks: [{date: getDate(), mark: 0}]};
        allTeams.push(newTeam);
        setTeams(allTeams);
    }




    return (
        <Container className='marks-app'>
            <Row className='title text-center py-2'>
                <h1>MARKS</h1>
            </Row>
            <Row>
                <AddTeam onTeamAdd={handleOnTeamAdd}
                         isDark={isDark}

                />
            </Row>
            <Row>
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


        </Container>);
}
export default Marks;