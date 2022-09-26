import { createReducer, on } from '@ngrx/store';
import { Tab } from '../../models/tab';
import { closeTab, newTab, selectTab, updateTab } from '../actions/tab.actions';

export interface TabState {
    tabs: Tab[];
    selectedTab: number;
}

export const initialState: TabState = {
    tabs: [],
    selectedTab: 0
};

export const tabReducer = createReducer(
    initialState,
    on(newTab, (state: TabState, {tab}) => {
        const dTab = state.tabs.filter(tb => tb.typeTab === tab.typeTab && (!tab.args.entity && !tb.args.entity ||
            tab.args.entity && tb.args.entity && (tab.args.entity.id === tb.args.entity.id) ))[0];
        if (dTab != null){
            return ( { ...state, selectedTab: state.tabs.indexOf(dTab) + 1 });
        }
        return ( { ...state, tabs: [...state.tabs, tab], selectedTab: state.tabs.length + 1 });
    }),
    on(updateTab, (state: TabState, tab) => {
        const updatedTab = state.tabs.filter(tb => tb.args && tb.args.entity &&
            tab.args && tab.args.entity && tb.args.entity.id === tab.args.entity.id)[0];
        return  updatedTab ? {...state,  tabs: [
                    ...state.tabs.slice(0, state.tabs.indexOf(updatedTab)),
                    tab,
                    ...state.tabs.slice(state.tabs.indexOf(updatedTab) + 1)
                ]} : {... state};
    }),
    on(selectTab, (state: TabState, {index}) => {
        return ( { ...state, selectedTab: index });
    }),
    on(closeTab, (state: TabState, {id}) => ({...state,  tabs: [
            ...state.tabs.slice(0, state.tabs.findIndex(value => value.id === id)),
            ...state.tabs.slice(state.tabs.findIndex(value => value.id === id) + 1)
        ], selectedTab: state.selectedTab - 1
        })
    ),
);


