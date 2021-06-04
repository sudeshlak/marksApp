import React, {useState} from 'react';
import {Button, Col, Row, Form} from "react-bootstrap";

type addTeamProps = {
    onTeamAdd: (name: string) => void
    isDark:boolean
}
const AddTeam: React.FC<addTeamProps> = (props) => {
    const {onTeamAdd,isDark} = props;
    const [isFormVisible, setIsFormVisibility] = useState<boolean>(false);
    const [newTeamName, setNewTeamName] = useState<string | null>(null);

    const handleOnFormOpen = () => {
        setIsFormVisibility(!isFormVisible);
    }
    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newTeamName || newTeamName === '') {
            return;
        }
        onTeamAdd(newTeamName);
        setNewTeamName(null);
    }
    const handleOnTeamNameChanged = (name: string) => {
        setNewTeamName(name);
    }

    return (
        <Col xs={6} md={3} className={isDark? 'add-team-dark py-2':'add-team-white py-2'}>
            <Row>
                <Col xs={8}>Add New Team</Col>
                <Col xs={4}><Button className='form-open-button'
                                    variant={isFormVisible ? "danger" : "success"}
                                    onClick={handleOnFormOpen}>{isFormVisible ? 'Close' : 'Add'}
                </Button>
                </Col>
            </Row>
            {isFormVisible && <Row className='py-4'>
                <Form className='form-inputs' onSubmit={handleOnSubmit}>
                    <Form.Group controlId="authorName">
                        <Form.Control type="text" placeholder="Enter the team name..."
                                      value={newTeamName ? newTeamName : ''}
                                      required
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                          handleOnTeamNameChanged(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Author Name.
                        </Form.Control.Feedback>
                        <Row className='py-2'>
                            <Col md={{span: 7, offset: 5}}>
                                <Button type="submit" className='create-team-button'>
                                    Create Team
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Row>}
        </Col>
    );
}

export default AddTeam;