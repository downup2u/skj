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
       const {detaildaylist,detailvollist} = record;

       return (
            <Paper style={{ width: '100%', float: 'right' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.device.fields.type')}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {translate('resources.device.fields.name')}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {translate('resources.device.fields.t')}
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                {translate('resources.device.fields.v')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.device.fields.lx')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.device.fields.l0')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.device.fields.ln')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {detailvollist.map(item => (
                            <TableRow key={item.name}>
                              <TableRowColumn>
                                 流量
                              </TableRowColumn>
                              <TableRowColumn>
                                  {item.name}
                              </TableRowColumn>
                              <TableRowColumn>
                                  {item.t}
                              </TableRowColumn>
                                <TableRowColumn>
                                    {item.v}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fv_lx}
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fv_l0}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fv_ln}
                                </TableRowColumn>
                            </TableRow>)
                        )}

                        {detaildaylist.map(item => (
                            <TableRow key={item.name}>
                              <TableRowColumn>
                                 天数
                              </TableRowColumn>
                              <TableRowColumn>
                                  {item.name}
                              </TableRowColumn>
                              <TableRowColumn>
                                  {item.t}
                              </TableRowColumn>
                                <TableRowColumn>
                                    {item.v}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fd_lx}
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fd_l0}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.fd_ln}
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
