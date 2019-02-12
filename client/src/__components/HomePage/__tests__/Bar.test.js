import React from 'react';
import {shallow, mount} from 'enzyme';
import Root from 'Root';
import { Bar } from '../Bar';

describe('navbar', () => {
    let wrapped;
    let history = [];
    var localStorageMock = function() {
        var store = {};
        return {
          getItem: function(key) {
            return store[key];
          },
          setItem: function(key, value) {
            store[key] = value.toString();
          },
          clear: function() {
            store = {};
          },
          removeItem: function(key) {
            delete store[key];
          }
        };
      }();

    beforeEach(() => {    
        // mock localStorage    
        Object.defineProperty(window, 'localStorage', {value: localStorageMock});
        // Object.defineProperty(window.location, 'href', {value: 'some_url', writable: true});

        window.localStorage.setItem('user', JSON.stringify({username: 'testUser'}));
        history = [];
        wrapped = mount(
            <Root>
              <Bar history={history}/>
            </Root>
        );
    });
    
    afterEach(() => {
        if(window.localStorage.getItem('user') !== undefined) {
            window.localStorage.removeItem('user');
        }
        wrapped.unmount();
    });
    
    it('renders without crashing', () => {
        expect(wrapped.find('.barlist')).toHaveLength(1);
    });

    it('has li elements, button and username', () => {
        expect(wrapped.find('.barlist').children('li')).toHaveLength(2);
        expect(wrapped.find('.welcome').text()).toContain('testUser');
    });

    it('removes user from localStorage when logged out', () => {
        wrapped.find('button').simulate('click');
        wrapped.update();
        expect(window.localStorage.getItem('user')).toBeUndefined();
    });

    it('navigates to home when logged out', () => {
        wrapped.find('button').simulate('click');
        wrapped.update();
        console.log('history: ', history);
        expect(history[history.length-1]).toEqual('/');
    });
});
