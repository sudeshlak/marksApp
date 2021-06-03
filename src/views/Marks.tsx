import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Team from "../components/Team";
import AddTeam from "../components/AddTeam";
import Theme from "../components/Theme";

const Marks: React.FC = () => {
    const t: { id: number, name: string, marks: number }[] = [{id: 1, name: 'team1', marks: 100}, {
        id: 2,
        name: 'team2',
        marks: 200
    }, {id: 3, name: 'team3', marks: 300}, {id: 4, name: 'team4', marks: 300}]
    const [teams, setTeams] = useState<{ id: number, name: string, marks: number }[]>(t);


    /*const handleOnDelete=()=>{

    }*/
    const handleOnAddMarks=(id:number,addMarks:number)=>{
        const allTeams: { id: number, name: string, marks: number }[] = teams.slice();
        setTeams(
            allTeams.map((team) =>
                team.id === id ? {...team, marks: team.marks+addMarks} : team
            )
        );

    }
    const handleOnSubMarks=(id:number,addMarks:number)=> {
        const allTeams: { id: number, name: string, marks: number }[] = teams.slice();
        setTeams(
            allTeams.map((team) =>
                team.id === id ? {...team, marks: team.marks-addMarks} : team
            )
        );
    }
    const generateId=()=>{
        return Math.floor(Math.random()*10000)+1
    }
    const handleOnTeamAdd=(name:string)=>{
        const allTeams: { id: number, name: string, marks: number }[] = teams.slice();
        const ids: number[] = teams.map(team => team.id);
        let id:number=1;
        while (ids.includes(id)) {
            id=generateId();
        }
        const newTeam: { id: number, name: string, marks: number } = {id: id, name: name, marks: 0};
        allTeams.push(newTeam);
        setTeams(allTeams);

    }

    const renderTeam = () => {
        if (!teams) {
            return;
        }
        return teams.map(
            (team) => {
                return <Team team={team}
                             key={team.id}
                             onAddMarks={handleOnAddMarks}
                             onSubMarks={handleOnSubMarks}
                    /*onDelete={}
                    onAddMarks={}
                    onSubMarks={}
                    viewHistory={}*/
                />
            }
        );
    }
    return (
        <Container className='marks-app'>
            <Row className='title text-center py-2'>
                <h1>MARKS</h1>
            </Row>
            <Row>
                <AddTeam onTeamAdd={handleOnTeamAdd}/>
            </Row>
            <Row>
                <Theme/>
            </Row>

            <Row>
                {renderTeam()}
            </Row>
        </Container>);
}
export default Marks;