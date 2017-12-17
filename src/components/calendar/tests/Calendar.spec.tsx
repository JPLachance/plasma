import { shallow, mount, ReactWrapper } from 'enzyme';
import {
  Calendar,
  ICalendarProps,
  DEFAULT_DAYS,
  DEFAULT_MONTHS,
  DEFAULT_YEARS,
  ICalendarSelectionRule,
  CalendarSelectionRuleType
} from '../Calendar';
import { OptionsCycle, IOptionsCycleProps } from '../../optionsCycle/OptionsCycle';
import { DateUtils } from '../../../utils/DateUtils';
import { ICalendarDayProps, CalendarDay, IDay } from '../CalendarDay';
import { IDatePickerState } from '../../datePicker/DatePickerReducers';
import { DateLimits } from '../../datePicker/DatePickerActions';
import * as _ from 'underscore';
import * as moment from 'moment';
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

describe('Calendar', () => {

  describe('<Calendar />', () => {
    it('should render without errors', () => {
      expect(() => {
        shallow(
          <Calendar />
        );
      }).not.toThrow();
    });
  });

  describe('<Calendar />', () => {
    let calendar: ReactWrapper<ICalendarProps, any>;
    let calendarInstance: Calendar;

    beforeEach(() => {
      calendar = mount(
        <Calendar />,
        { attachTo: document.getElementById('App') }
      );
      calendarInstance = calendar.instance() as Calendar;
    });

    afterEach(() => {
      calendar.unmount();
      calendar.detach();
    });

    it('should display 2 <OptionsCycle /> (one for the month and the other for the year)', () => {
      expect(calendar.find('OptionsCycle').length).toBe(2);
    });

    it('should display a <TableHeader />', () => {
      expect(calendar.find('TableHeader').length).toBe(1);
    });

    it('should display the days set as props or the default ones', () => {
      const days: string[] = [
        'lun',
        'mar',
        'mer',
        'jeu',
        'ven',
        'sam',
        'dim',
      ];

      _.each(DEFAULT_DAYS, (day: string) => {
        expect(calendar.html()).toContain(day);
      });

      calendar.setProps({ days });

      _.each(days, (day: string) => {
        expect(calendar.html()).toContain(day);
      });
    });

    it('should send the months sent as props or the default ones to the month picker <OptionsCycle />', () => {
      const months: string[] = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ];
      const monthPicker: ReactWrapper<IOptionsCycleProps, any> = calendar.find(OptionsCycle).first();

      expect(monthPicker.props().options).toEqual(DEFAULT_MONTHS);

      calendar.setProps({ months });

      expect(monthPicker.props().options).toEqual(months);
    });

    it('should send the years sent as props or the default ones to the year picker <OptionsCycle />', () => {
      const years: string[] = [
        '2015',
        '2016',
        '2017',
      ];
      const yearPicker: ReactWrapper<IOptionsCycleProps, any> = calendar.find(OptionsCycle).last();

      expect(yearPicker.props().options).toEqual(DEFAULT_YEARS);

      calendar.setProps({ years });

      expect(yearPicker.props().options).toEqual(years);
    });

    it('should use the startingMonth prop to set the month picker at the desired month or use the current one', () => {
      const startingMonth: number = 5;

      expect(calendar.html()).toContain(DEFAULT_MONTHS[DateUtils.currentMonth]);

      calendar.unmount();
      calendar = mount(
        <Calendar startingMonth={startingMonth} />,
        { attachTo: document.getElementById('App') }
      );

      expect(calendar.html()).toContain(DEFAULT_MONTHS[startingMonth]);
    });

    it('should use the startingYear prop to set the year picker at the desired year or use the current one', () => {
      const startingYear: number = 2;

      expect(calendar.html()).toContain(DateUtils.currentYear.toString());

      calendar.unmount();
      calendar = mount(
        <Calendar startingYear={startingYear} />,
        { attachTo: document.getElementById('App') }
      );

      expect(calendar.html()).toContain(DEFAULT_YEARS[startingYear]);
    });

    it('should start the week on the startingDay sent as prop or simply use the first one (assumed to be Sunday)', () => {
      const startingDay: number = 3;
      let firstDayOfSecondWeek: number = parseInt(calendar.find('tbody').find('tr').at(1).find('td').first().text());

      expect(calendar.find('th').first().html()).toContain(DEFAULT_DAYS[0]);
      expect(new Date(DateUtils.currentYear, DateUtils.currentMonth, firstDayOfSecondWeek).getDay()).toBe(0);

      calendar.setProps({ startingDay });
      firstDayOfSecondWeek = parseInt(calendar.find('tbody').find('tr').at(1).find('td').first().text());

      expect(calendar.find('th').first().html()).toContain(DEFAULT_DAYS[startingDay]);
      expect(new Date(DateUtils.currentYear, DateUtils.currentMonth, firstDayOfSecondWeek).getDay()).toBe(startingDay);

      _.each(DEFAULT_DAYS, (day: string) => {
        expect(calendar.html()).toContain(day);
      });
    });

    it('should call onClick when handleClick has been called, onClick is defined and one picker is selected', () => {
      let onClickSpy: jasmine.Spy = jasmine.createSpy('onClick');
      let now: Date = new Date();

      expect(() => {
        calendarInstance['handleClick'].call(calendarInstance, now);
      }).not.toThrow();

      calendar.setProps({ onClick: onClickSpy });

      calendarInstance['handleClick'].call(calendarInstance, now);

      expect(onClickSpy).not.toHaveBeenCalled();

      calendar.setProps({
        onClick: onClickSpy,
        calendarSelection: [
          {
            id: 'id',
            calendarId: 'any',
            color: 'any',
            lowerLimit: now,
            upperLimit: now,
            isRange: true,
            selected: undefined,
            appliedLowerLimit: now,
            appliedUpperLimit: now,
            inputLowerLimit: now,
            inputUpperLimit: now
          },
          {
            id: 'id',
            calendarId: 'any',
            color: 'any',
            lowerLimit: now,
            upperLimit: now,
            isRange: true,
            selected: 'yes it is',
            appliedLowerLimit: now,
            appliedUpperLimit: now,
            inputLowerLimit: now,
            inputUpperLimit: now
          }
        ]
      });

      calendarInstance['handleClick'].call(calendarInstance, now);

      expect(onClickSpy).toHaveBeenCalledWith('id', false, now);
    });

    it('should call handleClick on <CalendarDay /> click', () => {
      let handleClickSpy: jasmine.Spy = spyOn<any>(calendarInstance, 'handleClick');
      let firstCalendarDay: ReactWrapper<ICalendarDayProps, any> = calendar.find(CalendarDay).first();
      firstCalendarDay.find('td').simulate('click');

      expect(handleClickSpy).toHaveBeenCalledWith(firstCalendarDay.props().day.date.toDate());
    });

    it('should have the class selecting if we are currently selecting a date', () => {
      let now = new Date();

      expect(calendar.find('.calendar-grid').hasClass('selecting')).toBe(false);

      calendar.setProps({
        calendarSelection: [
          {
            id: 'id',
            calendarId: 'any',
            color: 'any',
            lowerLimit: now,
            upperLimit: now,
            isRange: true,
            selected: 'the name of the limit',
            appliedLowerLimit: now,
            appliedUpperLimit: now,
            inputLowerLimit: now,
            inputUpperLimit: now
          }
        ]
      });

      expect(calendar.find('.calendar-grid').hasClass('selecting')).toBe(true);

      calendar.setProps({
        calendarSelection: [
          {
            id: 'id',
            calendarId: 'any',
            color: 'any',
            lowerLimit: now,
            upperLimit: now,
            isRange: true,
            selected: undefined,
            appliedLowerLimit: now,
            appliedUpperLimit: now,
            inputLowerLimit: now,
            inputUpperLimit: now
          }
        ]
      });

      expect(calendar.find('.calendar-grid').hasClass('selecting')).toBe(false);
    });

    describe('fillInDayInfos', () => {
      let now: Date = new Date();
      const DAY: IDay = {
        number: 2,
        isCurrentMonth: true,
        isToday: false,
        date: moment(now)
      };
      const CALENDAR_SELECTION: IDatePickerState = {
        id: 'id',
        calendarId: 'any',
        color: 'any',
        lowerLimit: moment().subtract(1, 'day').toDate(),
        upperLimit: moment().add(1, 'day').toDate(),
        isRange: true,
        selected: undefined,
        appliedLowerLimit: now,
        appliedUpperLimit: now,
        inputLowerLimit: now,
        inputUpperLimit: now
      };
      const CALENDAR_SELECTION_RULES: ICalendarSelectionRule[] = [
        {
          test: (date: Date) => date >= new Date(), // You cannot select a date in the past
          isFor: CalendarSelectionRuleType.all
        },
        {
          test: (date: Date) => date.getDay() !== 6, // You cannot start your selection with Saturday
          isFor: CalendarSelectionRuleType.lower
        },
        {
          test: (date: Date) => date.getDay() !== 0, // You cannot end your selection witn Sunday
          isFor: CalendarSelectionRuleType.upper
        },
        {
          test: (date: Date, endDate: Date) => moment(endDate).diff(moment(date), 'day') >= 0, // The end of your selection cannot be before the start of your selection
          isFor: CalendarSelectionRuleType.range
        },
        {
          test: (date: Date, endDate: Date) => moment(endDate).diff(moment(date), 'day') <= 7, // You cannot select more than 7 days at a time
          isFor: CalendarSelectionRuleType.range
        }
      ];
      let day: IDay;

      beforeEach(() => {
        calendar.setProps({
          calendarSelection: [CALENDAR_SELECTION],
          selectionRules: CALENDAR_SELECTION_RULES
        });

        day = calendarInstance.fillInDayInfos(_.extend({}, DAY));
      });

      it('should return day isSelected if between the lower and upper limit', () => {
        expect(day.isSelected).toBe(true);

        let beforeSelectionDay: IDay = _.extend({}, DAY, { date: moment(now).subtract(3, 'day') });
        beforeSelectionDay = calendarInstance.fillInDayInfos(beforeSelectionDay);

        expect(beforeSelectionDay.isSelected).toBeFalsy();
      });

      it('should return the day color if the day is between the lower and upper limit', () => {
        expect(day.color).toBe(CALENDAR_SELECTION.color);

        let beforeSelectionDay: IDay = _.extend({}, DAY, { date: moment(now).subtract(3, 'day') });
        beforeSelectionDay = calendarInstance.fillInDayInfos(beforeSelectionDay);

        expect(beforeSelectionDay.color).toBeUndefined();
      });

      it('should return day isLowerLimit if the selection is a range and starts on that day', () => {
        let lowerLimitDay: moment.Moment = moment(now).subtract(1, 'day');

        expect(day.isLowerLimit).toBeFalsy();

        let firstDay: IDay = _.extend({}, DAY, { date: lowerLimitDay });
        day = calendarInstance.fillInDayInfos(firstDay);

        expect(day.isLowerLimit).toBe(true);

        let selectionNoRange: IDatePickerState = _.extend({}, CALENDAR_SELECTION, { isRange: false });
        calendar.setProps({
          calendarSelection: [selectionNoRange]
        });
        firstDay = _.extend({}, DAY, { date: lowerLimitDay });
        day = calendarInstance.fillInDayInfos(firstDay);

        expect(day.isLowerLimit).toBeFalsy();
      });

      it('should return day isUpperLimit if the selection is a range and ends on that day', () => {
        let upperLimitDay: moment.Moment = moment(now).add(1, 'day');

        expect(day.isUpperLimit).toBeFalsy();

        let lastDay: IDay = _.extend({}, DAY, { date: upperLimitDay });
        day = calendarInstance.fillInDayInfos(lastDay);

        expect(day.isUpperLimit).toBe(true);

        let selectionNoRange: IDatePickerState = _.extend({}, CALENDAR_SELECTION, { isRange: false });
        calendar.setProps({
          calendarSelection: [selectionNoRange]
        });
        lastDay = _.extend({}, DAY, { date: upperLimitDay });
        day = calendarInstance.fillInDayInfos(lastDay);

        expect(day.isUpperLimit).toBeFalsy();
      });

      it('should not change the day values set by a selection if another selection does not go through that day', () => {
        let limitDay: IDay = _.extend({}, DAY, { date: moment(now).add(1, 'day') });
        let selectionAll: IDatePickerState = _.extend({}, CALENDAR_SELECTION, { lowerLimit: CALENDAR_SELECTION.upperLimit });
        let selectionNone: IDatePickerState = _.extend({}, CALENDAR_SELECTION, {
          lowerLimit: moment(now).subtract(20, 'day').toDate(),
          upperLimit: moment(now).subtract(10, 'day').toDate(),
          color: 'not any'
        });

        calendar.setProps({
          calendarSelection: [selectionNone, selectionAll]
        });
        day = calendarInstance.fillInDayInfos(limitDay);

        expect(day.isSelected).toBe(true);
        expect(day.isLowerLimit).toBe(true);
        expect(day.isUpperLimit).toBe(true);
        expect(day.color).toBe(selectionAll.color);

        calendar.setProps({
          calendarSelection: [selectionAll, selectionNone]
        });
        limitDay = _.extend({}, DAY, { date: moment(now).add(1, 'day') });
        day = calendarInstance.fillInDayInfos(limitDay);

        expect(day.isSelected).toBe(true);
        expect(day.isLowerLimit).toBe(true);
        expect(day.isUpperLimit).toBe(true);
        expect(day.color).toBe(selectionAll.color);
      });

      it('should return day isSelectable if the day comes after today', () => {
        let pastDay: IDay = _.extend({}, DAY, { date: moment().subtract(1, 'day') });
        let futureDay: IDay = _.extend({}, DAY, { date: moment().add(1, 'day') });

        day = calendarInstance.fillInDayInfos(pastDay);

        expect(day.isSelectable).toBe(false);

        day = calendarInstance.fillInDayInfos(futureDay);

        expect(day.isSelectable).toBe(true);
      });

      describe('saturday and sunday rule', () => {
        const tuesday = '2017-12-19'; // always tuesday

        it('should return day isSelectable if the day is not a Saturday and selecting lower limit', () => {
          let otherDay: IDay = _.extend({}, DAY, { date: moment(tuesday) });
          let saturday: IDay = _.extend({}, DAY, { date: moment().endOf('week') });
          let selectionLowerLimit: IDatePickerState = _.extend({}, CALENDAR_SELECTION, { selected: DateLimits.lower });

          day = calendarInstance.fillInDayInfos(otherDay);

          expect(day.isSelectable).toBe(true);

          day = calendarInstance.fillInDayInfos(saturday);

          expect(day.isSelectable).toBe(true);

          calendar.setProps({
            calendarSelection: [selectionLowerLimit],
            selectionRules: CALENDAR_SELECTION_RULES
          });

          day = calendarInstance.fillInDayInfos(otherDay);

          expect(day.isSelectable).toBe(true);

          day = calendarInstance.fillInDayInfos(saturday);

          expect(day.isSelectable).toBe(false);
        });

        it('should return day isSelectable if the day is not a Sunday and selecting upper limit', () => {
          let otherDay: IDay = _.extend({}, DAY, { date: moment(tuesday) });
          let sunday: IDay = _.extend({}, DAY, { date: moment().endOf('week').add(1, 'week') });
          let selectionUpperLimit: IDatePickerState = _.extend({}, CALENDAR_SELECTION, { selected: DateLimits.upper });

          day = calendarInstance.fillInDayInfos(otherDay);

          expect(day.isSelectable).toBe(true);

          day = calendarInstance.fillInDayInfos(sunday);

          expect(day.isSelectable).toBe(true);

          calendar.setProps({
            calendarSelection: [selectionUpperLimit],
            selectionRules: CALENDAR_SELECTION_RULES
          });

          day = calendarInstance.fillInDayInfos(otherDay);

          expect(day.isSelectable).toBe(true);

          day = calendarInstance.fillInDayInfos(sunday);

          expect(day.isSelectable).toBe(false);
        });
      });

    });
  });
});
