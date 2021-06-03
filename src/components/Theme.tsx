import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {AlignRight} from "react-feather";

const Theme: React.FC = () => {

    return (
        <React.Fragment>

            <Col xs={{span: 6, offset: 6}} md={{span: 4, offset: 8}} lg={{span: 3, offset: 9}} className='switches'>
                <Row>
                    <Col >
                        <Form>
                            <Form.Check

                                type="switch"
                                label="Dark"
                                id="custom-switch"

                            />

                        </Form>
                    </Col>
                    <Col className='sort-switch'>
                        <Form>
                            <Form.Check
                                type="switch"
                                label="sort"
                                id="custom-switch"
                            />

                        </Form>
                    </Col>
                </Row>
            </Col>

        </React.Fragment>

    );
}

export default Theme;