import { Reducer, Action } from "redux";
import { TimesheetTypes } from './timesheet.types';

import { TimesheetList } from "../../models";


const InitialState = {
    contentList: []
}

const timesheetReducer: Reducer<TimesheetList, Action> = (
    state: TimesheetList = InitialState,
    action: any
) => {
    switch (action.type) {
        case TimesheetTypes.ADD_TIMESHEET: {
            return {
                ...state,
                contentList: [
                    ...state.contentList,
                    {
                        service_request_id: action.newEntryValue.service_request_id,
                        categoryName: action.newEntryValue.categoryName,
                        day_1: { ...action.newEntryValue.day_1 },
                        day_2: { ...action.newEntryValue.day_2 },
                        day_3: { ...action.newEntryValue.day_3 },
                        day_4: { ...action.newEntryValue.day_4 },
                        day_5: { ...action.newEntryValue.day_5 },
                        day_6: { ...action.newEntryValue.day_6 },
                        day_7: { ...action.newEntryValue.day_7 }
                    }
                ]
            }
        }
        case TimesheetTypes.DELETE_TIMESHEET: {
            const updatedArray = state.contentList.filter(content => content.service_request_id !== action.service_request_id);
            return {
                contentList: [
                    ...updatedArray
                ]
            }
        }
        case TimesheetTypes.CANCEL_TIMESHEET: {
            return {
                contentList: []
            }
        }
        default: {
            return state;
        }
    }
};

export default timesheetReducer;