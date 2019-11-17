import React from "react";
import {shallow} from 'enzyme';
import { StyledButton, Button, MediaPageButton } from './Button';
import toJson from 'enzyme-to-json';

it('Button Snapshots', () => {
    expect(toJson(shallow(<StyledButton />))).toMatchSnapshot();
    expect(toJson(shallow(<Button />))).toMatchSnapshot();
    expect(toJson(shallow(<MediaPageButton />))).toMatchSnapshot();
});