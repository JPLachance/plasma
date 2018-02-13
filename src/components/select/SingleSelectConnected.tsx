import * as React from 'react';
import * as _ from 'underscore';
import {IReactVaporState, IReduxActionsPayload} from '../../ReactVapor';
import {IReduxAction, ReduxConnect} from '../../utils/ReduxUtils';
import {Content} from '../content/Content';
import {IItemBoxProps} from '../itemBox/ItemBox';
import {ISelectButtonProps, ISelectProps, SelectConnected} from './SelectConnected';

export interface ISingleSelectOwnProps extends ISelectProps {}

export interface ISingleSelectStateProps {
  selected?: string;
}

export interface ISingleSelectDispatchProps {}

export interface ISingleSelectProps extends ISingleSelectOwnProps, ISingleSelectStateProps, ISingleSelectDispatchProps {}

const mapStateToProps = (state: IReactVaporState, ownProps: ISingleSelectOwnProps): ISingleSelectStateProps => {
  const listBoxId = SelectConnected.getListBoxId(ownProps.id);
  const listbox = _.findWhere(state.listBoxes, {id: listBoxId});
  return {
    selected: listbox && listbox.selected && listbox.selected.length ? listbox.selected[0] : undefined,
  };
};

const mapDispatchToProps = (dispatch: (action: IReduxAction<IReduxActionsPayload>) => void,
                            ownProps: ISingleSelectOwnProps): ISingleSelectDispatchProps => ({});

@ReduxConnect(mapStateToProps, mapDispatchToProps)
export class SingleSelectConnected extends React.Component<ISingleSelectProps, {}> {

  render() {
    return (
        <SelectConnected
          id={this.props.id}
          button={(props: ISelectButtonProps) => this.getButton(props)}
          items={this.props.items}>
          {this.props.children}
        </SelectConnected>
    );
  }

  private getButton(props: ISelectButtonProps): JSX.Element {
    const option = _.findWhere(this.props.items, {value: this.props.selected});
    return (
        <button
          className='btn dropdown-toggle'
          type='button'
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          // style={{maxWidth: this.props.maxWidth}}
          // disabled={!!this.props.isDisabled}
          >
          {option && option.prepend ? <Content {...option.prepend} /> : null}
          {this.getSelectedOptionElement(option)}
          {option && option.append ? <Content {...option.append} /> : null}
        <span className='dropdown-toggle-arrow' />
    </button>
    );
  }

  private getSelectedOptionElement(option: IItemBoxProps): JSX.Element {
    if (option) {
      const displayValue = option.displayValue || option.value;
      return (
        <span key={option.value}
              className='dropdown-selected-value'
              data-value={option.value}
              title={displayValue}>
          {displayValue}
        </span>
      );
    }

    return null;
  }
}
