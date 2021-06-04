import React from 'react';
import {Col,Form,Row} from "react-bootstrap";
type themeProps = {
    isDark:boolean
    isSort:boolean
    onDark:(x:boolean)=>void
    onSort:(x:boolean)=>void
}

const Theme: React.FC <themeProps>= (props) => {
    const {isDark,onDark,isSort,onSort} = props;

    return (
        <React.Fragment>

            <Col xs={{span: 6, offset: 6}} md={{span: 4, offset: 8}} lg={{span: 3, offset: 9}} className={isDark?'switches-dark':'switches-white'}>
                <Row>
                    <Col >
                        <Form>
                            <Form.Check
                                type="switch"
                                label="Dark"
                                id="custom-switch"
                                defaultChecked={isDark}
                                onChange={()=>onDark(isDark)}
                            />
                        </Form>
                    </Col>
                    <Col className='sort-switch'>
                        <Form>
                            <Form.Check
                                type="switch"
                                label="sort"
                                id="custom-switch2"
                                defaultChecked={isSort}
                                onChange={()=>onSort(isSort)}
                            />
                        </Form>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>

    );
}

export default Theme;