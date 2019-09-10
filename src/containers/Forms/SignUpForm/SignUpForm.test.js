import React from 'react';
import { SignUpForm,  mapStateToProps, mapDispatchToProps } from './SignUpForm';
import { shallow } from 'enzyme';
import  { validUser } from '../../../actions/index';

describe ('SignUpForm', () => {
  let wrapper, mockUser, mockAddUser, mockValidUser;

  beforeEach(() => {
    mockUser=null;
    mockValidUser=jest.fn();
    mockAddUser=jest.fn();
    wrapper = shallow (
    <SignUpForm 
    addUser={mockAddUser}
    user={mockUser}
    validUser={mockValidUser}
    />)
  })

  it('should update the state when clearInputs is called', () => {

    const expected = '';

    wrapper.setState({
      name: 'Inigo Montoya',
      email: 'dreadpirateroberts@gmail.com',
      password: 'princess',
      error: 'Something went POOF!?'
    });

    wrapper.instance().clearInputs();

    expect(wrapper.state('name')).toEqual(expected);
    expect(wrapper.state('email')).toEqual(expected);
    expect(wrapper.state('password')).toEqual(expected);
  });

  it('should call user log in on a button click', () => {
    const mockEvent = { preventDefault: jest.fn() }

    wrapper.instance().userLogin = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().userLogin).toHaveBeenCalled();
  });

  it('should call handleSubmit on a button click', () => {
    const mockEvent = {preventDefault: jest.fn()}

    wrapper.instance().handleSubmit = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('button').simulate('click', mockEvent);

    expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
  });


  it('should update state on input change', () => {
    const mockEvent = {target: {name: 'name', value: 'Inigo Montoya'}}

    wrapper.find('input').at(0).simulate('change', mockEvent);

    expect(wrapper.state('name')).toEqual('Inigo Montoya')
  });

  it('should update state on email input change', () => {
    const mockEvent = {target: {name: 'email', value: 'dreadpirateroberts@gmail.com'}}

    wrapper.find('input').at(0).simulate('change', mockEvent);

    expect(wrapper.state('email')).toEqual('dreadpirateroberts@gmail.com')
  });

  it('should update state on password input change', () => {
    const mockEvent = {target: {name: 'password', value: 'princess'}}

    wrapper.find('input').at(0).simulate('change', mockEvent);

    expect(wrapper.state('password')).toEqual('princess')
  });
});

describe('mapStateToProps', () => {
  it('should do something', () => {
    const mockState = {
      albums:[],
      user: { id: 175648, name: 'Inigo Montoya', email: 'dreadpirateroberts@gmail.com', password: 'princess' },
      error: '',
      favorites: [
        {
          album_id: 626204707,
          artist_name: 'Beyoncé',
          album_name: '4 (Expanded Edition)',
          price: 11.99,
          artwork_url: 'https://is2-ssl.mzstatic.com/image/thumb/Music6/v4/17/84/3a/17843a6d-1f2b-7e1e-a39f-3ff865110993/source/100x100bb.jpg',
          release_date: '2013-12-13T08:00:00Z',
          content_advisory_rating: 'Explicit',
          primary_genre_name: 'Pop',
        }
      ]
    }
    
    const expected = { id: 175648, name: 'Inigo Montoya', email: 'dreadpirateroberts@gmail.com', password: 'princess' }

    expect(mapStateToProps(mockState).user).toEqual(expected)
  });
});

describe('matchDispatchToProps', () => {
  it('should dispatch with a valid User object when validUser is called', () => {
    const mockUser = {
      id: 175648,
      name: 'Inigo Montoya',
      email: 'dreadpirateroberts@gmail.com',
      password: 'princess'
    }   
    const mockDispatch = jest.fn();
    const actionToDispatch = validUser(mockUser);  
    const testProps = mapDispatchToProps(mockDispatch);

    testProps.validUser({ id: 175648, name: 'Inigo Montoya', email: 'dreadpirateroberts@gmail.com', password: 'princess'  });
  
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  });
});

