import {createSelector} from 'reselect';
import * as _ from 'underscore';

import {IReactVaporState} from '../../ReactVapor';
import {IFlatSelectState} from './FlatSelectReducers';

const getInput = (state: IReactVaporState, props: {id: string}): IFlatSelectState => {
    return _.findWhere(state.flatSelect, {id: props.id});
};

const getSelectedOptionId = createSelector(getInput, (flatSelect: IFlatSelectState): string => flatSelect && flatSelect.selectedOptionId);

export const FlatSelectSelectors = {
    getInput,
    getSelectedOptionId,
};
