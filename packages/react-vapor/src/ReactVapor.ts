import * as Redux from 'redux';

import {IActionOptions} from './components/actions/Action';
import {IActionBarState} from './components/actions/ActionBarReducers';
import {IItemFilterState} from './components/actions/filters/ItemFilterReducers';
import {IAutocompleteState} from './components/autocomplete/AutocompleteReducers';
import {ICheckboxState} from './components/checkbox/CheckboxReducers';
import {IGroupableCheckboxesState} from './components/checkbox/GroupableCheckboxReducers';
import {CollapsibleState} from './components/collapsible/CollapsibleReducers';
import {IDatePickerState} from './components/datePicker/DatePickerReducers';
import {IDropState} from './components/drop/redux/DropReducers';
import {IDropdownState} from './components/dropdown/DropdownReducers';
import {IDropdownOption} from './components/dropdownSearch/DropdownSearch';
import {IDropdownSearchState} from './components/dropdownSearch/DropdownSearchReducers';
import {IFacet} from './components/facets/Facet';
import {IFacetState} from './components/facets/FacetReducers';
import {IFilterState} from './components/filterBox/FilterBoxReducers';
import {IFlatSelectState} from './components/flatSelect/FlatSelectReducers';
import {IFlippableState} from './components/flippable/FlippableReducers';
import {IInlinePromptOptions} from './components/inlinePrompt/InlinePrompt';
import {IPromptState} from './components/inlinePrompt/InlinePromptReducers';
import {IInputState} from './components/input/InputReducers';
import {ILastUpdatedState} from './components/lastUpdated/LastUpdatedReducers';
import {IListBoxState} from './components/listBox/ListBoxReducers';
import {ILoadingState} from './components/loading/LoadingReducers';
import {IMenusState} from './components/menu/MenuReducers';
import {IModalState} from './components/modal/ModalReducers';
import {IPaginationState} from './components/navigation/pagination/NavigationPaginationReducers';
import {IPerPageState} from './components/navigation/perPage/NavigationPerPageReducers';
import {INumericInputsState} from './components/numericInput/NumericInputReducers';
import {IOptionPickerState} from './components/optionPicker/OptionPickerReducers';
import {IOptionsCycleState} from './components/optionsCycle/OptionsCycleReducers';
import {IPopoverState} from './components/popover/Popover';
import {IRadioSelectState} from './components/radio/RadioSelectReducers';
import {IRefreshCallbackReducerState} from './components/refresh/RefreshCallbackReducer';
import {ISearchBarState} from './components/searchBar/SearchBarReducers';
import {ISelectWithFilterCompositeState} from './components/select/hoc/SelectWithFilterReducers';
import {ISelectState} from './components/select/SelectReducers';
import {ISliderState} from './components/slider/SliderReducers';
import {ISubNavigationState} from './components/subNavigation/SubNavigationReducers';
import {ITabGroupState} from './components/tab/TabReducers';
import {ITableRowState as HOCTableRowState} from './components/table-hoc/reducers/TableRowReducers';
import {ITableWithPaginationState} from './components/table-hoc/reducers/TableWithPaginationReducers';
import {ITableWithSortState} from './components/table-hoc/reducers/TableWithSortReducers';
import {ITablePredicate} from './components/tables/Table';
import {ITableStateModifier} from './components/tables/TableActions';
import {ITableHeaderCellsState} from './components/tables/TableHeaderCellReducers';
import {ITableData, ITablesState} from './components/tables/TableReducers';
import {ITableRowState} from './components/tables/TableRowReducers';
import {ITextAreaState} from './components/textarea/TextAreaReducers';
import {IToastsState} from './components/toast/ToastReducers';
import {IStringListCompositeState} from './reusableState/customList/StringListReducers';
import {ComponentId} from './utils/ComponentUtils';

export interface IReactVaporState {
    actionBars?: IActionBarState[];
    autocompletes?: IAutocompleteState[];
    checkboxes?: ICheckboxState[];
    collapsibles?: CollapsibleState[];
    datePickers?: IDatePickerState[];
    drop?: IDropState;
    dirtyComponents?: ComponentId[];
    dropdowns?: IDropdownState[];
    dropdownSearch?: IDropdownSearchState[];
    facets?: IFacetState[];
    filters?: IFilterState[];
    flatSelect?: IFlatSelectState[];
    flippables?: IFlippableState[];
    groupableCheckboxes?: IGroupableCheckboxesState[];
    inputs?: IInputState[];
    itemFilters?: IItemFilterState[];
    lastAction?: Redux.Action;
    lastUpdatedComposite?: ILastUpdatedState[];
    loadings?: ILoadingState[];
    listBoxes?: IListBoxState[];
    menus?: IMenusState;
    modals?: IModalState[];
    multilineIds?: IStringListCompositeState;
    numericInputs?: INumericInputsState;
    openModals?: string[];
    optionPickers?: IOptionPickerState[];
    optionsCycles?: IOptionsCycleState[];
    paginationComposite?: IPaginationState[];
    perPageComposite?: IPerPageState[];
    popovers?: IPopoverState[];
    prompts?: IPromptState[];
    radioSelects?: IRadioSelectState[];
    refreshCallback?: IRefreshCallbackReducerState;
    rows?: ITableRowState[];
    searchBars?: ISearchBarState[];
    selects?: ISelectState[];
    selectWithFilter?: ISelectWithFilterCompositeState;
    sliders?: ISliderState[];
    stringList?: IStringListCompositeState;
    subNavigations?: ISubNavigationState[];
    tabs?: ITabGroupState[];
    toastContainers?: IToastsState[];
    tableHeaderCells?: ITableHeaderCellsState;
    tables?: ITablesState;
    tableHOCHeader?: ITableWithSortState[];
    tableHOCPagination?: ITableWithPaginationState[];
    tableHOCRow?: HOCTableRowState[];
    textAreas?: ITextAreaState[];
}

export interface IReduxActionsPayload {
    actions?: IActionOptions[];
    addedSelectedOption?: IDropdownOption;
    attributeToFormat?: string;
    attributeToSort?: string;
    calendarId?: string;
    color?: string;
    currentOption?: number;
    date?: Date;
    disabled?: boolean;
    disabledValues?: string[];
    expanded?: boolean;
    facet?: string;
    facetRow?: IFacet;
    filterText?: string;
    id?: string;
    ids?: string[];
    initialPerPage?: number;
    initialTableData?: ITableData;
    isCollapsible?: boolean;
    isDirty?: boolean;
    isInError?: boolean;
    isOpen?: boolean;
    isRange?: boolean;
    isSelected?: boolean;
    item?: string;
    label?: string;
    limit?: string;
    options?: IInlinePromptOptions;
    pageNb?: number;
    perPage?: number;
    predicates?: ITablePredicate[];
    searching?: boolean;
    selected?: string;
    shouldResetPage?: boolean;
    tableId?: string;
    tableStateModifier?: ITableStateModifier;
    totalEntries?: number;
    totalPages?: number;
    valid?: boolean;
    value?: string;
    yPosition?: number;
}
