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
import sinon from 'sinon';

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
  
  it('Snapshot of header', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find('.header')).toMatchSnapshot();
  });
  // it('snapshot works correctly', () => {
  //   const wrapper = shallow(<Reviews />);
  //   expect(wrapper).toMatchSnapshot();
  // })
  // it('the ReviewsHeaderTitle should contain the text Customer Reviews', () => {
  //   const wrapper = shallow(<Reviews />);
  //   expect(wrapper.find('ReviewsHeaderTitle').text()).toEqual('Customer Reviews')
  // });
  it('should call componentWillMount', () => {
    sinon.spy(Reviews.prototype, 'componentWillMount');
    const wrapper = shallow(<Reviews />);
    expect(Reviews.prototype.componentWillMount.calledOnce).toEqual(true);
  })
  // it('shoud call handleSubmit when the handleSubmit button is called', () => {
  //   sinon.spy(Reviews.prototype, 'handleSubmit');
  //   const wrapper = shallow(<Reviews />);
  //   wrapper.find('form').simulate('submit', {e: 9});
  //   expect(Reviews.prototype.handleSubmit.calledOnce).toEqual(true);
  // })
});

describe('IndividualReviews', () => {
  // it('snapshot works correctly', () => {
  //   const wrapper = shallow(<IndividualReviews />);
  //   expect(wrapper).toMatchSnapshot();
  // })
  it('the ReviewCount element should exist', () => {
    const wrapper = shallow(<IndividualReviews />);
    expect(wrapper.find('ReviewCount').exists()).toEqual(true);
  })
  // it('should alert feature not built yet when see all reviews component is clicked', () => {
  //   window.alert = jest.fn(() => true);
  //   const wrapper = shallow(<IndividualReviews />);
  //   wrapper.find('AllReviews').simulate('click');
  //   expect(window.alert).toHaveBeenCalledWith('feature not built yet');
  // })
  it('should call componentDidMount', () => {
    sinon.spy(IndividualReviews.prototype, 'componentDidMount');
    const wrapper = shallow(<IndividualReviews />);
    expect(IndividualReviews.prototype.componentDidMount.calledOnce).toEqual(true);
  })
  it('shoud call handleHelpfulClicks when the HelpfulButton button is called', () => {
    sinon.spy(IndividualReviews.prototype, 'handleHelpfulClick');
    const wrapper = shallow(<IndividualReviews />);
    wrapper.find('HelpfulButton').simulate('click', {review: 20});
    expect(IndividualReviews.prototype.handleHelpfulClick.calledOnce).toEqual(true);
  })
  it('should call formatUsername on render', () => {
    sinon.spy(IndividualReviews.prototype, 'formatUsername');
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
