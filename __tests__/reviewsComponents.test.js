const sum = require('../sum');
import Reviews from '../client/components/reviews';
import IndividualReviews from '../client/components/IndividualReviews';
import React from 'react';
import ReactDOM from 'react-dom';
import render from "react-test-renderer";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import styled from 'styled-components';

configure({ adapter: new Adapter() });

test('adds 1 + 2 to equal 3', function () {
  expect(sum(1, 2)).toBe(3);
})

// test('check that formatDateToBeSorted correctly formats dates to a number', function() {
//   expect(IndividualReviews.formatDateToBeSorted('2018-01-31 22:18:01')).toBe(20180131221801);
// })

describe('Reviews', () => {
  it('the ReviewsHeaderTitle element should exist', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find('ReviewsHeaderTitle').exists()).toEqual(true);
  });

  // it('the ReviewsHeaderTitle should contain the text Customer Reviews', () => {
  //   const wrapper = shallow(<Reviews />);
  //   expect(wrapper.find('ReviewsHeaderTitle').text()).toEqual('Customer Reviews')
  // })
});

describe('IndividualReviews', () => {
  it('the ReviewCount element should exist', () => {
    const wrapper = shallow(<IndividualReviews />);
    expect(wrapper.find('ReviewCount').exists()).toEqual(true);
  })

})


// export default class Welcome extends React.Component {
//   render() {fffd
//     return (
//       <div>Hello world</div>
//     );
//   }
// }

// .descrip
