import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';

class DataDetail extends Component {
    render() {
       const { record, translate} = this.props;
       const {detaillist} = record;

       return (
            <Paper style={{ width: '42em', float: 'right' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.realtimedata.fields.name')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.realtimedata.fields.leftpecent')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.realtimedata.fields.leftday')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {detaillist.map(item => (
                            <TableRow key={item.name}>
                                <TableRowColumn>
                                    {item.name}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.leftpecent}
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.leftday}
                                </TableRowColumn>
                            </TableRow>)
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}



const enhance = compose(
    translate,
    connect()
);

export default enhance(DataDetail);
