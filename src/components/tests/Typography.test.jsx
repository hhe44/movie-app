import React from "react";
import {shallow} from 'enzyme';
import { 
    Title, MediaListTitle, SearchResultTitle, 
    Blurb, Caption, SearchPageBlurb, MediaDetail,
    Overview
} from '../Typography';
import toJson from 'enzyme-to-json';

it('Button Snapshots', () => {
    expect(toJson(shallow(<Title />))).toMatchSnapshot();
    expect(toJson(shallow(<MediaListTitle />))).toMatchSnapshot();
    expect(toJson(shallow(<SearchResultTitle />))).toMatchSnapshot();
    expect(toJson(shallow(<Blurb />))).toMatchSnapshot();
    expect(toJson(shallow(<Caption />))).toMatchSnapshot();
    expect(toJson(shallow(<SearchPageBlurb />))).toMatchSnapshot();
    expect(toJson(shallow(<MediaDetail />))).toMatchSnapshot();
    expect(toJson(shallow(<Overview />))).toMatchSnapshot();
});