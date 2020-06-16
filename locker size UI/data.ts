interface subDataType {
    grpName: string,    //Successful and failed packets
    grpValue: number    //number of packets and tolerance
}
interface dataType {
    key: string,        //Date
    values: subDataType[]
}
interface finalDataType {
    size: string     //LOCKER SIZE
    lockerData: dataType[]
}

class Data {

    constructor() {
    }

    responses = [
        {
            size: "Lockertype1",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 10 },
                            { grpName: 'Failed packets', grpValue: 20 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }

            ]
        },
        {
            size: "Lockertype2",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 23 },
                            { grpName: 'Failed packets', grpValue: 10 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],

                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*   Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 67 }
                        ],
                    /*  Tolerance: 21 */
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*  Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 15 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 25 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }
            ]
        },
        {
            size: "Lockertype3",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 25 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*  Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*  Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 21 */
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /*    Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }
            ]
        },
        {
            size: "Lockertype4",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 2 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /* Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 26 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 48 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 67 }
                        ],
                    /*  Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 21 }
                        ],
                    /* Tolerance: 21 */
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*   Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }
            ]
        },
        {
            size: "Lockertype5",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 10 },
                            { grpName: 'Failed packets', grpValue: 20 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 26 */
                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }

            ]
        },
        {
            size: "Lockertype6",
            lockerData: [
                {
                    key: "06-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 23 },
                            { grpName: 'Failed packets', grpValue: 10 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "07-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 30 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 48 */
                },
                {
                    key: "08-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 14 },
                            { grpName: 'Failed packets', grpValue: 23 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /* Tolerance: 15 */
                },
                {
                    key: "09-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 32 },
                            { grpName: 'Failed packets', grpValue: 19 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                    /*  Tolerance: 25 */
                },
                {
                    key: "10-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 55 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],
                },
                {
                    key: "11-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 41 },
                            { grpName: 'Failed packets', grpValue: 50 },
                            { grpName: 'Tolerance', grpValue: 87 }
                        ],

                },
                {
                    key: "12-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 20 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*   Tolerance: 26 */
                },
                {
                    key: "13-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 48 */
                },
                {
                    key: "14-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 67 */
                },
                {
                    key: "15-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 67 }
                        ],
                    /*  Tolerance: 21 */
                },
                {
                    key: "16-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /*  Tolerance: 22 */
                },
                {
                    key: "17-01-2019", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 22 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "04-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "05-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "06-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "07-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 35 },
                            { grpName: 'Failed packets', grpValue: 15 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "08-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 30 },
                            { grpName: 'Failed packets', grpValue: 25 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /*  Tolerance: 16 */
                },
                {
                    key: "09-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "10-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                },
                {
                    key: "11-06-2020", values:
                        [
                            { grpName: 'Successful packets', grpValue: 25 },
                            { grpName: 'Failed packets', grpValue: 5 },
                            { grpName: 'Tolerance', grpValue: 16 }
                        ],
                    /* Tolerance: 16 */
                }
            ]
        }

    ]


    getData = () => {
        return this.responses;
    }

}

export default Data;