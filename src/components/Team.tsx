import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import {List, Trash2} from "react-feather";
import {ITeam} from "../types/MarksTypes";

type teamProps = {
    team: ITeam
    onAddMarks: (id: number, addMarks: number) => void
    onSubMarks: (id: number, addMarks: number) => void
    onDelete: (id: number) => void
    onViewHistory: (id: number) => void
    isDark:boolean;
}

const Team: React.FC<teamProps> = (props) => {
    const {team, onAddMarks, onSubMarks,onDelete,onViewHistory,isDark} = props;
    const [marks, setMarks] = useState<number | undefined>(undefined);

    const handleOnSub = () => {
        if (!marks) {
            return;
        }
        onSubMarks(team.id, marks)
        setMarks(undefined);
    }

    const handleOnAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!marks) {
            return;
        }
        onAddMarks(team.id, marks);
        setMarks(undefined);
    }

    return (
        <Col xs={6} md={4} lg={3} className={isDark? 'team-dark':'team-white'}>
            <Row className='my-2'>
                <Col xs={6} md={8}>{team.name}</Col>
                <Col xs={3} md={2} className='history-button text-info'><i><List onClick={()=>onViewHistory(team.id)}/></i></Col>
                <Col xs={3} md={2} className='delete-button text-danger'>
                    <i>
                        <Trash2 onClick={()=>onDelete(team.id)}/>
                    </i>
                </Col>

            </Row>
            <Row className='team-marks my-2'>
                <Col>Marks: {team.marks[0].mark}</Col>
            </Row>
            <Row>

                <Form className='my-2' onSubmit={handleOnAdd}>
                    <Form.Group controlId="marks">

                        <NumberFormat thousandSeparator={true}
                                      className='form-control'
                                      required
                                      value={marks ? marks : ''}
                                      placeholder=""
                                      onValueChange={(values) => {
                                          setMarks(values.floatValue)
                                      }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Price.
                        </Form.Control.Feedback>
                        <Row className='my-2'>
                            <Col><Button className='sub-button' onClick={handleOnSub}>-Sub</Button></Col>
                            <Col><Button className='add-button' type='submit'>+Add</Button></Col>
                        </Row>
                    </Form.Group>


                </Form>
            </Row>


        </Col>
    );
}

export default Team;