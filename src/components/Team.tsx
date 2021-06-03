import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import {List, Trash2} from "react-feather";


type teamProps = {
    team: { id: number, name: string, marks: number }
    onAddMarks:(id:number,addMarks:number)=>void
    onSubMarks:(id:number,addMarks:number)=>void
}

const Team: React.FC<teamProps> = (props) => {
    const {team,onAddMarks,onSubMarks} = props;
    const [marks, setMarks] = useState<number | undefined>(undefined);
    const handleOnSub=()=>{
        if(!marks){
            return;
        }
        onSubMarks(team.id,marks)
        setMarks(undefined);

    }
    const handleOnAdd=(event: React.FormEvent<HTMLFormElement>)=>{

        event.preventDefault();
        if(!marks){
            return;
        }
        onAddMarks(team.id,marks);
        setMarks(undefined);

    }
    return (
        <Col xs={6} md={4} lg={3} className='team'>
            <Row className='my-2'>
                <Col xs={6} md={8}>{team.name}</Col>
                <Col xs={3} md={2} className='history-button text-info'><i><List/></i></Col>
                <Col xs={3} md={2} className='delete-button text-danger'><i><Trash2/></i></Col>

            </Row>
            <Row className='team-marks my-2'>
                <Col>Marks: {team.marks}</Col>
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