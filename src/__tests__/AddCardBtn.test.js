import React from 'react';
import AddCardBtn from '../components/cards/AddCardBtn';
import renderer from 'react-test-renderer';
import { coinTypes } from '../common/constants';
import { shallow } from "enzyme";

describe('Shallow DOM Testing on AddCardBtn', () => {
    let menu;

    beforeEach(() => {
        menu = shallow(<AddCardBtn />);
    });

    it('AddCardBtn opens menu after one click', ()=> {
        menu.find('.primaryBtn').simulate('click');
        expect(menu.find('.item .cta').length === coinTypes.length);
    });

    it('AddCardBtn opens menu with correct coin names', ()=> {
        menu.find('.primaryBtn').simulate('click');
        menu.find('.item .cta').map((item, index) => {
            expect(item.text()).toEqual(coinTypes[index]);
        });
    });

    it('AddCardBtn closes menu after two clicks', ()=> {
        menu.find('.primaryBtn').simulate('click');
        menu.find('.primaryBtn').simulate('click');
        expect(menu.find('.item .cta').length === 0);
    });
});

describe('Snapshot Testing on AddCardBtn', () => {

    it('AddCardBtn renders correctly', () => {
        const tree = renderer.create(<AddCardBtn />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('AddCardBtn renders opens and closes menu', () => {

        const component = renderer.create(<AddCardBtn />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const primaryBtn = tree.children.find((child) => child.props["data-test"] === 'primaryBtn');

        //manually trigger a click
        primaryBtn.props.onClick();

        //re-rendering the tree, menu should open
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        //manually trigger a click
        primaryBtn.props.onClick();

        //re-rendering the tree, menu should close
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });
});

