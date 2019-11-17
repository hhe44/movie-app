import React from "react";
import {shallow} from 'enzyme';
import { Button , MediaPageButton } from './Button';
import toJson from 'enzyme-to-json';

it('Button Snapshots', () => {
    const buttonWrap = shallow(<Button onClick={() => {}} label={"TEST"} />)
    expect(toJson(buttonWrap)).toMatchSnapshot();
    const mediaPageButtonWrap = shallow(<MediaPageButton />)
    expect(toJson(mediaPageButtonWrap)).toMatchSnapshot();
});