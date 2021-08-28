import React from "react";

import {
    Col,
    Row,
    Radio
} from "antd";

interface CustomTableData {
    columns: Array<any>;
    dataSource: Array<any>;
    pagination: {
        total: number,
        pageSize: number,
        hideOnSinglePage: boolean,
    };
}

const CustomTable: React.FC<CustomTableData> = (props: CustomTableData) => {
    const { columns, dataSource } = props;
    return (
        <div>
            <table style={{ width: '100%' }}>
                <tr>
                    <Row>
                        <Col span={4}>
                            <th></th>
                        </Col>
                        {columns.map((column) => {
                            return (
                                <Col span={10} key={column.dataIndex}>
                                    <th >{column.title}</th>
                                </Col>
                            )
                        })}
                    </Row>
                </tr>
                {dataSource.map((element) => {
                    return (
                        <tr key={element.key}>
                            <Row>
                                <Col span={4}>
                                    <td><Radio value={element.key}></Radio></td>
                                </Col>
                                <Col span={10}>
                                    <td>{element[columns[0].dataIndex]}</td>
                                </Col>
                                <Col span={10}>
                                    <td>{element[columns[1].dataIndex]}</td>
                                </Col>
                            </Row>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default CustomTable;