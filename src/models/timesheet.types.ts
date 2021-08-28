export interface Day {
    value: number,
    date: string
}

export interface Timesheet {
    service_request_id: number,
    categoryName: string,
    day_1: Day,
    day_2: Day,
    day_3: Day,
    day_4: Day,
    day_5: Day,
    day_6: Day,
    day_7: Day

}

export interface TimesheetList {
    contentList: Array<Timesheet>
}