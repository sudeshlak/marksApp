import React from 'react';
import {Col, Form, Row} from "react-bootstrap";

type themeProps = {
  isDark: boolean
  isSort: boolean
  onDark: (x: boolean) => void
  onSort: (x: boolean) => void
}

const Theme: React.FC<themeProps> = (props) => {
  const {isDark, onDark, isSort, onSort} = props;
  return (
      <React.Fragment>
        <Col xs={{span: 6, offset: 0}} md={{span: 4, offset: 4}} lg={{span: 3, offset: 6}}
             className={isDark ? 'switches-dark' : 'switches-white'}>
          <Row>
            <Col>
              <Form>
                <Form.Check
                    label="Dark"
                    checked={isDark}
                    id="custom-switch"
                    onChange={(event) => onDark(event.target.checked)}
                />
              </Form>
            </Col>
            <Col>
              <Form className='sort-switch'>
                <Form.Check
                    label="Sort"
                    checked={isSort}
                    id="custom-switch2"
                    onChange={(event) => onSort(event.target.checked)}
                />
              </Form>
            </Col>
          </Row>
        </Col>
      </React.Fragment>
  );
}

export default Theme;