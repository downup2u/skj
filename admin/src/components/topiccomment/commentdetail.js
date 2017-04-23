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
import compose from 'recompose/compose';
import { 
    ReferenceField,
    TextField,
} from 'admin-on-rest/lib/mui';
import { translate, crudGetMany as crudGetManyAction } from 'admin-on-rest';
import moment from 'moment';

class CommentDetail extends Component {
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { record: { comments }, crudGetMany } = this.props;
        crudGetMany('comments', comments);
    }
    render() {
        const { translate,topiccomments} = this.props;

      //productsdetail:[{"productid":"58e71be6ef4e8d02eca6e0e8","number":12,"price":12,"_id":"58ef69eb510c6f3752e889b6"},{"productid":"58eaecea130f4809a747d2f8","number":10,"price":11,"_id":"58ef69eb510c6f3752e889b5"}]
       console.log('topiccomments:' + JSON.stringify(topiccomments));
        return (
            <Paper style={{ width: '100%', float: 'left' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.comments.fields.title')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.comments.fields.creator')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.comments.fields.created_at')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {topiccomments.map(item => {
                            const {basePath} = this.props;
                            let record = item;
                            let recordrefenceprops = {
                                basePath,
                            };
                            let targetdate = new Date(Date.parse(item.created_at));
                            let createdatestring = moment(targetdate).format('YYYY年MM月DD日 HH时mm分');
                            return (
                            <TableRow key={item.id}>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    <ReferenceField record={item} source="id" reference="comments" {...recordrefenceprops}>
                                        <TextField source="title" />
                                    </ReferenceField>
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    <ReferenceField record={item} source="creator" reference="user" {...recordrefenceprops}>
                                        <TextField source="username" />
                                    </ReferenceField>
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {createdatestring}
                                </TableRowColumn>
                            </TableRow>)
                        }
                        )}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { record: { comments } } = props;
    return {
        topiccomments: comments
            .map(commentid => state.admin.comments.data[commentid])
            .filter(r => typeof r !== 'undefined')

    };
};

const enhance = compose(
    translate,
    connect(mapStateToProps, {
        crudGetMany: crudGetManyAction,
    })
);

export default enhance(CommentDetail);
