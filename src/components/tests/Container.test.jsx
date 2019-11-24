import React from "react";
import {shallow} from 'enzyme';
import { Container, SearchPageContainer, MediaPageContainer } from '../Container';
import toJson from 'enzyme-to-json';

it('Button Snapshots', () => {
    expect(toJson(shallow(<Container />))).toMatchSnapshot();
    expect(toJson(shallow(<SearchPageContainer />))).toMatchSnapshot();
    expect(toJson(shallow(<MediaPageContainer />))).toMatchSnapshot();
});